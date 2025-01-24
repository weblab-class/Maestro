import React from 'react';
import "./Dropdown.css"

const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="dropdown-container">
    <div className="dropdown-label"><label>{label}: </label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select></div>
    </div>
  );
};

export default Dropdown;
