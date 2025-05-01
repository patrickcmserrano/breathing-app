import { BreathingExercise } from '../js/breathingExercise';
import { fireEvent } from '@testing-library/dom';

// Mock LanguageManager
jest.mock('../js/languageManager', () => {
  return {
    LanguageManager: jest.fn().mockImplementation(() => ({
      getText: jest.fn((key, ...args) => {
        const translations = {
          'press_start': 'Press start to begin',
          'inhale': 'Inhale for 4 seconds',
          'hold': 'Hold for 7 seconds',
          'exhale': 'Exhale for 8 seconds',
          'cycle_counter': `Cycle: ${args[0]}/4`
        };
        return translations[key] || key;
      })
    }))
  };
});

describe('BreathingExercise', () => {
  let breathingExercise;
  let startButton;
  let stopButton;
  let instruction;
  let progress;
  let cycleCounter;

  beforeEach(() => {
    jest.useFakeTimers();
    
    // Mock Audio API
    global.Audio = jest.fn().mockImplementation(() => ({
      play: jest.fn().mockResolvedValue(undefined)
    }));

    // Mock requestAnimationFrame
    window.requestAnimationFrame = jest.fn(cb => {
      setTimeout(() => cb(performance.now()), 0);
      return 1;
    });

    window.cancelAnimationFrame = jest.fn();

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
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test('initializes with correct starting state', () => {
    expect(instruction.textContent).toBe('Press start to begin');
    expect(startButton.disabled).toBe(false);
    expect(stopButton.disabled).toBe(true);
    expect(progress.style.width).toBe('0px');
    expect(cycleCounter.textContent).toBe('Cycle: 0/4');
  });

  test('starts breathing exercise when start button is clicked', async () => {
    await breathingExercise.start();
    jest.advanceTimersByTime(0);

    expect(startButton.disabled).toBe(true);
    expect(stopButton.disabled).toBe(false);
    expect(instruction.textContent).toBe('Inhale for 4 seconds');
    expect(cycleCounter.textContent).toBe('Cycle: 1/4');
  });

  test('completes one full breathing cycle', async () => {
    await breathingExercise.start();
    jest.advanceTimersByTime(0);

    // Initial state - Inhale
    expect(instruction.textContent).toBe('Inhale for 4 seconds');

    // Trigger the progress transition end for Inhale phase
    fireEvent.transitionEnd(progress);
    jest.advanceTimersByTime(0);

    // Should now be in Hold phase
    expect(instruction.textContent).toBe('Hold for 7 seconds');

    // Trigger the progress transition end for Hold phase
    fireEvent.transitionEnd(progress);
    jest.advanceTimersByTime(0);

    // Should now be in Exhale phase
    expect(instruction.textContent).toBe('Exhale for 8 seconds');

    // Trigger the progress transition end for Exhale phase
    fireEvent.transitionEnd(progress);
    jest.advanceTimersByTime(0);

    // Should be in cycle 2 now
    expect(cycleCounter.textContent).toBe('Cycle: 2/4');
  });

  test('completes all four cycles and resets', async () => {
    await breathingExercise.start();
    jest.advanceTimersByTime(0);

    // Complete all 4 cycles
    for (let i = 0; i < 12; i++) { // 3 phases * 4 cycles
      fireEvent.transitionEnd(progress);
      jest.advanceTimersByTime(0);
    }

    // Check if reset to initial state
    expect(instruction.textContent).toBe('Press start to begin');
    expect(startButton.disabled).toBe(false);
    expect(stopButton.disabled).toBe(true);
    expect(cycleCounter.textContent).toBe('Cycle: 0/4');
  });

  test('resets exercise when stop button is clicked', async () => {
    await breathingExercise.start();
    jest.advanceTimersByTime(0);
    breathingExercise.stop();

    expect(instruction.textContent).toBe('Press start to begin');
    expect(startButton.disabled).toBe(false);
    expect(stopButton.disabled).toBe(true);
    expect(progress.style.width).toBe('0px');
    expect(cycleCounter.textContent).toBe('Cycle: 0/4');
  });

  test('plays bell sound at the start of each cycle', async () => {
    await breathingExercise.start();
    expect(breathingExercise.bell.play).toHaveBeenCalledTimes(1);

    // Complete one full cycle (3 phases)
    for (let i = 0; i < 3; i++) {
      fireEvent.transitionEnd(progress);
      jest.advanceTimersByTime(0);
    }

    // Should play again at start of next cycle
    expect(breathingExercise.bell.play).toHaveBeenCalledTimes(2);
  });

  test('cleans up animation frames when stopping', async () => {
    await breathingExercise.start();
    jest.runAllTimers();
    breathingExercise.animateProgress(4000);
    jest.runAllTimers();
    
    breathingExercise.stop();
    expect(window.cancelAnimationFrame).toHaveBeenCalled();
    expect(breathingExercise.animationFrame).toBeNull();
  });

  test('updates cycle counter correctly through phases', async () => {
    await breathingExercise.start();
    jest.advanceTimersByTime(0);
    
    expect(cycleCounter.textContent).toBe('Cycle: 1/4');

    // Complete first cycle
    fireEvent.transitionEnd(progress); // Inhale -> Hold
    jest.advanceTimersByTime(0);
    expect(cycleCounter.textContent).toBe('Cycle: 1/4');

    fireEvent.transitionEnd(progress); // Hold -> Exhale
    jest.advanceTimersByTime(0);
    expect(cycleCounter.textContent).toBe('Cycle: 1/4');

    fireEvent.transitionEnd(progress); // Exhale -> Next cycle
    jest.advanceTimersByTime(0);
    expect(cycleCounter.textContent).toBe('Cycle: 2/4');
  });

  test('uses language manager for text updates', async () => {
    const getText = jest.spyOn(breathingExercise.languageManager, 'getText');
    
    await breathingExercise.start();
    jest.advanceTimersByTime(0);
    
    expect(getText).toHaveBeenCalledWith('inhale');
    expect(getText).toHaveBeenCalledWith('cycle_counter', 1);
    
    breathingExercise.stop();
    expect(getText).toHaveBeenCalledWith('press_start');
    expect(getText).toHaveBeenCalledWith('cycle_counter', 0);
  });

  test('sets correct transition timing for each phase', () => {
    breathingExercise.inhale();
    // Simulate the requestAnimationFrame callback
    jest.runAllTimers();
    expect(progress.style.transition).toBe('width 4s linear');
    expect(progress.style.width).toBe('100%');

    breathingExercise.hold();
    jest.runAllTimers();
    expect(progress.style.transition).toBe('width 7s linear');
    expect(progress.style.width).toBe('100%');

    breathingExercise.exhale();
    jest.runAllTimers();
    expect(progress.style.transition).toBe('width 8s linear');
    expect(progress.style.width).toBe('100%');
  });

  test('resets progress bar correctly between phases', async () => {
    await breathingExercise.start();
    jest.runAllTimers();

    // First phase (Inhale)
    expect(progress.style.width).toBe('100%');
    expect(progress.style.transition).toBe('width 4s linear');

    // Transition to Hold
    fireEvent.transitionEnd(progress);
    jest.runAllTimers();
    
    expect(progress.style.transition).toBe('width 7s linear');
    expect(progress.style.width).toBe('100%');
  });

  test('stops animation when exercise is stopped', async () => {
    await breathingExercise.start();
    jest.runAllTimers();

    breathingExercise.stop();
    expect(progress.style.transition).toBe('none');
    expect(progress.style.width).toBe('0px');
  });
});