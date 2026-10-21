type Review = {
  rating: number;
  text: string;
  language: string;
  author: string;
  authorUrl: string;
  photoUrl: string;
  reviewUrl: string;
  publishedAt: string;
  relativeDate: string;
};
type ReviewData = {
  reviews: Review[];
  rating: number | null;
  count: number | null;
  attributions: { name: string; url: string }[];
};
const section = document.querySelector<HTMLElement>('[data-google-reviews]');
if (section) {
  const rail = section.querySelector<HTMLElement>('[data-review-rail]')!;
  const status = section.querySelector<HTMLElement>('[data-review-status]')!;
  const controls = section.querySelector<HTMLElement>(
    '[data-review-controls]',
  )!;
  const previous = section.querySelector<HTMLButtonElement>(
    '[data-review-previous]',
  )!;
  const next = section.querySelector<HTMLButtonElement>('[data-review-next]')!;
  const element = <K extends keyof HTMLElementTagNameMap>(
    tag: K,
    className: string,
    text = '',
  ) => {
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = text;
    return node;
  };
  const link = (url: string, className: string, text: string) => {
    const node = element('a', className, text);
    node.href = url;
    node.target = '_blank';
    node.rel = 'noopener noreferrer';
    return node;
  };
  const updateControls = () => {
    controls.hidden = rail.scrollWidth <= rail.clientWidth + 2;
    previous.disabled = rail.scrollLeft <= 2;
    next.disabled = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2;
  };
  const move = (direction: number) => {
    const card = rail.firstElementChild as HTMLElement | null;
    const distance = card
      ? card.offsetWidth + parseFloat(getComputedStyle(rail).gap)
      : rail.clientWidth;
    rail.scrollBy({
      left: direction * distance,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  };
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  rail.addEventListener('scroll', updateControls, { passive: true });
  new ResizeObserver(updateControls).observe(rail);
  let loaded = false;
  async function load() {
    if (loaded || !section) return;
    loaded = true;
    try {
      const response = await fetch('/api/google-reviews', {
        cache: 'no-store',
        credentials: 'same-origin',
        signal: AbortSignal.timeout(11000),
      });
      if (!response.ok) throw new Error('Reviews unavailable');
      const data: ReviewData = await response.json();
      if (data.rating !== null && data.count !== null) {
        section.querySelector('[data-review-rating]')!.textContent =
          data.rating.toFixed(1);
        section.querySelector('[data-review-count]')!.textContent =
          `Overall · ${data.count} Google reviews`;
        const stars = section.querySelector<HTMLElement>(
          '[data-rating-stars]',
        )!;
        stars.textContent = '★★★★★';
        stars.setAttribute(
          'aria-label',
          `${data.rating} out of 5 stars overall`,
        );
        stars.style.background = `linear-gradient(to right, #a87314 ${data.rating * 20}%, #cdd2c6 ${data.rating * 20}%)`;
        stars.style.backgroundClip = 'text';
        stars.style.webkitTextFillColor = 'transparent';
        section.querySelector<HTMLElement>('[data-review-summary]')!.hidden =
          false;
      }
      data.reviews.forEach((review, index) => {
        const card = element('article', 'review-card');
        const stars = element('div', 'review-card-stars', '★★★★★');
        stars.setAttribute('role', 'img');
        stars.setAttribute('aria-label', '5 out of 5 stars');
        const quote = element('blockquote', 'review-quote', review.text);
        quote.id = `customer-review-${index}`;
        if (review.language) quote.lang = review.language;
        card.append(stars, quote);
        if (review.text.length > 250) {
          quote.classList.add('is-collapsed');
          const expand = element('button', 'review-expand', 'Read full review');
          expand.type = 'button';
          expand.setAttribute('aria-controls', quote.id);
          expand.setAttribute('aria-expanded', 'false');
          expand.addEventListener('click', () => {
            const collapsed = quote.classList.toggle('is-collapsed');
            expand.setAttribute('aria-expanded', String(!collapsed));
            expand.textContent = collapsed ? 'Read full review' : 'Show less';
          });
          card.append(expand);
        }
        const author = element('div', 'review-author');
        const avatar = element(
          'span',
          'review-avatar',
          review.author.slice(0, 1),
        );
        avatar.setAttribute('aria-hidden', 'true');
        if (review.photoUrl) {
          const photo = element('img', 'review-avatar');
          photo.src = review.photoUrl;
          photo.alt = '';
          photo.width = photo.height = 40;
          photo.loading = 'lazy';
          photo.referrerPolicy = 'no-referrer';
          photo.addEventListener('error', () => photo.replaceWith(avatar), {
            once: true,
          });
          author.append(photo);
        } else author.append(avatar);
        const identity = element('div', 'review-identity');
        identity.append(
          review.authorUrl
            ? link(review.authorUrl, 'review-author-name', review.author)
            : element('span', 'review-author-name', review.author),
        );
        if (review.publishedAt || review.relativeDate) {
          const date = element(
            'time',
            '',
            review.relativeDate ||
              new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }).format(new Date(review.publishedAt)),
          );
          if (review.publishedAt) {
            date.dateTime = review.publishedAt;
            date.title = new Date(review.publishedAt).toLocaleDateString(
              'en-US',
            );
          }
          identity.append(date);
        }
        author.append(identity);
        card.append(
          author,
          link(review.reviewUrl, 'review-source-link', 'View on Google Maps ↗'),
        );
        rail.append(card);
      });
      const attribution = section.querySelector<HTMLElement>(
        '[data-provider-attributions]',
      )!;
      data.attributions.forEach((provider, index) => {
        if (index) attribution.append(' · ');
        attribution.append(
          provider.url
            ? link(provider.url, '', provider.name)
            : document.createTextNode(provider.name),
        );
      });
      attribution.hidden = !data.attributions.length;
      rail.hidden = !data.reviews.length;
      status.hidden = !!data.reviews.length;
      if (!data.reviews.length)
        status.textContent =
          'Visit our Google profile to explore more customer stories.';
      updateControls();
    } catch {
      status.textContent =
        'Customer reviews are currently available on our Google profile. Follow the link above to read their stories.';
    }
  }
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        void load();
      }
    },
    { rootMargin: '150px' },
  );
  observer.observe(section);
}
