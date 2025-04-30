import { initializeTheme } from './js/themeManager.js';
import { BreathingExercise } from './js/breathingExercise.js';
import { AudioPlayer } from './js/audioPlayer.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    new BreathingExercise();
    new AudioPlayer();
});