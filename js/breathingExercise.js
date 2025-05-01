export class BreathingExercise {
    constructor() {
        this.instruction = document.getElementById('instruction');
        this.startButton = document.getElementById('start');
        this.progress = document.getElementById('progress');
        this.stopButton = document.getElementById('stop');
        this.cycleCounter = document.getElementById('cycle-counter');
        this.bell = new Audio('assets/sounds/tibetan-singing-bowl.mp3');
        
        this.cycle = [
            { text: 'Inhale for 4 seconds', duration: 4, sound: true },
            { text: 'Hold for 7 seconds', duration: 7, sound: false },
            { text: 'Exhale for 8 seconds', duration: 8, sound: false }
        ];
        this.totalCycles = 4;
        this.phases = Array(this.totalCycles).fill(this.cycle).flat();
        this.currentPhaseIndex = 0;
        this.animationFrame = null;
        this.phaseTimer = null;

        this.initialize();
    }

    initialize() {
        this.instruction.style.transition = 'color 0.3s';
        this.progress.style.transform = 'translateZ(0)'; // Force hardware acceleration
        this.progress.addEventListener('transitionend', () => this.handlePhaseEnd());
        this.progress.addEventListener('transitioncancel', () => this.reset()); // Reset on cancelled transitions
        this.startButton.addEventListener('click', () => this.start());
        this.stopButton.addEventListener('click', () => this.reset());
    }

    getCurrentCycle() {
        return Math.floor(this.currentPhaseIndex / 3) + 1;
    }

    reset() {
        // Clear any pending animations
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        
        // Clear any pending timers
        if (this.phaseTimer) {
            clearTimeout(this.phaseTimer);
            this.phaseTimer = null;
        }

        // Reset UI state
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
        
        // Cancel any existing animation frames
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        const startAnimation = () => {
            this.progress.style.width = '0';
            this.progress.style.transition = 'none';
            
            this.animationFrame = requestAnimationFrame(() => {
                this.progress.style.transition = `width ${phase.duration}s linear`;
                this.progress.style.width = '100%';
                
                // Fallback timer in case transition events fail
                this.phaseTimer = setTimeout(() => {
                    if (this.currentPhaseIndex === index) {
                        this.handlePhaseEnd();
                    }
                }, phase.duration * 1000 + 100);
            });
        };
        
        this.animationFrame = requestAnimationFrame(startAnimation);
        
        if (phase.sound) {
            this.bell.play().catch(() => {
                console.log('Sound playback failed - continuing without sound');
            });
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