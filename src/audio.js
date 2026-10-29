/**
 * Papaoutai (Slowed Instrumental) - Ambient Web Audio Synthesizer Engine
 * 
 * Generates an ethereal, melancholic "Slowed + Reverb" instrumental interpretation
 * of Stromae's iconic "Papaoutai" (Key: Bb Minor, Tempo: ~74 BPM).
 * Features:
 * - Algorithmic spacious hall reverb & tape echo
 * - 808 Sub-Bass with warm analog saturation
 * - Slowed lo-fi trap groove (808 kick, reverb clap/snare, subtle hats)
 * - Ethereal ambient chord pads (Bbm, Ab, Gb, Ebm)
 * - Signature "Papaoutai" plucked synth lead hook
 * - Signature "Où t'es, papaoutai?" melodic chorus lead
 * - Automatic detection & playback of custom external audio file if present
 */

// Note frequencies (Hz) in Bb minor scale
const N = {
  // Bass Octave 1
  Eb1: 38.89, F1: 43.65, Gb1: 46.25, Ab1: 51.91, Bb1: 58.27,
  // Bass Octave 2
  Eb2: 77.78, F2: 87.31, Gb2: 92.50, Ab2: 103.83, Bb2: 116.54,
  // Mid Octave 3 & 4
  Db3: 138.59, Eb3: 155.56, F3: 174.61, Gb3: 185.00, Ab3: 207.65, Bb3: 233.08,
  C4: 261.63, Db4: 277.18, Eb4: 311.13, F4: 349.23, Gb4: 369.99, Ab4: 415.30, Bb4: 466.16,
  // Lead Octave 5
  C5: 523.25, Db5: 554.37, Eb5: 622.25, F5: 698.46, Gb5: 739.99, Ab5: 830.61, Bb5: 932.33
};

