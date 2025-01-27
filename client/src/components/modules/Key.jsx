import React, { useContext, useState, useEffect, useRef } from "react";
import "./Key.css";
import { get } from "../../utilities";
import * as Tone from "tone";
import { UserContext } from "../App";

/**
 * Key represents an onscreen button, which produces a sound when clicked.
 *
 * Proptypes
 * @param {string} buttonKey // Keyboard key being represented
 * @param {Object} guy // Contains sound and emoji
 * @param {Function} onButtonClick // What happens when buttonKey gets pressed
 */

const Key = (props) => {
  const { isAnimated } = useContext(UserContext);
  const guy = props.guy;
  const guyVisibility = props.guyVisibility;

  // Makes it so the keys on the keyboard cannot be selected with tab.
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.setAttribute("tabindex", "-1");
  });

  const [creatorId, setCreatorId] = useState("");

  useEffect(() => {
    get("/api/username", { creator_id: guy.creator_id }).then((userResponse) => {
      setCreatorId(userResponse.name);
    });
  }, []);

  // Conditionally render the emoji or key, depending on guyVisibility
  if (!guyVisibility) {
    return (
      <button
        className="key-button tooltip"
        id={props.buttonKey}
        onClick={() =>
          props.onButtonClick(
            props.buttonKey,
            typeof guy.sound !== "string"
              ? new Tone.FMSynth({
                  ...guy.sound.parameters,
                  modulationIndex: 10,
                }).toDestination()
              : null
          )
        }
        tabIndex={-1}
      >
        <span className="tooltiptext">{guy.name + " by " + creatorId} </span>
        <span className="button-text">{props.buttonKey}</span>
      </button>
    );
  } else {
    return (
      <button
        className="key-button tooltip"
        id={props.buttonKey}
        onClick={() =>
          props.onButtonClick(
            props.buttonKey,
            typeof guy.sound !== "string"
              ? new Tone.FMSynth({
                  ...guy.sound.parameters,
                  modulationIndex: 10,
                }).toDestination()
              : null
          )
        }
        tabIndex={-1}
      >
        <span className="tooltiptext">{guy.name + " by " + creatorId} </span>
        <img
          src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${guy.asset_id}/512.${
            +isAnimated ? "webp" : "png"
          }`}
          width="40px"
          height="40px"
        />
      </button>
    );
  }
};

export default Key;
