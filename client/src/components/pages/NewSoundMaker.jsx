import React, { useState, useEffect, useRef, useContext } from "react";
import * as Tone from "tone";
import Slider from "../modules/Slider";
import Dropdown from "../modules/Dropdown";
import WaveformAnimation from "../modules/WaveformAnimation";
import { post, get } from "../../utilities";
import { UserContext } from "../App";
import { GoogleLogin } from "@react-oauth/google";

import { useNavigate } from "react-router-dom";

import assetIds from "../../assets/assetIds";
import "./NewSoundMaker.css";
import AvatarList from "../modules/AvatarList";

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

  const [showConfirm, setShowConfirm] = useState(false);
  const [showNavigateOption, setShowNavigateOption] = useState(false);
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === " ") {
        const pB = document.querySelectorAll(`[buttonid="play-button"]`)[0];
        pB.click();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  function isValidNote(input) {
    // Regular expression to match musical notes from A0 to C8 (including sharps)
    const noteRegex = /^(A|B|C|D|E|F|G)(#|b)?[0-8]$/;

    // Test the input against the regex
    return noteRegex.test(input);
  }

  const checkAssetId = (id) => {
    // Check if the id is directly in the list
    if (assetIds.includes(id)) {
      return id; // Return the id as is if it's found in the list
    }

    // Check if the id without the "u" at the start is in the list
    const idWithoutU = id.startsWith("u") ? id.slice(1) : id;
    if (assetIds.includes(idWithoutU)) {
      return idWithoutU; // Return the id without "u" if it's found in the list
    }

    // If neither condition is met, return false
    return false;
  };

  const playNote = () => {
    if (isValidNote(note)) {
      fmSynth.current.triggerAttackRelease(note, "2n");
    } else {
      setMessage("Choose a valid Note!");
    }
  };

  const saveSound = (bool) => {
    const newAssetId = checkAssetId(assetId);
    if (newAssetId) {
      const soundData = {
        note: "C4",
        parameters: {
          harmonicity: harmonicity,
          oscillator: { type: oscillator },
          modulation: { type: modulation },
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
        },
      };

      post("/api/postGuy", {
        guy: {
          name: guyName,
          creator_id: userId,
          asset_id: newAssetId,
          sound: soundData,
        },
        userId: userId,
      }).then(() => {
        if (bool) {
          navigate(
            `/search?username=${encodeURIComponent(username)}&name=${encodeURIComponent(guyName)}`
          );
        } else {
          setGuyName("");
          setAssetId("");
          setShowConfirm(false);
          setShowNavigateOption(false);
        }
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
            <input
              type="text"
              onChange={(e) => setNote(e.target.value)}
              value={note}
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                }
              }}
              maxLength={3}
            />
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
          <button buttonid="play-button" className="play-button" onClick={playNote}>
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
              value={guyName}
              maxLength={10}
            />
          </div>
          <div className="avatar-list-container">
            <div className="avatar-list-title"> Guy Icon</div>
            <AvatarList selectedAvatar={assetId} handleAvatarClick={setAssetId} />
          </div>
          <div>
            <button
              className="play-button"
              onClick={() => {
                if (!isValidNote(note)) {
                  setMessage("Choose a valid Note!");
                } else if (guyName.trim() === "") {
                  setMessage("Enter a valid Name!");
                } else if (assetId === "") {
                  setMessage("Select an Icon!");
                } else {
                  setMessage("");
                  setShowConfirm(true);
                }
              }}
            >
              Next
            </button>

            {message && <p style={{ color: "red" }}>{message}</p>}

            {showConfirm && !showNavigateOption && (
              <div className="confirm">
                <div className="confirm-content">
                  <p>Do you want to publish your sound?</p>
                  <div className="confirm-actions">
                    <button
                      onClick={() => {
                        setShowNavigateOption(true); // Show navigation options
                      }}
                    >
                      Publish
                    </button>
                    <button
                      onClick={() => {
                        setShowConfirm(false); // Cancel confirmation
                      }}
                    >
                      Do Not Publish
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showNavigateOption && (
              <div className="confirm">
                <div className="confirm-content">
                  <p>Would you like to navigate to another page?</p>
                  <div className="confirm-actions">
                    <button onClick={() => saveSound(true)}>Yes, navigate</button>
                    <button onClick={() => saveSound(false)}>No, stay here</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSoundMaker;
