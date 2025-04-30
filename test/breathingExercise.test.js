import { BreathingExercise } from '../js/breathingExercise';
import { fireEvent } from '@testing-library/dom';

describe('BreathingExercise', () => {
  let breathingExercise;
  let startButton;
  let stopButton;
  let instruction;
  let progress;
  let cycleCounter;

  beforeEach(() => {
    jest.useFakeTimers();
    window.requestAnimationFrame = jest.fn(cb => cb());
    
    document.body.innerHTML = `
      <div id="instruction">Press start to begin</div>
      <div id="cycle-counter">Cycle: 0/4</div>
      <button id="start">Start</button>
      <button id="stop" disabled>Stop</button>
      <div id="progress" style="width: 0"></div>
    `;

    startButton = document.getElementById('start');
    stopButton = document.getElementById('stop');
    instruction = document.getElementById('instruction');
    progress = document.getElementById('progress');
    cycleCounter = document.getElementById('cycle-counter');
    
    breathingExercise = new BreathingExercise();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('initializes with correct starting state', () => {
    expect(instruction.textContent).toBe('Press start to begin');
    expect(startButton.disabled).toBe(false);
    expect(stopButton.disabled).toBe(true);
    expect(progress.style.width).toBe('0px');
    expect(cycleCounter.textContent).toBe('Cycle: 0/4');
  });

  test('starts breathing exercise when start button is clicked', () => {
    fireEvent.click(startButton);
    
    expect(startButton.disabled).toBe(true);
    expect(stopButton.disabled).toBe(false);
    expect(instruction.textContent).toBe('Inhale for 4 seconds');
    expect(cycleCounter.textContent).toBe('Cycle: 1/4');
  });

  test('completes one full breathing cycle', () => {
    fireEvent.click(startButton);
    
    // Initial state - Inhale
    expect(instruction.textContent).toBe('Inhale for 4 seconds');
    
    // Trigger the progress transition end for Inhale phase
    fireEvent.transitionEnd(progress);
    
    // Should now be in Hold phase
    expect(instruction.textContent).toBe('Hold for 7 seconds');
    
    // Trigger the progress transition end for Hold phase
    fireEvent.transitionEnd(progress);
    
    // Should now be in Exhale phase
    expect(instruction.textContent).toBe('Exhale for 8 seconds');
    
    // Trigger the progress transition end for Exhale phase
    fireEvent.transitionEnd(progress);
    
    // Should be in cycle 2 now
    expect(cycleCounter.textContent).toBe('Cycle: 2/4');
  });

  test('completes all four cycles and resets', () => {
    fireEvent.click(startButton);
    
    // Complete all 4 cycles
    for (let i = 0; i < 12; i++) { // 3 phases * 4 cycles
      fireEvent.transitionEnd(progress);
    }
    
    // Check if reset to initial state
    expect(instruction.textContent).toBe('Press start to begin');
    expect(startButton.disabled).toBe(false);
    expect(stopButton.disabled).toBe(true);
    expect(cycleCounter.textContent).toBe('Cycle: 0/4');
  });

  test('resets exercise when stop button is clicked', () => {
    fireEvent.click(startButton);
    fireEvent.click(stopButton);
    
    expect(instruction.textContent).toBe('Press start to begin');
    expect(startButton.disabled).toBe(false);
    expect(stopButton.disabled).toBe(true);
    expect(progress.style.width).toBe('0px');
    expect(cycleCounter.textContent).toBe('Cycle: 0/4');
  });

  test('plays bell sound at the start of each cycle', () => {
    fireEvent.click(startButton);
    expect(breathingExercise.bell.play).toHaveBeenCalledTimes(1);
    
    // Complete one full cycle (3 phases)
    for (let i = 0; i < 3; i++) {
      fireEvent.transitionEnd(progress);
    }
    
    // Should play again at start of next cycle
    expect(breathingExercise.bell.play).toHaveBeenCalledTimes(2);
  });
});