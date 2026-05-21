// Cinematic Web Audio API Sound Synthesizer for Retro War Bunker Outpost
let audioCtx = null;
let masterVolumeNode = null;
let isMuted = false; // Audio defaults to ON, initializing upon the first click gesture to comply with browser autoplay policies

// Background Music loop state variables
let bgMusicInterval = null;
let bgOscillators = [];
let bgGainNode = null;

// Load initial mute state from localStorage
try {
  const savedMute = localStorage.getItem('war_console_audio_muted');
  if (savedMute !== null) {
    isMuted = savedMute === 'true';
  }
} catch (e) {
  console.warn("Storage access not allowed.", e);
}

// Lazy-initializer for the AudioContext
const initAudio = () => {
  if (audioCtx) {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return;
  }
  
  // Cross-browser AudioContext initialization
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  
  audioCtx = new AudioContextClass();
  masterVolumeNode = audioCtx.createGain();
  
  // Set initial master gain based on mute state
  masterVolumeNode.gain.setValueAtTime(isMuted ? 0 : 0.8, audioCtx.currentTime);
  masterVolumeNode.connect(audioCtx.destination);

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  // Auto-start ambient tactical background music drone if not muted
  if (!isMuted) {
    startBgMusic();
  }
};

export const setMuteState = (mute) => {
  isMuted = mute;
  try {
    localStorage.setItem('war_console_audio_muted', String(mute));
  } catch (e) {}

  if (!audioCtx) initAudio();
  
  if (audioCtx && masterVolumeNode) {
    // Resume context if suspended
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    // Smooth transition for mute/unmute to prevent clicks
    const targetGain = mute ? 0 : 0.8;
    masterVolumeNode.gain.setTargetAtTime(targetGain, audioCtx.currentTime, 0.05);
  }

  // Dynamically control background music based on mute selection
  if (mute) {
    stopBgMusic();
  } else {
    startBgMusic();
  }
};

export const getMuteState = () => isMuted;

// ==========================================
// 1. BACKGROUND MUSIC / ATMOSPHERIC TACTICAL DRONE
// ==========================================
export const startBgMusic = () => {
  try {
    if (!audioCtx) initAudio();
    if (!audioCtx || isMuted) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    // Prevent duplicate ambient loops
    if (bgMusicInterval) return;

    // Dedicated low-volume gain node for the BG music to avoid clipping SFX
    bgGainNode = audioCtx.createGain();
    bgGainNode.gain.setValueAtTime(0.04, audioCtx.currentTime); // Extremely subtle background mix
    bgGainNode.connect(masterVolumeNode);

    // A. Sub-bass Reactor Generator Hum (Continuous low-frequency power drone)
    const humOsc1 = audioCtx.createOscillator();
    const humOsc2 = audioCtx.createOscillator();
    const humFilter = audioCtx.createBiquadFilter();

    humOsc1.type = 'sine';
    humOsc1.frequency.setValueAtTime(55, audioCtx.currentTime); // Note A1
    
    humOsc2.type = 'triangle';
    humOsc2.frequency.setValueAtTime(55.3, audioCtx.currentTime); // Detuned chorus hum

    humFilter.type = 'lowpass';
    humFilter.frequency.setValueAtTime(110, audioCtx.currentTime);

    humOsc1.connect(humFilter);
    humOsc2.connect(humFilter);
    humFilter.connect(bgGainNode);

    humOsc1.start();
    humOsc2.start();
    bgOscillators.push(humOsc1, humOsc2);

    // B. Mainframe Radar arpeggio sequence loop (Retro-futuristic Minor 7th progression)
    // Notes: A2 (110Hz), C3 (130.81Hz), E3 (164.81Hz), G3 (196.00Hz)
    const melodyNotes = [110.00, 130.81, 164.81, 196.00, 164.81, 130.81];
    let noteIndex = 0;

    const playMelodyStep = () => {
      if (isMuted || !bgGainNode) return;

      const mOsc = audioCtx.createOscillator();
      const mGain = audioCtx.createGain();
      const mFilter = audioCtx.createBiquadFilter();

      mOsc.type = 'triangle';
      mOsc.frequency.setValueAtTime(melodyNotes[noteIndex], audioCtx.currentTime);
      noteIndex = (noteIndex + 1) % melodyNotes.length;

      // Filter to sound like legacy vacuum-tube computer clicks
      mFilter.type = 'lowpass';
      mFilter.frequency.setValueAtTime(320, audioCtx.currentTime);

      mGain.gain.setValueAtTime(0, audioCtx.currentTime);
      mGain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.4); // Warm attack sweep
      mGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.0); // Smooth trailing decay

      mOsc.connect(mFilter);
      mFilter.connect(mGain);
      mGain.connect(bgGainNode);

      mOsc.start();
      mOsc.stop(audioCtx.currentTime + 2.2);

      // Clean up finished oscillators
      setTimeout(() => {
        try {
          mOsc.disconnect();
          mFilter.disconnect();
          mGain.disconnect();
        } catch (e) {}
      }, 2300);
    };

    // Initialize immediate arpeggio step and start looping every 1.8s
    playMelodyStep();
    bgMusicInterval = setInterval(playMelodyStep, 1800);

  } catch (e) {
    console.error("Ambient music generator failed", e);
  }
};

