document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const toggles = document.querySelectorAll('[data-theme-toggle]');

  const sync = () => {
    const isDark = root.classList.contains('dark');
    toggles.forEach((toggle) => toggle.setAttribute('aria-pressed', String(isDark)));
  };

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const isDark = root.classList.toggle('dark');
      try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      } catch (e) {}
      sync();
    });
  });

  sync();
});
