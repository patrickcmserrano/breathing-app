import { LanguageManager } from './languageManager.js';

export class BreathingExercise {
    constructor() {
        this.cycles = 4;
        this.currentCycle = 0;
        this.animationFrame = null;
        this.phaseTimer = null;
        this.isRunning = false;
        this.bell = new Audio('assets/sounds/tibetan-singing-bowl.mp3');
        this.languageManager = new LanguageManager();

        this.instruction = document.getElementById('instruction');
        this.progress = document.getElementById('progress');
        this.cycleCounter = document.getElementById('cycle-counter');
        this.startButton = document.getElementById('start');
        this.stopButton = document.getElementById('stop');

        this.startButton.addEventListener('click', () => this.start());
        this.stopButton.addEventListener('click', () => this.stop());
        this.progress.addEventListener('transitionend', () => this.nextPhase());
        this.progress.addEventListener('transitioncancel', () => this.stop());
        
        // Initialize with cycle 0
        this.updateCycleCounter(0);
    }

    updateText(key, ...args) {
        return this.languageManager.getText(key, ...args);
    }

    updateCycleCounter(cycle) {
        this.cycleCounter.textContent = this.languageManager.getText('cycle_counter', cycle);
    }

    async start() {
        this.isRunning = true;
        this.currentCycle = 1;
        this.startButton.disabled = true;
        this.stopButton.disabled = false;
        await this.bell.play();
        this.updateCycleCounter(this.currentCycle);
        this.inhale();
    }

    stop() {
        this.isRunning = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        if (this.phaseTimer) {
            clearTimeout(this.phaseTimer);
            this.phaseTimer = null;
        }
        this.currentCycle = 0;
        this.progress.style.transition = 'none';
        this.progress.style.width = '0px';
        this.instruction.textContent = this.updateText('press_start');
        this.updateCycleCounter(0);
        this.startButton.disabled = false;
        this.stopButton.disabled = true;
    }

    inhale() {
        this.instruction.textContent = this.updateText('inhale');
        this.progress.style.width = '0';
        this.progress.style.transition = 'none';
        // Ensure DOM reflow before setting the transition
        this.progress.offsetHeight;
        requestAnimationFrame(() => {
            this.progress.style.transition = 'width 4s linear';
            this.progress.style.width = '100%';
        });
    }

    hold() {
        this.instruction.textContent = this.updateText('hold');
        this.progress.style.width = '0';
        this.progress.style.transition = 'none';
        // Ensure DOM reflow before setting the transition
        this.progress.offsetHeight;
        requestAnimationFrame(() => {
            this.progress.style.transition = 'width 7s linear';
            this.progress.style.width = '100%';
        });
    }

    exhale() {
        this.instruction.textContent = this.updateText('exhale');
        this.progress.style.width = '0';
        this.progress.style.transition = 'none';
        // Ensure DOM reflow before setting the transition
        this.progress.offsetHeight;
        requestAnimationFrame(() => {
            this.progress.style.transition = 'width 8s linear';
            this.progress.style.width = '100%';
        });
    }

    animateProgress(duration) {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        const startTime = performance.now();
        const animate = (currentTime) => {
            if (!this.isRunning) return;
            
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            this.progress.style.width = `${progress * 100}%`;
            
            if (progress < 1 && this.isRunning) {
                this.animationFrame = requestAnimationFrame(animate);
            }
        };
        
        this.animationFrame = requestAnimationFrame(animate);
    }

    async nextPhase() {
        if (!this.isRunning) return;

        if (this.instruction.textContent === this.updateText('inhale')) {
            this.hold();
        } else if (this.instruction.textContent === this.updateText('hold')) {
            this.exhale();
        } else {
            if (this.currentCycle < this.cycles) {
                this.currentCycle++;
                this.updateCycleCounter(this.currentCycle);
                await this.bell.play();
                this.inhale();
            } else {
                this.stop();
            }
        }
    }
}