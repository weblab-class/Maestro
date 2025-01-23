import React, { useEffect, useRef } from "react";
import * as Tone from "tone";
import "./WaveformAnimation.css";

const WaveformAnimation = ({ fmSynth }) => {
  const canvasRef = useRef(null);

  const analyser = useRef(new Tone.Analyser("waveform", 1024));
  fmSynth.connect(analyser.current);

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const waveform = analyser.current.getValue();

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();

    const width = canvas.width;
    const height = canvas.height;
    const step = Math.ceil(waveform.length / width);
    const amplitude = height / 2;

    for (let i = 0; i < width; i++) {
      const index = i * step;
      const y = waveform[index] * amplitude + amplitude;
      if (i === 0) {
        context.moveTo(i, y);
      } else {
        context.lineTo(i, y);
      }
    }
    context.strokeStyle = "#8ACE00"; //Green
    context.lineWidth = 3;
    context.stroke();
  };

  useEffect(() => {
    const intervalId = setInterval(drawWaveform, 1000 / 60);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="waveform-animation">
      <canvas
        ref={canvasRef}
        width={400}
        height={150}
        style={{ border: "1px solid #000", marginTop: "20px" }}
      />
    </div>
  );
};

export default WaveformAnimation;