export const stopBgMusic = () => {
  if (bgMusicInterval) {
    clearInterval(bgMusicInterval);
    bgMusicInterval = null;
  }

  // Instantly terminate running ambient oscillators
  bgOscillators.forEach(osc => {
    try {
      osc.stop();
      osc.disconnect();
    } catch (e) {}
  });
  bgOscillators = [];

  if (bgGainNode) {
    try {
      bgGainNode.disconnect();
    } catch (e) {}
    bgGainNode = null;
  }
};

// ==========================================
// 2. SOUND EFFECTS (SFX)
// ==========================================

// Synthesize short mechanical military toggle/relay click
export const playClick = () => {
  try {
    initAudio();
    if (!audioCtx || isMuted) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.08);

    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

    osc.connect(gainNode);
    gainNode.connect(masterVolumeNode);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.09);
  } catch (e) {
    console.error("Click audio error", e);
  }
};

// Synthesize heavy mortar/missile detonation explosion rumble
export const playExplosion = () => {
  try {
    initAudio();
    if (!audioCtx || isMuted) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const bufferSize = audioCtx.sampleRate * 1.5; // 1.5 seconds of noise
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate white noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = buffer;

    // Filter to shape into a deep explosion rumble
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, audioCtx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(15, audioCtx.currentTime + 1.2);
    filter.Q.setValueAtTime(8, audioCtx.currentTime);

    // Dynamic Volume Envelope
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(1.0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.7, audioCtx.currentTime + 0.1); // Initial shockwave spike
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.4); // Long trailing rumble decay

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(masterVolumeNode);

    // Layer a deep sub-bass oscillator for structural physical punch
    const subOsc = audioCtx.createOscillator();
    const subGain = audioCtx.createGain();

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(90, audioCtx.currentTime);
    subOsc.frequency.linearRampToValueAtTime(25, audioCtx.currentTime + 0.8);

    subGain.gain.setValueAtTime(0.9, audioCtx.currentTime);
    subGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

    subOsc.connect(subGain);
    subGain.connect(masterVolumeNode);

    // Fire both sounds
    noiseSource.start();
    subOsc.start();
    
    noiseSource.stop(audioCtx.currentTime + 1.5);
    subOsc.stop(audioCtx.currentTime + 1.5);
  } catch (e) {
    console.error("Explosion audio error", e);
  }
};

// Synthesize dual-tone high-frequency computer alert pings
export const playWarningBeep = () => {
  try {
    initAudio();
    if (!audioCtx || isMuted) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    osc.frequency.setValueAtTime(660, audioCtx.currentTime + 0.12);

    gainNode.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.28);

    osc.connect(gainNode);
    gainNode.connect(masterVolumeNode);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  } catch (e) {
    console.error("Warning audio error", e);
  }
};

// Synthesize sweep LFO emergency siren
let wailingSirenInterval = null;
let currentSirenSources = [];

export const startSiren = () => {
  try {
    initAudio();
    if (!audioCtx || isMuted) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    // Prevent duplicate sirens
    if (wailingSirenInterval) return;

    const playSirenPulse = () => {
      if (isMuted) return;
      
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(680, audioCtx.currentTime + 0.85);
      osc.frequency.linearRampToValueAtTime(320, audioCtx.currentTime + 1.7);

      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.85);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.7);

      osc.connect(gainNode);
      gainNode.connect(masterVolumeNode);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.7);
      
      currentSirenSources.push(osc);
      // Clean old sources
      setTimeout(() => {
        currentSirenSources = currentSirenSources.filter(s => s !== osc);
      }, 1800);
    };

    playSirenPulse();
    wailingSirenInterval = setInterval(playSirenPulse, 1800);
  } catch (e) {
    console.error("Siren audio error", e);
  }
};

export const stopSiren = () => {
  if (wailingSirenInterval) {
    clearInterval(wailingSirenInterval);
    wailingSirenInterval = null;
  }
  
  // Instantly terminate running siren oscillators
  currentSirenSources.forEach(src => {
    try {
      src.stop();
    } catch (e) {}
  });
  currentSirenSources = [];
};

// Synthesize military radar sweeps/sonar pulse
export const playSonarPing = () => {
  try {
    initAudio();
    if (!audioCtx || isMuted) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.7);

    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);

    osc.connect(gainNode);
    gainNode.connect(masterVolumeNode);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.6);
  } catch (e) {
    console.error("Sonar audio error", e);
  }
};

// Synthesize modular digital glitch burst for terminal glitches
export const playGlitch = () => {
  try {
    initAudio();
    if (!audioCtx || isMuted) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, audioCtx.currentTime);
    osc.frequency.setValueAtTime(900, audioCtx.currentTime + 0.03);
    osc.frequency.setValueAtTime(150, audioCtx.currentTime + 0.06);
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.09);

    // Apply rapid volumetric modulation envelope
    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime + 0.03);
    gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime + 0.06);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

    osc.connect(gainNode);
    gainNode.connect(masterVolumeNode);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.16);
  } catch (e) {
    console.error("Glitch audio error", e);
  }
};
