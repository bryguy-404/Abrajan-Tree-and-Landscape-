const page = document.querySelector<HTMLElement>('.work-page');
if (page) {
  const filters = page.querySelector<HTMLElement>('[data-work-filters]');
  const photos = [...page.querySelectorAll<HTMLElement>('.work-photo')];
  const status = page.querySelector<HTMLElement>('[data-filter-status]');
  if (filters && status) {
    filters.hidden = false;
    filters
      .querySelectorAll<HTMLButtonElement>('[data-filter]')
      .forEach((button) => {
        button.addEventListener('click', () => {
          const category = button.dataset.filter;
          photos.forEach((photo) => {
            photo.hidden =
              category !== 'all' && photo.dataset.category !== category;
          });
          filters
            .querySelectorAll('button')
            .forEach((item) =>
              item.setAttribute('aria-pressed', String(item === button)),
            );
          status.textContent = `${photos.filter((photo) => !photo.hidden).length} photos shown.`;
        });
      });
  }

  const dialog = page.querySelector<HTMLDialogElement>('#work-viewer');
  const image = dialog?.querySelector<HTMLImageElement>('[data-viewer-image]');
  const video = dialog?.querySelector<HTMLVideoElement>('[data-viewer-video]');
  const title = dialog?.querySelector<HTMLElement>('#viewer-title');
  const description = dialog?.querySelector<HTMLElement>('#viewer-description');
  const count = dialog?.querySelector<HTMLElement>('[data-viewer-count]');
  const kind = dialog?.querySelector<HTMLElement>('[data-viewer-kind]');
  const error = dialog?.querySelector<HTMLElement>('[data-media-error]');
  const loading = dialog?.querySelector<HTMLElement>('[data-media-loading]');
  const direct = dialog?.querySelector<HTMLAnchorElement>(
    '[data-media-direct]',
  );
  if (
    dialog &&
    image &&
    video &&
    title &&
    description &&
    count &&
    kind &&
    error &&
    loading &&
    direct &&
    typeof dialog.showModal === 'function'
  ) {
    const links = [...page.querySelectorAll<HTMLAnchorElement>('[data-media]')];
    let active: HTMLAnchorElement[] = [];
    let current = 0;
    let opener: HTMLAnchorElement | undefined;

    const clearVideo = () => {
      video.pause();
      video.removeAttribute('src');
      video.removeAttribute('poster');
      video.load();
    };
    const show = () => {
      const link = active[current];
      clearVideo();
      image.hidden = true;
      image.removeAttribute('src');
      video.hidden = true;
      error.hidden = true;
      loading.hidden = false;
      direct.href = link.href;
      title.textContent = link.dataset.title ?? '';
      description.textContent = link.dataset.description ?? '';
      count.textContent = `${current + 1} / ${active.length}`;
      const isVideo = link.dataset.media === 'video';
      kind.textContent = isVideo
        ? 'Abrajan in Motion · No Audio'
        : 'A Closer Look · Abrajan';
      if (isVideo) {
        video.hidden = false;
        video.poster = link.dataset.poster ?? '';
        video.src = link.href;
        video.muted = true;
        video.setAttribute('aria-label', title.textContent);
      } else {
        image.alt = link.dataset.description ?? '';
        image.src = link.href;
        image.hidden = false;
      }
      if (!dialog.open) dialog.showModal();
      if (isVideo)
        void video.play().catch(() => {
          /* Native controls allow manual play if required. */
        });
    };
    links.forEach((link) =>
      link.addEventListener('click', (event) => {
        if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
          return;
        event.preventDefault();
        opener = link;
        active = links.filter(
          (item) =>
            item.dataset.group === link.dataset.group &&
            !item.closest('[hidden]'),
        );
        current = active.indexOf(link);
        show();
      }),
    );
    const step = (direction: number) => {
      current = (current + direction + active.length) % active.length;
      show();
    };
    dialog
      .querySelector('[data-viewer-prev]')
      ?.addEventListener('click', () => step(-1));
    dialog
      .querySelector('[data-viewer-next]')
      ?.addEventListener('click', () => step(1));
    dialog
      .querySelector('[data-viewer-close]')
      ?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('keydown', (event) => {
      // Leave arrow keys to native playback controls when watching a film.
      if (!video.hidden) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        step(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
    dialog.addEventListener('close', () => {
      clearVideo();
      video.hidden = true;
      image.removeAttribute('src');
      image.hidden = true;
      opener?.focus({ preventScroll: true });
      loading.hidden = true;
    });
    image.addEventListener('error', () => {
      if (dialog.open && !image.hidden) {
        error.hidden = false;
        loading.hidden = true;
      }
    });
    video.addEventListener('error', () => {
      if (dialog.open && video.hasAttribute('src')) {
        error.hidden = false;
        loading.hidden = true;
      }
    });
    image.addEventListener('load', () => {
      loading.hidden = true;
    });
    video.addEventListener('loadeddata', () => {
      loading.hidden = true;
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) video.pause();
    });
  }

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const reveals = [...page.querySelectorAll<HTMLElement>('[data-work-reveal]')];
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('work-visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    reveals.forEach((element) => {
      if (element.getBoundingClientRect().top >= innerHeight) {
        element.classList.add('work-enter');
        observer.observe(element);
      }
    });
    page.addEventListener('focusin', (event) => {
      if (event.target instanceof Element)
        event.target
          .closest('[data-work-reveal]')
          ?.classList.add('work-visible');
    });
    reduced.addEventListener('change', () => {
      if (reduced.matches) {
        reveals.forEach((element) => element.classList.add('work-visible'));
        observer.disconnect();
      }
    });
  }
}
