import { initializeTheme } from './js/themeManager.js';
import { BreathingExercise } from './js/breathingExercise.js';
import { AudioPlayer } from './js/audioPlayer.js';
import { LanguageManager } from './js/languageManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const languageManager = new LanguageManager();
    languageManager.initialize();
    initializeTheme(languageManager);
    
    if (!document.getElementById('instruction')) return; // Not on main page
    
    const breathingExercise = new BreathingExercise();
    const audioPlayer = new AudioPlayer();
});