require('@testing-library/jest-dom');

// Mock the Audio API
const mockAudioConstructor = jest.fn();
class MockAudio {
  constructor(src) {
    mockAudioConstructor(src);
    this.play = jest.fn();
    this.pause = jest.fn();
    this.loop = false;
    this.src = src;
  }
}
window.Audio = MockAudio;
window.Audio.mockConstructor = mockAudioConstructor;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});