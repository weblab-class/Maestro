import React, { useState } from "react";
import "./Slider.css";

const Slider = (props) => {
  const [value, setValue] = useState(props.value);

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (isNaN(newValue)) {
      setValue(0);
      props.onChange(0);
    } else {
      setValue(newValue);
      props.onChange(newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const percentage = ((value - props.min) / (props.max - props.min)) * 100;

  return (
    <div className="slider-container">
      <div className="slider-label">
        <span>{props.label}: </span>
      </div>

      <input
        type="number"
        className="slider-value"
        min={props.min}
        max={props.max}
        value={value}
        step={(props.max - props.min) / 20}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <input
        type="range"
        className="custom-slider"
        min={props.min}
        max={props.max}
        step={props.step}
        value={value}
        onChange={handleChange}
        tabIndex="-1"
        style={{
          background: `linear-gradient(90deg, #007bff ${percentage}%, #e9ecef ${percentage}%)`,
        }}
      />
    </div>
  );
};

export default Slider;
