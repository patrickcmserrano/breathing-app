export function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        if (theme === 'system') {
            localStorage.removeItem('theme');
            theme = prefersDarkScheme.matches ? 'dark' : 'light';
        } else {
            localStorage.setItem('theme', theme);
        }
        themeToggle.textContent = `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`;
        themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
    }

    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme || (prefersDarkScheme.matches ? 'dark' : 'light'));

    // Listen for theme toggle clicks
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}