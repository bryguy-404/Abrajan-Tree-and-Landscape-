const header = document.querySelector<HTMLElement>('.site-header');
const hero = document.querySelector<HTMLElement>('.hero');
const contact = document.querySelector<HTMLElement>('#contact');
const quickContact = document.querySelector<HTMLElement>('.mobile-contact-bar');
const navLinks = [
  ...document.querySelectorAll<HTMLAnchorElement>('[data-nav-section]'),
];
const sectionIds = [
  'top',
  'services',
  'about',
  'our-work',
  'reviews',
  'service-area',
  'contact',
];
const sections = sectionIds.map((id) => document.getElementById(id));
const phoneScreen = matchMedia('(max-width: 600px)');
let scheduled = false;

function updateNavigation() {
  scheduled = false;
  if (!header) return;
  header.classList.toggle('is-sticky', window.scrollY > 150);
  const headerHeight = header.getBoundingClientRect().height;
  let active = 'top';
  sections.forEach((section, index) => {
    if (section && section.getBoundingClientRect().top <= headerHeight + 100)
      active = sectionIds[index];
  });
  navLinks.forEach((link) => {
    const current = link.dataset.navSection === active;
    link.classList.toggle('active', current);
    if (current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  if (quickContact && hero && contact) {
    const afterHero = hero.getBoundingClientRect().bottom <= headerHeight;
    const contactReached =
      contact.getBoundingClientRect().top < window.innerHeight;
    const show = phoneScreen.matches && afterHero && !contactReached;
    quickContact.hidden = !show;
    document.documentElement.classList.toggle('has-contact-bar', show);
  }
}

function scheduleUpdate() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(updateNavigation);
}

window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate);
window.addEventListener('load', scheduleUpdate);
window.addEventListener('pageshow', scheduleUpdate);
phoneScreen.addEventListener('change', scheduleUpdate);
updateNavigation();