export class CosmicAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.reverbNode = null;
    this.delayNode = null;
    this.filterNode = null;
    this.compressor = null;
    
    // Scheduler properties
    this.tempo = 74; // Slowed BPM
    this.stepDuration = (60 / this.tempo) / 4; // 16th note (~0.2027s)
    this.currentStep = 0;
    this.totalSteps = 256; // 16 bars total (4 distinct musical sections)
    this.nextStepTime = 0;
    this.timerId = null;
    this.activeVoices = new Set();
    
    // External audio support
    this.externalAudio = null;
    this.hasExternalAudio = false;
    this.checkExternalAudio();
  }

  // Check if user has provided an external mp3/wav in public/audio/
  checkExternalAudio() {
    if (typeof window === 'undefined') return;
    const testAudio = new Audio();
    testAudio.src = '/audio/papaoutai-slowed.mp3';
    testAudio.preload = 'metadata';
    testAudio.loop = true;
    
    testAudio.addEventListener('canplaythrough', () => {
      this.hasExternalAudio = true;
      this.externalAudio = testAudio;
    }, { once: true });

    testAudio.addEventListener('error', () => {
      // Fallback check for alternative naming
      const fallbackAudio = new Audio('/audio/papaoutai.mp3');
      fallbackAudio.preload = 'metadata';
      fallbackAudio.loop = true;
      fallbackAudio.addEventListener('canplaythrough', () => {
        this.hasExternalAudio = true;
        this.externalAudio = fallbackAudio;
      }, { once: true });
    }, { once: true });
  }

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();

    // 1. Master Output Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

    // 2. Warm Slowed-aesthetic Lowpass Filter (tames digital harshness)
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(3200, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(0.7, this.ctx.currentTime);

    // 3. Stereo Dynamics Compressor / Limiter
    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(-14, this.ctx.currentTime);
    this.compressor.knee.setValueAtTime(24, this.ctx.currentTime);
    this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
    this.compressor.attack.setValueAtTime(0.005, this.ctx.currentTime);
    this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

    // 4. Algorithmic Hall Reverb ("Slowed + Reverb")
    this.reverbNode = this.createReverbNode(3.2, 2.0);
    this.reverbGain = this.ctx.createGain();
    this.reverbGain.gain.setValueAtTime(0.42, this.ctx.currentTime);

    // 5. Dub-style Tape Echo
    this.delayNode = this.ctx.createDelay();
    this.delayNode.delayTime.setValueAtTime(this.stepDuration * 3, this.ctx.currentTime); // Dotted 8th
    this.delayFeedback = this.ctx.createGain();
    this.delayFeedback.gain.setValueAtTime(0.35, this.ctx.currentTime);
    const delayFilter = this.ctx.createBiquadFilter();
    delayFilter.type = 'lowpass';
    delayFilter.frequency.setValueAtTime(1600, this.ctx.currentTime);

    this.delayNode.connect(delayFilter);
    delayFilter.connect(this.delayFeedback);
    this.delayFeedback.connect(this.delayNode);

    // Master Routing:
    // Sources -> Compressor -> Filter -> MasterGain -> Destination
    this.compressor.connect(this.filterNode);
    this.filterNode.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    // Reverb & Delay sends
    this.reverbNode.connect(this.reverbGain);
    this.reverbGain.connect(this.compressor);

    this.delayNode.connect(this.reverbNode);
    this.delayNode.connect(this.compressor);
  }

  // Algorithmic stereo impulse response for dreamy cavernous reverb
  createReverbNode(duration = 3.0, decay = 2.0) {
    const rate = this.ctx.sampleRate;
    const length = Math.floor(rate * duration);
    const impulse = this.ctx.createBuffer(2, length, rate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const n = i / length;
      const env = Math.pow(1 - n, decay);
      // Gentle stereo decorrelation with decaying noise
      left[i] = (Math.random() * 2 - 1) * env;
      right[i] = (Math.random() * 2 - 1) * env;
    }

    const convolver = this.ctx.createConvolver();
    convolver.buffer = impulse;
    return convolver;
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
    if (this.isPlaying) return;
    this.init();
    if (!this.ctx) return;
    this.isPlaying = true;

    // Check if external audio is available
    if (this.hasExternalAudio && this.externalAudio) {
      try {
        this.externalAudio.currentTime = 0;
        this.externalAudio.play();
        return;
      } catch (e) {
        console.warn('External audio play failed, falling back to Web Audio synth', e);
      }
    }

    // Smooth master fade in
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(0.0001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.35, now + 2.5);

    this.currentStep = 0;
    this.nextStepTime = now + 0.1;
    this.scheduler();
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.externalAudio) {
      try { this.externalAudio.pause(); } catch (e) {}
    }

    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    }

    setTimeout(() => {
      this.activeVoices.forEach(voice => {
        try { voice.stop(); voice.disconnect(); } catch (e) {}
      });
      this.activeVoices.clear();
    }, 1300);
  }

  // Lookahead sequencer (sample-accurate scheduling)
  scheduler() {
    if (!this.isPlaying || !this.ctx) return;

    const scheduleAheadTime = 0.25;
    while (this.nextStepTime < this.ctx.currentTime + scheduleAheadTime) {
      this.scheduleStep(this.currentStep, this.nextStepTime);
      this.nextStepTime += this.stepDuration;
      this.currentStep = (this.currentStep + 1) % this.totalSteps;
    }

    this.timerId = setTimeout(() => this.scheduler(), 35);
  }

  // Musical Event Dispatcher per 16th step
  scheduleStep(step, time) {
    const bar = Math.floor(step / 16);
    const stepInBar = step % 16;
    const chordIndex = bar % 4; // 0: Bbm, 1: Ab, 2: Gb, 3: Ebm/F

    // --- 1. Ambient Pad Chords (Sustained on beat 0 of each bar) ---
    if (stepInBar === 0) {
      this.playPadChord(chordIndex, time, this.stepDuration * 15.5);
    }

    // --- 2. 808 Sub-Bass (Deep resonance) ---
    if (stepInBar === 0) {
      const bassNotes = [N.Bb1, N.Ab1, N.Gb1, N.Eb1];
      this.play808Bass(bassNotes[chordIndex], time, this.stepDuration * 14);
    } else if (chordIndex === 3 && stepInBar === 10) {
      // Bar 4 turnaround to F
      this.play808Bass(N.F1, time, this.stepDuration * 5.5);
    }

    // --- 3. Slowed Chill Drums ---
    // Section 1 has gentle drums; Sections 2, 3, 4 have full beat
    const isIntro = bar < 4;

    // 808 Kick: Beat 1 (step 0) and Beat 3.5 (step 10)
    if (stepInBar === 0 || (!isIntro && stepInBar === 10)) {
      this.play808Kick(time);
    }

    // Reverb Snare/Clap: Beat 2 (step 4) and Beat 4 (step 12)
    if (stepInBar === 4 || stepInBar === 12) {
      if (!isIntro || bar >= 2) {
        this.playReverbClap(time);
      }
    }

    // Subtle Hi-Hats on 8th notes (steps 0, 2, 4, 6, 8, 10, 12, 14)
    if (stepInBar % 2 === 0) {
      this.playHiHat(time, stepInBar % 4 === 2 ? 0.08 : 0.04);
    }

    // --- 4. Iconic Papaoutai Lead Pluck Riff ---
    // Active in Section 1 (Bars 0-3), Section 3 (Bars 8-11), Section 4 (Bars 12-15)
    if (bar < 4 || (bar >= 8 && bar < 12)) {
      this.schedulePluckRiff(chordIndex, stepInBar, time);
    }

    // --- 5. Iconic "Où t'es, papaoutai?" Vocal Lead Hook ---
    // Active in Section 2 (Bars 4-7) and Section 3 & 4 (Bars 8-15)
    if (bar >= 4) {
      this.scheduleVocalLead(bar, stepInBar, time);
    }
  }

  // --- Voice Generators ---

  // 1. Lush Ambient Pad Chord
  playPadChord(chordIdx, time, duration) {
    // Chords in Bb minor progression
    const chords = [
      [N.Bb3, N.Db4, N.F4, N.Ab4],  // Bbm7
      [N.Ab3, N.C4, N.Eb4, N.Ab4],  // Ab
      [N.Gb3, N.Bb3, N.Db4, N.F4],  // Gbmaj7
      [N.Eb3, N.Gb3, N.Bb3, N.Db4]  // Ebm7
    ];

    const notes = chords[chordIdx];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      const padFilter = this.ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, time);
      // Slight analog detuning
      osc.detune.setValueAtTime((idx - 1.5) * 5, time);

      padFilter.type = 'lowpass';
      padFilter.frequency.setValueAtTime(650, time);
      padFilter.frequency.linearRampToValueAtTime(1100, time + duration * 0.5);
      padFilter.frequency.linearRampToValueAtTime(650, time + duration);

      // Slow lush attack and release
      oscGain.gain.setValueAtTime(0.0001, time);
      oscGain.gain.linearRampToValueAtTime(0.045 / notes.length, time + 0.6);
      oscGain.gain.setValueAtTime(0.045 / notes.length, time + duration - 0.5);
      oscGain.gain.linearRampToValueAtTime(0.0001, time + duration);

      osc.connect(padFilter);
      padFilter.connect(oscGain);
      oscGain.connect(this.compressor);
      oscGain.connect(this.reverbNode);

      osc.start(time);
      osc.stop(time + duration + 0.1);
      this.trackVoice(osc);
    });
  }

  // 2. Deep 808 Sub-Bass
  play808Bass(freq, time, duration) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Punchy pitch drop at note start (classic 808 kick punch)
    osc.frequency.setValueAtTime(freq * 1.6, time);
    osc.frequency.exponentialRampToValueAtTime(freq, time + 0.04);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.24, time + 0.02);
    gain.gain.setValueAtTime(0.22, time + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(this.compressor);

    osc.start(time);
    osc.stop(time + duration + 0.05);
    this.trackVoice(osc);
  }

  // 3. Slowed 808 Kick
  play808Kick(time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(130, time);
    osc.frequency.exponentialRampToValueAtTime(44, time + 0.22);

    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

    osc.connect(gain);
    gain.connect(this.compressor);

    osc.start(time);
    osc.stop(time + 0.26);
    this.trackVoice(osc);
  }

  // 4. Slowed Reverb Snare/Clap
  playReverbClap(time) {
    // Noise burst
    const bufferSize = this.ctx.sampleRate * 0.15;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1150, time);
    filter.Q.setValueAtTime(1.4, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.compressor);
    gain.connect(this.reverbNode); // Huge send to reverb
    gain.connect(this.delayNode);

    whiteNoise.start(time);
    whiteNoise.stop(time + 0.15);
  }

  // 5. Soft Atmospheric Hi-Hat
  playHiHat(time, vol = 0.05) {
    const bufferSize = this.ctx.sampleRate * 0.04;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(8000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.compressor);

    whiteNoise.start(time);
    whiteNoise.stop(time + 0.04);
  }

  // 6. Iconic Papaoutai Lead Pluck Riff
  schedulePluckRiff(chordIdx, stepInBar, time) {
    // 16-step rhythmic pattern per bar: [step, note]
    const riffPatterns = [
      // Bar 1 (Bbm): Bb4, Db5, F5, Eb5, Db5, C5, Bb4
      { 0: N.Bb4, 2: N.Db5, 4: N.F5, 8: N.Eb5, 10: N.Db5, 12: N.C5, 14: N.Bb4 },
      // Bar 2 (Ab): Ab4, C5, Eb5, Db5, C5, Bb4, Ab4
      { 0: N.Ab4, 2: N.C5, 4: N.Eb5, 8: N.Db5, 10: N.C5, 12: N.Bb4, 14: N.Ab4 },
      // Bar 3 (Gb): Gb4, Bb4, Db5, C5, Bb4, Ab4, Gb4
      { 0: N.Gb4, 2: N.Bb4, 4: N.Db5, 8: N.C5, 10: N.Bb4, 12: N.Ab4, 14: N.Gb4 },
      // Bar 4 (Ebm/F): Eb4, Gb4, Bb4, C5, Db5, C5, F4
      { 0: N.Eb4, 2: N.Gb4, 4: N.Bb4, 8: N.C5, 10: N.Db5, 12: N.C5, 14: N.F4 }
    ];

    const note = riffPatterns[chordIdx][stepInBar];
    if (note) {
      this.playSynthPluck(note, time, this.stepDuration * 1.7);
    }
  }

  // Synthesizes the signature electronic/marimba synth pluck
  playSynthPluck(freq, time, duration) {
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'square';
    osc2.frequency.setValueAtTime(freq * 0.5, time); // 1 octave lower body
    osc2.detune.setValueAtTime(6, time);

    // Fast lowpass filter sweep gives the signature "pluck"
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2600, time);
    filter.frequency.exponentialRampToValueAtTime(700, time + 0.22);
    filter.Q.setValueAtTime(3.0, time);

    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.compressor);
    gain.connect(this.delayNode); // Echo
    gain.connect(this.reverbNode); // Reverb

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration + 0.05);
    osc2.stop(time + duration + 0.05);
    this.trackVoice(osc1);
    this.trackVoice(osc2);
  }

  // 7. Iconic "Où t'es, papaoutai?" Chorus Vocal Lead
  scheduleVocalLead(bar, stepInBar, time) {
    const barInCycle = bar % 4;

    // The iconic chorus vocal phrasing:
    // Bar 0: "Où" (F5) "t'es" (F5), "pa-pa-ou-tai" (F5 - Eb5 - Db5 - Bb4)
    // Bar 1: (Bb4 resonates with echo) ... "Où" (F5) "t'es" (F5)
    // Bar 2: "pa-pa-ou-tai" (F5 - Eb5 - Db5 - Bb4) ... "Où" (F5) "t'es" (F5)
    // Bar 3: "Où t'es, où t'es où, papaoutai" (F5 - F5 - F5 - Eb5 - Db5 - C5 - Bb4)

    const vocalMap = {
      0: {
        0: { note: N.F5, dur: 2.8 },   // "Où"
        4: { note: N.F5, dur: 2.2 },   // "t'es"
        8: { note: N.F5, dur: 1.2 },   // "pa-"
        10: { note: N.Eb5, dur: 1.2 }, // "-pa-"
        12: { note: N.Db5, dur: 1.4 }, // "-ou-"
        14: { note: N.Bb4, dur: 8.0 }  // "-tai?" (holds into next bar)
      },
      1: {
        8: { note: N.F5, dur: 2.8 },   // "Où"
        12: { note: N.F5, dur: 2.5 }   // "t'es"
      },
      2: {
        0: { note: N.F5, dur: 1.2 },   // "pa-"
        2: { note: N.Eb5, dur: 1.2 },  // "-pa-"
        4: { note: N.Db5, dur: 1.4 },  // "-ou-"
        6: { note: N.Bb4, dur: 5.0 },  // "-tai?"
        12: { note: N.F5, dur: 1.4 },  // "Où"
        14: { note: N.F5, dur: 1.4 }   // "t'es"
      },
      3: {
        0: { note: N.F5, dur: 1.4 },   // "où"
        2: { note: N.F5, dur: 1.4 },   // "t'es"
        4: { note: N.F5, dur: 1.0 },   // "où"
        5: { note: N.F5, dur: 1.0 },   // "t'es"
        6: { note: N.F5, dur: 1.0 },   // "où"
        8: { note: N.Eb5, dur: 1.4 },  // "pa-"
        10: { note: N.Db5, dur: 1.4 }, // "-pa-"
        12: { note: N.C5, dur: 1.4 },  // "-ou-"
        14: { note: N.Bb4, dur: 10.0 } // "-tai!"
      }
    };

    const event = vocalMap[barInCycle]?.[stepInBar];
    if (event) {
      this.playVocalLeadSynth(event.note, time, this.stepDuration * event.dur);
    }
  }

  // Warm melodic vocal-like synth voice with expressive vibrato and glide
  playVocalLeadSynth(freq, time, duration) {
    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    // Vibrato LFO
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(4.6, time); // Subtle 4.6Hz vocal vibrato
    lfoGain.gain.setValueAtTime(6.0, time);
    lfo.connect(osc.frequency);
    lfo.start(time);
    lfo.stop(time + duration + 0.1);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq * 0.5, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1900, time);
    filter.Q.setValueAtTime(2.2, time);

    // Expressive legato-style envelope
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.14, time + 0.05);
    gain.gain.setValueAtTime(0.12, time + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(this.compressor);
    gain.connect(this.delayNode);
    gain.connect(this.reverbNode); // Drenched in reverb

    osc.start(time);
    subOsc.start(time);
    osc.stop(time + duration + 0.05);
    subOsc.stop(time + duration + 0.05);
    this.trackVoice(osc);
    this.trackVoice(subOsc);
    this.trackVoice(lfo);
  }

  trackVoice(voice) {
    this.activeVoices.add(voice);
    voice.onended = () => {
      this.activeVoices.delete(voice);
    };
  }

  // Futuristic interactive chime for button interactions
  playChime(pitch = 880) {
    if (!this.ctx || this.ctx.state === 'suspended') return;

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
