import { initializeTheme } from '../js/themeManager';
import { fireEvent } from '@testing-library/dom';

describe('ThemeManager', () => {
  let themeToggle;

  beforeEach(() => {
    // Clear local storage before each test
    localStorage.clear();
    
    // Setup the DOM elements needed
    document.body.innerHTML = `
      <button id="theme-toggle" class="contrast" aria-label="Switch theme">Switch to dark mode</button>
    `;
    themeToggle = document.getElementById('theme-toggle');
  });

  test('initializes with light theme by default', () => {
    initializeTheme();
    expect(document.body.getAttribute('data-theme')).toBe('light');
    expect(themeToggle.textContent).toBe('Switch to dark mode');
  });

  test('toggles theme when button is clicked', () => {
    initializeTheme();
    fireEvent.click(themeToggle);
    expect(document.body.getAttribute('data-theme')).toBe('dark');
    expect(themeToggle.textContent).toBe('Switch to light mode');
    
    fireEvent.click(themeToggle);
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