export class AudioPlayer {
    constructor() {
        this.soundSelect = document.getElementById('background-sound');
        this.playButton = document.getElementById('play-sound');
        this.pauseButton = document.getElementById('pause-sound');
        this.backgroundMusic = null;

        this.initialize();
    }

    initialize() {
        this.soundSelect.addEventListener('change', () => this.createBackgroundAudio(this.soundSelect.value));
        this.playButton.addEventListener('click', () => this.play());
        this.pauseButton.addEventListener('click', () => this.pause());
    }

    createBackgroundAudio(soundName) {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.backgroundMusic = null;
        }
        if (soundName) {
            this.backgroundMusic = new Audio(`sounds/${soundName}.mp3`);
            this.backgroundMusic.loop = true;
            this.playButton.disabled = false;
            this.pauseButton.disabled = true;
        } else {
            this.playButton.disabled = true;
            this.pauseButton.disabled = true;
        }
    }

    play() {
        if (this.backgroundMusic) {
            this.backgroundMusic.play();
            this.playButton.disabled = true;
            this.pauseButton.disabled = false;
        }
    }

    pause() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.playButton.disabled = false;
            this.pauseButton.disabled = true;
        }
    }

    stop() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.playButton.disabled = false;
            this.pauseButton.disabled = true;
        }
    }
}