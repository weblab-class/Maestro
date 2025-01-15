import React, { useState, useEffect, useContext } from "react";
import { get } from "../../utilities";
import "./Keyboard.css";
import Key from "./Key";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} buttonBinds
 */
const Keyboard = (props) => {
  const splits = [10, 20, 29, 37]; // End indices of each range

  return (
    <div className="keyboard-container">
      {splits.map((end, index) => {
        const start = index === 0 ? 0 : splits[index - 1]; // Calculate start index
        return (
          <div key={`slice-${index}`} className="keyboard-row">
            {props.buttonBinds.slice(start, end).map((bind) => (
              <Key
                buttonKey={bind.key}
                key={bind.key}
                guy={bind.guy}
                onButtonClick={props.onButtonClick}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
