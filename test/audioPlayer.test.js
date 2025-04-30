import { AudioPlayer } from '../js/audioPlayer';
import { fireEvent } from '@testing-library/dom';

describe('AudioPlayer', () => {
  let audioPlayer;
  let soundSelect;
  let playButton;
  let pauseButton;

  beforeEach(() => {
    document.body.innerHTML = `
      <select id="background-sound">
        <option value="">None</option>
        <option value="meditation-spiritual-music">Meditation Music</option>
      </select>
      <button id="play-sound" disabled>Play</button>
      <button id="pause-sound" disabled>Pause</button>
    `;

    soundSelect = document.getElementById('background-sound');
    playButton = document.getElementById('play-sound');
    pauseButton = document.getElementById('pause-sound');
    audioPlayer = new AudioPlayer();
    window.Audio.mockConstructor.mockClear();
  });

  test('initializes with disabled play and pause buttons', () => {
    expect(playButton.disabled).toBe(true);
    expect(pauseButton.disabled).toBe(true);
  });

  test('enables play button when sound is selected', () => {
    fireEvent.change(soundSelect, { target: { value: 'meditation-spiritual-music' } });
    expect(playButton.disabled).toBe(false);
    expect(pauseButton.disabled).toBe(true);
  });

  test('toggles buttons state when playing and pausing', () => {
    fireEvent.change(soundSelect, { target: { value: 'meditation-spiritual-music' } });
    fireEvent.click(playButton);
    
    expect(playButton.disabled).toBe(true);
    expect(pauseButton.disabled).toBe(false);
    
    fireEvent.click(pauseButton);
    expect(playButton.disabled).toBe(false);
    expect(pauseButton.disabled).toBe(true);
  });

  test('creates new audio instance with correct source', () => {
    fireEvent.change(soundSelect, { target: { value: 'meditation-spiritual-music' } });
    expect(audioPlayer.backgroundMusic).toBeInstanceOf(window.Audio);
    expect(window.Audio.mockConstructor).toHaveBeenCalledWith('assets/sounds/meditation-spiritual-music.mp3');
  });

  test('stops current audio when selecting new sound', () => {
    fireEvent.change(soundSelect, { target: { value: 'meditation-spiritual-music' } });
    const firstAudio = audioPlayer.backgroundMusic;
    
    fireEvent.change(soundSelect, { target: { value: '' } });
    expect(firstAudio.pause).toHaveBeenCalled();
    expect(audioPlayer.backgroundMusic).toBeNull();
  });

  test('sets audio to loop', () => {
    fireEvent.change(soundSelect, { target: { value: 'meditation-spiritual-music' } });
    expect(audioPlayer.backgroundMusic.loop).toBe(true);
  });
});