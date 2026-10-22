document.querySelectorAll<HTMLAnchorElement>('[data-service]').forEach((link) =>
  link.addEventListener('click', () => {
    const select = document.querySelector<HTMLSelectElement>('#service');
    if (select) select.value = link.dataset.service || '';
  }),
);
const requestedService = new URLSearchParams(window.location.search).get(
  'service',
);
const serviceSelect = document.querySelector<HTMLSelectElement>('#service');
if (
  serviceSelect &&
  [...serviceSelect.options].some((option) => option.value === requestedService)
) {
  serviceSelect.value = requestedService!;
}
const form = document.querySelector<HTMLFormElement>('.estimate-form');
form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const status = form.querySelector<HTMLElement>('.form-status');
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');
  if (!status || !submit) return;
  const announce = (message: string, success = false) => {
    status.textContent = message;
    status.classList.toggle('success', success);
    status.hidden = false;
    status.focus();
  };
  if (form.dataset.enabled !== 'true') {
    announce(
      'This preview does not send requests. Your information has not been sent or saved.',
    );
    return;
  }
  submit.disabled = true;
  submit.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch('/api/estimate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      throw new Error(
        result.error ||
          'We couldn’t send your request. Please try again later.',
      );
    }
    form.reset();
    announce(
      'Thank you! Your request has been sent. Our team will be in touch to talk about your project.',
      true,
    );
  } catch (error) {
    announce(
      error instanceof Error
        ? error.message
        : 'We couldn’t send your request. Please try again later.',
    );
  } finally {
    submit.disabled = false;
    submit.removeAttribute('aria-busy');
  }
});
