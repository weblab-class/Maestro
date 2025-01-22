import React, { useState, useEffect, useRef } from 'react';
import * as Tone from "tone";
import Slider from "../modules/Slider"
import PlayButton from "../modules/Playbutton";
import Dropdown from '../modules/Dropdown';
import WaveformAnimation from "../modules/WaveformAnimation";
import { post } from "../../utilities"
// import sound from '../../../../server/models/sound';
// import Form from "../modules/Form";
// import Piano from "../modules/Piano";

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

  const notes = [
    "A0", "A#0", "B0", "C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1",
    "A1", "A#1", "B1", "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2",
    "A2", "A#2", "B2", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3",
    "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4",
    "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5",
    "A5", "A#5", "B5", "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6",
    "A6", "A#6", "B6", "C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7",
    "A7", "A#7", "B7", "C8"
  ];

  const playNote = () => {
    fmSynth.current.triggerAttackRelease(note, "2n");
  };

  const saveSound = () => {
    const soundData = {
      note, 
      harmonicity, 
      oscillator,
      modulation,
      envelope: {
        attack: envAttack,
        decay: envDecay,
        sustain: envSustain,
        release: envRelease,
      },
      modulationEnvelope: {
        attack: modEnvAttack,
        decay: modEnvDecay,
        sustain: modEnvSustain,
        release: modEnvRelease,
      }
    };
    // I think the error is here - may have written this function wrong 
      post("/api/postSound", soundData)
        .then((res) => {
          const soundId = res.soundId;
          post("/api/postGuy", { soundId });
        })
    };

  return (
    <div
    className="soundmaker-container">
    <Dropdown
        label="Note"
        options={notes}
        value={note}
        onChange={setNote}
      />
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
      <button onClick={saveSound}>Save Sound</button>
      <WaveformAnimation fmSynth={fmSynth.current} />
      </div>

  );
};

export default SoundMaker;
