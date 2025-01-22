import React, { useState, useEffect, useRef } from 'react';
import * as Tone from "tone";
import Slider from "../modules/Slider"
import PlayButton from "../modules/Playbutton";
import Dropdown from '../modules/Dropdown';
import WaveformAnimation from "../modules/WaveformAnimation";

const SoundMaker = (props) => {
  const [harmonicity, setHarmonicity] = useState(2);
  const [oscillator, setOscillator] = useState("sine");
  const [modulation, setModulation] = useState("square");
  const [envAttack, setEnvAttack] = useState(0.1);
  const [envDecay, setEnvDecay] = useState(0.2);
  const [envSustain, setEnvSustain] = useState(0.5);
  const [envRelease, setEnvRelease] = useState(0.8);
  const [modEnvAttack, setModEnvAttack] = useState(0.1);
  const [modEnvDecay, setModEnvDecay] = useState(0.2);
  const [modEnvSustain, setModEnvSustain] = useState(0.5);
  const [modEnvRelease, setModEnvRelease] = useState(0.8);
  const [note, setNote] = useState("C4");

  const waveforms = ["sine", "square", "triangle", "sawtooth", "fatsawtooth"];

  const fmSynth = useRef(new Tone.FMSynth({
    harmonicity: harmonicity,
    modulationIndex: 10,
    oscillator: { type: oscillator },
    modulation: { type: modulation },
    envelope: { attack: envAttack, decay: envDecay, sustain: envSustain, release: envRelease },
    modulationEnvelope: { attack: modEnvAttack, decay: modEnvDecay, sustain: modEnvSustain, release: modEnvRelease }
  }).toDestination());

  useEffect(() => {
    fmSynth.current.set({
      harmonicity: harmonicity,
      oscillator: { type: oscillator },
      modulation: { type: modulation },
      envelope: { attack: envAttack, decay: envDecay, sustain: envSustain, release: envRelease },
      modulationEnvelope: { attack: modEnvAttack, decay: modEnvDecay, sustain: modEnvSustain, release: modEnvRelease }
    });
  }, [
    harmonicity, oscillator, modulation,
    envAttack, envDecay, envSustain, envRelease,
    modEnvAttack, modEnvDecay, modEnvSustain, modEnvRelease
  ]);

  const playNote = () => {
    fmSynth.current.triggerAttackRelease(note, "2n");
  };

  return (
    <div className="soundmaker-container">
    <Dropdown
        label="Oscillator Waveform"
        options={waveforms}
        value={oscillator}
        onChange={setOscillator}
      />
      <Dropdown
        label="Modulation Waveform"
        options={waveforms}
        value={modulation}
        onChange={setModulation}
      />
      <Slider
        label="Harmonicity"
        min={0}
        max={10}
        step={0.1}
        value={harmonicity}
        onChange={setHarmonicity}
      />
      <Slider
        label="Envelope Attack"
        min={0}
        max={2}
        step={0.01}
        value={envAttack}
        onChange={setEnvAttack}
      />
      <Slider
        label="Envelope Decay"
        min={0}
        max={2}
        step={0.01}
        value={envDecay}
        onChange={setEnvDecay}
      />
      <Slider
        label="Envelope Sustain"
        min={0}
        max={1}
        step={0.01}
        value={envSustain}
        onChange={setEnvSustain}
      />
      <Slider
        label="Envelope Release"
        min={0}
        max={5}
        step={0.01}
        value={envRelease}
        onChange={setEnvRelease}
      />
      <Slider
        label="Modulation Envelope Attack"
        min={0}
        max={2}
        step={0.01}
        value={modEnvAttack}
        onChange={setModEnvAttack}
      />
      <Slider
        label="Modulation Envelope Decay"
        min={0}
        max={2}
        step={0.01}
        value={modEnvDecay}
        onChange={setModEnvDecay}
      />
      <Slider
        label="Modulation Envelope Sustain"
        min={0}
        max={1}
        step={0.01}
        value={modEnvSustain}
        onChange={setModEnvSustain}
      />
      <Slider
        label="Modulation Envelope Release"
        min={0}
        max={5}
        step={0.01}
        value={modEnvRelease}
        onChange={setModEnvRelease}
      />
      <PlayButton onClick={playNote} />
      <button onClick={playNote}>Play Sound</button>
      <WaveformAnimation fmSynth={fmSynth.current} />
    </div>
  );
};

export default SoundMaker;
