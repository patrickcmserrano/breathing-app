import { LanguageManager } from './languageManager.js';

export function initializeTheme(languageManager = new LanguageManager()) {
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
        const oppositeTheme = theme === 'light' ? 'dark' : 'light';
        const translatedTheme = languageManager.getText(oppositeTheme);
        themeToggle.textContent = languageManager.getText('switch_theme', translatedTheme);
        themeToggle.setAttribute('aria-label', languageManager.getText('switch_theme', translatedTheme));
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