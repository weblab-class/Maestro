import React, { useState } from "react";
import "./Slider.css";

const Slider = ({ label, min, max, step, onChange }) => {
  const [value, setValue] = useState((min + max) / 2);

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="slider-container">
      <div className="slider-label">
        <span>{label}</span>
        <span className="slider-value">{value}</span>
      </div>
      <input
        type="range"
        className="custom-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        style={{
          background: `linear-gradient(90deg, #007bff ${percentage}%, #e9ecef ${percentage}%)`,
        }}
      />
    </div>
  );
};

export default Slider;
