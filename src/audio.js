/**
 * Audio Synthesizer (Disabled / Muted)
 * Zero sounds, zero AudioContext initialization.
 */
export class CosmicAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
  }

  init() {}
  toggle() { return false; }
  start() {}
  stop() {}
  playChime() {}
  playWarpJump() {}
}
