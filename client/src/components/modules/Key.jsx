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
      <button
        className="key-button tooltip"
        id={props.buttonKey}
        onClick={props.onButtonClick(props.buttonKey)}
        tabIndex={-1}
      >
        <span className="tooltiptext">{guy.guy_name + " by " + guy.creator_name} </span>
        <span className="button-text">{props.buttonKey}</span>
      </button>
    );
  } else {
    return (
      <button
        className="key-button tooltip"
        id={props.buttonKey}
        onClick={props.onButtonClick(props.buttonKey)}
        tabIndex={-1}
      >
        <span className="tooltiptext">{guy.guy_name + " by " + guy.creator_name} </span>
        <img
          src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${guy.asset_id}/512.webp`}
          width="40px"
          height="40px"
        />
      </button>
    );
  }
};

export default Key;
