import React, { useState } from 'react';
import "./GuyName.css"

function GuyName() {
  const [name, setName] = useState(''); // State to store the name input

  return (
    <div className="form-container">
      <form>
        <label htmlForm="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update name state as the user types
        />
      </form>
    </div>
  );
};

export default GuyName;
