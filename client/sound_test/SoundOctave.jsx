import React from "react";
import Sound from "./Sound";

function SoundOctave () {
  const soundC4 = Sound("C4");
  const soundCSharp4 = Sound("C#4");
  const soundD4 = Sound("D4");
  const soundDSharp4 = Sound("D#4");
  const soundE4 = Sound("E4");
  const soundF4 = Sound("F4");
  const soundFSharp4 = Sound("F#4");
  const soundG4 = Sound("G4");
  const soundGSharp4 = Sound("G#4");
  const soundA4 = Sound("A4");
  const soundASharp4 = Sound("A#4");
  const soundB4 = Sound("B4");
  const soundC5 = Sound("C5");


  return (
    <div>
      <h1>Click to Play Sounds</h1>
      <button onClick={soundC4.play}>Play C4</button>
      <button onClick={soundCSharp4.play}>Play C#4</button>
      <button onClick={soundD4.play}>Play D4</button>
      <button onClick={soundDSharp4.play}>Play D#4</button>
      <button onClick={soundE4.play}>Play E4</button>
      <button onClick={soundF4.play}>Play F4</button>
      <button onClick={soundFSharp4.play}>Play F#4</button>
      <button onClick={soundG4.play}>Play G4</button>
      <button onClick={soundGSharp4.play}>Play G#4</button>
      <button onClick={soundA4.play}>Play A4</button>
      <button onClick={soundASharp4.play}>Play A#4</button>
      <button onClick={soundB4.play}>Play B4</button>
      <button onClick={soundC5.play}>Play C5</button>
    </div>
  );
};

export default SoundOctave;
