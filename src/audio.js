/**
 * Ambient Cosmic Audio Synthesizer (Zero-dependency Web Audio API)
 * Generates an ethereal space drone and subtle interactive UI sound effects
 */
export class CosmicAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
    this.lfo = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  toggle() {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  start() {
    if (!this.ctx) return;
    this.isPlaying = true;

    // Fade in master
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.2, this.ctx.currentTime + 3);

    // Warm chord notes (D minor cosmic pad: D2, A2, F3, C4)
    const freqs = [73.42, 110.0, 174.61, 261.63];

    // Filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, this.ctx.currentTime);

    // LFO to slowly sweep the filter
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime);
    lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);
    lfo.connect(filter.frequency);
    lfo.start();
    this.lfo = lfo;

    filter.connect(this.masterGain);

    this.oscillators = freqs.map((freq, i) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Slight detune for analog warmth
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, this.ctx.currentTime);

      oscGain.gain.setValueAtTime(0.12 / freqs.length, this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();

      return osc;
    });
  }

  stop() {
    if (!this.ctx || !this.isPlaying) return;
    this.isPlaying = false;

    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);

    setTimeout(() => {
      if (!this.isPlaying) {
        this.oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch (e) {}
        });
        this.oscillators = [];
        if (this.lfo) {
          try { this.lfo.stop(); this.lfo.disconnect(); } catch (e) {}
          this.lfo = null;
        }
      }
    }, 1600);
  }

  // Futuristic micro-click sound for button interactions
  playChime(pitch = 880) {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.26);
    } catch (e) {}
  }
}
