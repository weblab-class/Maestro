import React, { useState, useEffect, useContext } from "react";
import { get } from "../../utilities";
import "./Key.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} buttonKey
 * @param {string} guy
 */
const Key = (props) => {
  const guy = props.guy;

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.setAttribute("tabindex", "-1");
  });

  if (!props.guyVis) {
    return (
      <button className="key-button" onClick={props.onButtonClick(props.buttonKey)} tabIndex={-1}>
        {props.buttonKey}
      </button>
    );
  } else {
    return (
      <button className="key-button" onClick={props.onButtonClick(props.buttonKey)} tabIndex={-1}>
        {/* {props.buttonKey} */}
        <img
          src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${guy.asset_id}/512.png`}
          width="40px"
          height="40px"
        />
      </button>
    );
  }
};

export default Key;
