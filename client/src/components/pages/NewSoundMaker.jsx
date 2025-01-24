import React, { useState, useEffect, useRef, useContext } from "react";
import * as Tone from "tone";
import Slider from "../modules/Slider";
import Dropdown from "../modules/Dropdown";
import WaveformAnimation from "../modules/WaveformAnimation";
import { post, get } from "../../utilities";
import { UserContext } from "../App";
import { GoogleLogin } from "@react-oauth/google";

import { useNavigate } from "react-router-dom";

import pfpIds from "../../assets/pfpIds";
import "./NewSoundMaker.css";

const NewSoundMaker = (props) => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
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

  const [guyName, setGuyName] = useState("");
  const [assetId, setAssetId] = useState("");
  const [username, setUsername] = useState(null);

  const navigate = useNavigate();

  const waveforms = ["sine", "square", "triangle", "sawtooth", "fatsawtooth"];

  const fmSynth = useRef(
    new Tone.FMSynth({
      harmonicity: harmonicity,
      modulationIndex: 10,
      oscillator: { type: oscillator },
      modulation: { type: modulation },
      envelope: { attack: envAttack, decay: envDecay, sustain: envSustain, release: envRelease },
      modulationEnvelope: {
        attack: modEnvAttack,
        decay: modEnvDecay,
        sustain: modEnvSustain,
        release: modEnvRelease,
      },
    }).toDestination()
  );

  useEffect(() => {
    fmSynth.current.set({
      harmonicity: harmonicity,
      oscillator: { type: oscillator },
      modulation: { type: modulation },
      envelope: { attack: envAttack, decay: envDecay, sustain: envSustain, release: envRelease },
      modulationEnvelope: {
        attack: modEnvAttack,
        decay: modEnvDecay,
        sustain: modEnvSustain,
        release: modEnvRelease,
      },
    });
  }, [
    harmonicity,
    oscillator,
    modulation,
    envAttack,
    envDecay,
    envSustain,
    envRelease,
    modEnvAttack,
    modEnvDecay,
    modEnvSustain,
    modEnvRelease,
  ]);

  useEffect(() => {
    if (userId) {
      get("/api/user", { userid: userId }).then((userObj) => {
        setUsername(userObj.name);
      });
    } else {
      setUsername(null);
    }
  }, [userId]);

  function isValidNote(input) {
    // Regular expression to match musical notes from A0 to C8 (including sharps)
    const noteRegex = /^(A|B|C|D|E|F|G)(#|b)?[0-8]$/;

    // Test the input against the regex
    return noteRegex.test(input);
  }

  const checkAssetId = (id) => {
    // Check if the id is directly in the list
    if (pfpIds.includes(id)) {
      return id; // Return the id as is if it's found in the list
    }

    // Check if the id without the "u" at the start is in the list
    const idWithoutU = id.startsWith("u") ? id.slice(1) : id;
    if (pfpIds.includes(idWithoutU)) {
      return idWithoutU; // Return the id without "u" if it's found in the list
    }

    // If neither condition is met, return false
    return false;
  };

  const playNote = () => {
    if (isValidNote(note)) {
      fmSynth.current.triggerAttackRelease(note, "2n");
    } else {
      setNote("C4");
      fmSynth.current.triggerAttackRelease("C4", "2n");
    }
  };

  const saveSound = () => {
    const newAssetId = checkAssetId(assetId);
    if (newAssetId) {
      const soundData = {
        note: isValidNote(note) ? note : "C4",
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
        },
      };

      post("/api/postSound", soundData).then((res) => {
        post("/api/postGuy", {
          guy: {
            name: guyName,
            creator_id: userId,
            asset_id: newAssetId,
            sound: res.soundId,
          },
          userId: userId,
        }).then(() => {
          navigate(
            `/search?username=${encodeURIComponent(username)}&name=${encodeURIComponent(guyName)}`
          );
        });
      });
    }
  };

  if (!userId) {
    return (
      <div className="login-container">
        <GoogleLogin
          text="signin_with"
          onSuccess={handleLogin}
          onFailure={(err) => console.log(err)}
          containerProps={{ className: "NavBar-link NavBar-login" }}
        />
      </div>
    );
  }
  return (
    <div className="soundmaker-container">
      <div className="soundstuff">
        {" "}
        <div className="note-container">
          <div className="note-label">
            {" "}
            <label>Note: </label>
            <input type="text" onChange={(e) => setNote(e.target.value)} value={note} />
          </div>
        </div>
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
        <div className="sound-button-container">
          <button className="play-button" onClick={playNote}>
            Play Note
          </button>
        </div>
        <WaveformAnimation fmSynth={fmSynth.current} />
      </div>
      <div className="guystuff">
        <div className="note-container">
          <div className="note-label">
            {" "}
            <label>Guy Name: </label>
            <input
              type="text"
              onChange={(e) => {
                setGuyName(e.target.value);
              }}
            />
          </div>
          <div className="note-label">
            {" "}
            <label>Emoji code: </label>
            <input
              type="text"
              onChange={(e) => {
                setAssetId(e.target.value);
              }}
            />
          </div>
          <button className="play-button" onClick={saveSound}>
            Save Sound
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSoundMaker;
