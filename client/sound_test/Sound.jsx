import React, { useRef } from "react";
import * as Tone from "tone";

function Sound (note) {
  const synth = useRef(new Tone.Synth().toDestination());

  const play = () => {
    synth.current.triggerAttackRelease(note, "8n");
  };
  return {
    play,
  };
};

export default Sound;
