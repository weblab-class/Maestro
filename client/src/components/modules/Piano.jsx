import React from "react";
import "./Piano.css";

// in-progress: notes are in drop down for now 
const Piano = ({ setNote, playNote }) => {
    const keys = [
        { note: "A0", color: "white" },
        { note: "A#0", color: "black" },
        { note: "B0", color: "white" },
        { note: "C1", color: "white" },
        { note: "C#1", color: "black" },
        { note: "D1", color: "white" },
        { note: "D#1", color: "black" },
        { note: "E1", color: "white" },
        { note: "F1", color: "white" },
        { note: "F#1", color: "black" },
        { note: "G1", color: "white" },
        { note: "G#1", color: "black" },
        { note: "A1", color: "white" },
        { note: "A#1", color: "black" },
        { note: "B1", color: "white" },
        { note: "C2", color: "white" },
        { note: "C#2", color: "black" },
        { note: "D2", color: "white" },
        { note: "D#2", color: "black" },
        { note: "E2", color: "white" },
        { note: "F2", color: "white" },
        { note: "F#2", color: "black" },
        { note: "G2", color: "white" },
        { note: "G#2", color: "black" },
        { note: "A2", color: "white" },
        { note: "A#2", color: "black" },
        { note: "B2", color: "white" },
        { note: "C3", color: "white" },
        { note: "C#3", color: "black" },
        { note: "D3", color: "white" },
        { note: "D#3", color: "black" },
        { note: "E3", color: "white" },
        { note: "F3", color: "white" },
        { note: "F#3", color: "black" },
        { note: "G3", color: "white" },
        { note: "G#3", color: "black" },
        { note: "A3", color: "white" },
        { note: "A#3", color: "black" },
        { note: "B3", color: "white" },
        { note: "C4", color: "white" },
        { note: "C#4", color: "black" },
        { note: "D4", color: "white" },
        { note: "D#4", color: "black" },
        { note: "E4", color: "white" },
        { note: "F4", color: "white" },
        { note: "F#4", color: "black" },
        { note: "G4", color: "white" },
        { note: "G#4", color: "black" },
        { note: "A4", color: "white" },
        { note: "A#4", color: "black" },
        { note: "B4", color: "white" },
        { note: "C5", color: "white" },
        { note: "C#5", color: "black" },
        { note: "D5", color: "white" },
        { note: "D#5", color: "black" },
        { note: "E5", color: "white" },
        { note: "F5", color: "white" },
        { note: "F#5", color: "black" },
        { note: "G5", color: "white" },
        { note: "G#5", color: "black" },
        { note: "A5", color: "white" },
        { note: "A#5", color: "black" },
        { note: "B5", color: "white" },
        { note: "C6", color: "white" },
        { note: "C#6", color: "black" },
        { note: "D6", color: "white" },
        { note: "D#6", color: "black" },
        { note: "E6", color: "white" },
        { note: "F6", color: "white" },
        { note: "F#6", color: "black" },
        { note: "G6", color: "white" },
        { note: "G#6", color: "black" },
        { note: "A6", color: "white" },
        { note: "A#6", color: "black" },
        { note: "B6", color: "white" },
        { note: "C7", color: "white" },
        { note: "C#7", color: "black" },
        { note: "D7", color: "white" },
        { note: "D#7", color: "black" },
        { note: "E7", color: "white" },
        { note: "F7", color: "white" },
        { note: "F#7", color: "black" },
        { note: "G7", color: "white" },
        { note: "G#7", color: "black" },
        { note: "A7", color: "white" },
        { note: "A#7", color: "black" },
        { note: "B7", color: "white" },
        { note: "C8", color: "white" }
      ];

  const handleKeyClick = (keyNote) => {
    setNote(keyNote);
    playNote();
  };

  return (<div className="piano">
      {keys.map((key, index) => (
        <div
          key={key.note}
          className={`piano-key ${key.color}`}
          onClick={() => handleKeyClick(key.note)}
          style={{
            left: key.color === 'black' ? `${(index + 1) * 30 - 9}px` : '',
          }}
        >
          {key.color === "black" ? (
            <span className="black-key-label">{key.note}</span>
          ) : (
            key.note
          )}
        </div>
      ))}
    </div>

  );
}
export default Piano;
