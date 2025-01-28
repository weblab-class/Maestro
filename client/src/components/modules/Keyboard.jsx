import React from "react";
import "./Keyboard.css";
import Key from "./Key";

/**
 * Keyboard contains keys corresponding to the letters and keys on the keyboard.
 *
 * Proptypes
 * @param {[Object]} buttonBinds // has key and guy property
 * @param {Function} onButtonClick // run when key gets clicked
 *
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
                key={bind.key}
                buttonKey={bind.key}
                guy={bind.guy}
                onButtonClick={props.onButtonClick}
                guyVisibility={props.guyVisibility}
              />
            ))}
          </div>
        );
      })}
      <div id={props.id}></div>;
    </div>
  );
};

export default Keyboard;
