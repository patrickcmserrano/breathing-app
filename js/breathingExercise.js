export class BreathingExercise {
    constructor() {
        this.instruction = document.getElementById('instruction');
        this.startButton = document.getElementById('start');
        this.progress = document.getElementById('progress');
        this.stopButton = document.getElementById('stop');
        this.cycleCounter = document.getElementById('cycle-counter');
        this.bell = new Audio('sounds/tibetan-singing-bowl.mp3');
        
        this.cycle = [
            { text: 'Inhale for 4 seconds', duration: 4, sound: true },
            { text: 'Hold for 7 seconds', duration: 7, sound: false },
            { text: 'Exhale for 8 seconds', duration: 8, sound: false }
        ];
        this.totalCycles = 4;
        this.phases = Array(this.totalCycles).fill(this.cycle).flat();
        this.currentPhaseIndex = 0;

        this.initialize();
    }

    initialize() {
        this.instruction.style.transition = 'color 0.3s';
        this.progress.addEventListener('transitionend', () => this.handlePhaseEnd());
        this.startButton.addEventListener('click', () => this.start());
        this.stopButton.addEventListener('click', () => this.reset());
    }

    getCurrentCycle() {
        return Math.floor(this.currentPhaseIndex / 3) + 1;
    }

    reset() {
        this.instruction.textContent = 'Press start to begin';
        this.progress.style.width = '0';
        this.progress.style.transition = 'none';
        this.startButton.disabled = false;
        this.stopButton.disabled = true;
        this.currentPhaseIndex = 0;
        this.cycleCounter.textContent = 'Cycle: 0/4';
    }

    startPhase(index) {
        const phase = this.phases[index];
        this.instruction.textContent = phase.text;
        this.instruction.style.transition = `color ${phase.duration}s`;
        this.stopButton.disabled = false;
        
        requestAnimationFrame(() => {
            this.progress.style.width = '0';
            this.progress.style.transition = 'none';
            requestAnimationFrame(() => {
                this.progress.style.transition = `width ${phase.duration}s linear`;
                this.progress.style.width = '100%';
            });
        });
        
        if (phase.sound) {
            this.bell.play();
        }

        this.cycleCounter.textContent = `Cycle: ${this.getCurrentCycle()}/${this.totalCycles}`;
    }

    handlePhaseEnd() {
        this.currentPhaseIndex++;
        if (this.currentPhaseIndex < this.phases.length) {
            this.startPhase(this.currentPhaseIndex);
        } else {
            this.reset();
        }
    }

    start() {
        this.startButton.disabled = true;
        this.startPhase(this.currentPhaseIndex);
    }
}