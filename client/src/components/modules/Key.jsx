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

  return (
    <button className="key-button" onClick={props.onButtonClick(props.buttonKey)}>
      {props.buttonKey}
    </button>
  );
};

export default Key;
