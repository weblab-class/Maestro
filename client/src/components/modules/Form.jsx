import React from 'react';
import "./Form.css"

const Form = ({ label, value, onChange }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div className="form-container">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

export default Form;