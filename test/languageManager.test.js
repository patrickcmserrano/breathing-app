import { LanguageManager } from '../js/languageManager';

describe('LanguageManager', () => {
    let languageManager;

    beforeEach(() => {
        localStorage.clear();
        
        document.body.innerHTML = `
            <div class="language-buttons">
                <button class="language-button" data-lang="en">English</button>
                <button class="language-button" data-lang="pt-BR">Português</button>
            </div>
            <div data-i18n="page_title">4-7-8 Breathing Exercise</div>
            <select>
                <option data-i18n-option="none">None</option>
                <option data-i18n-option="meditation_music">Meditation Spiritual Music</option>
            </select>
        `;
        
        languageManager = new LanguageManager();
    });

    afterEach(() => {
        localStorage.clear();
        document.body.innerHTML = '';
    });

    test('initializes with default language as English', () => {
        expect(languageManager.currentLanguage).toBe('en');
    });

    test('initializes with stored language from localStorage', () => {
        localStorage.setItem('language', 'pt-BR');
        languageManager = new LanguageManager();
        expect(languageManager.currentLanguage).toBe('pt-BR');
    });

    test('sets language correctly', () => {
        languageManager.setLanguage('pt-BR');
        expect(languageManager.currentLanguage).toBe('pt-BR');
        expect(localStorage.getItem('language')).toBe('pt-BR');
    });

    test('gets text with arguments correctly', () => {
        const text = languageManager.getText('cycle_counter', 2);
        expect(text).toBe('Cycle: 2/4');
    });

    test('handles zero values correctly in text interpolation', () => {
        const text = languageManager.getText('cycle_counter', 0);
        expect(text).toBe('Cycle: 0/4');

        languageManager.setLanguage('pt-BR');
        const textPt = languageManager.getText('cycle_counter', 0);
        expect(textPt).toBe('Ciclo: 0/4');
    });

    test('falls back to English when translation is missing', () => {
        const text = languageManager.getText('nonexistent_key');
        expect(text).toBe('nonexistent_key');
    });

    test('initializes language buttons with correct active state', () => {
        localStorage.setItem('language', 'pt-BR');
        languageManager = new LanguageManager();
        languageManager.initialize();
        
        const enButton = document.querySelector('[data-lang="en"]');
        const ptButton = document.querySelector('[data-lang="pt-BR"]');
        
        expect(enButton.classList.contains('active')).toBe(false);
        expect(ptButton.classList.contains('active')).toBe(true);
    });

    test('updates language on button click', () => {
        languageManager.initialize();
        const ptButton = document.querySelector('[data-lang="pt-BR"]');
        
        // Mock window.location.reload
        const originalLocation = window.location;
        delete window.location;
        window.location = { reload: jest.fn() };
        
        ptButton.click();
        
        expect(languageManager.currentLanguage).toBe('pt-BR');
        expect(localStorage.getItem('language')).toBe('pt-BR');
        expect(window.location.reload).toHaveBeenCalled();
        
        // Restore window.location
        window.location = originalLocation;
    });

    test('updates page content correctly', () => {
        languageManager.setLanguage('pt-BR');
        languageManager.updatePageContent();
        
        const titleElement = document.querySelector('[data-i18n="page_title"]');
        expect(titleElement.textContent).toBe('Exercício de Respiração 4-7-8');
        
        const optionElement = document.querySelector('[data-i18n-option="meditation_music"]');
        expect(optionElement.textContent).toBe('Música Espiritual de Meditação');
    });

    test('handles missing elements gracefully', () => {
        document.body.innerHTML = '';
        expect(() => languageManager.initialize()).not.toThrow();
        expect(() => languageManager.updatePageContent()).not.toThrow();
    });

    test('does not reload page if same language is selected', () => {
        languageManager.initialize();
        const enButton = document.querySelector('[data-lang="en"]');
        
        // Mock window.location.reload
        const originalLocation = window.location;
        delete window.location;
        window.location = { reload: jest.fn() };
        
        enButton.click();
        
        expect(window.location.reload).not.toHaveBeenCalled();
        
        // Restore window.location
        window.location = originalLocation;
    });
});