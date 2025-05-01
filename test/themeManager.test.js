import { initializeTheme } from '../js/themeManager';
import { fireEvent } from '@testing-library/dom';

// Mock LanguageManager
jest.mock('../js/languageManager', () => {
    return {
        LanguageManager: jest.fn().mockImplementation(() => ({
            getText: jest.fn((key, args) => {
                if (key === 'light') return 'light';
                if (key === 'dark') return 'dark';
                if (key === 'switch_theme') return `Switch to ${args} mode`;
                return key;
            }),
            updatePageContent: jest.fn()
        }))
    };
});

describe('ThemeManager', () => {
    let themeToggle;

    beforeEach(() => {
        jest.useFakeTimers();
        localStorage.clear();
        
        document.body.innerHTML = `
            <button id="theme-toggle" class="contrast" aria-label="Switch theme">Switch to dark mode</button>
        `;
        themeToggle = document.getElementById('theme-toggle');

        // Set initial theme to light
        document.body.setAttribute('data-theme', 'light');
    });

    afterEach(() => {
        jest.useRealTimers();
        localStorage.clear();
        document.body.innerHTML = '';
    });

    test('initializes with light theme by default', () => {
        initializeTheme();
        expect(document.body.getAttribute('data-theme')).toBe('light');
        expect(themeToggle.textContent).toBe('Switch to dark mode');
    });

    test('toggles theme when button is clicked', () => {
        initializeTheme();

        // First click: light -> dark
        fireEvent.click(themeToggle);
        jest.runAllTimers();
        expect(document.body.getAttribute('data-theme')).toBe('dark');
        expect(themeToggle.textContent).toBe('Switch to light mode');
        
        // Second click: dark -> light
        fireEvent.click(themeToggle);
        jest.runAllTimers();
        expect(document.body.getAttribute('data-theme')).toBe('light');
        expect(themeToggle.textContent).toBe('Switch to dark mode');
    });

    test('persists theme preference in localStorage', () => {
        initializeTheme();
        fireEvent.click(themeToggle);
        expect(localStorage.getItem('theme')).toBe('dark');
        
        fireEvent.click(themeToggle);
        expect(localStorage.getItem('theme')).toBe('light');
    });

    test('respects system dark mode preference', () => {
        window.matchMedia.mockImplementation(query => ({
            matches: query === '(prefers-color-scheme: dark)',
            media: query,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn()
        }));

        initializeTheme();
        expect(document.body.getAttribute('data-theme')).toBe('dark');
    });
});