import React, { useState } from "react";
import "./Slider.css";

const Slider = (props) => {
  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (isNaN(newValue)) {
      props.onChange(0);
    } else {
      props.onChange(newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const percentage = ((props.value - props.min) / (props.max - props.min)) * 100;

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
        value={props.value}
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
        value={props.value}
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
