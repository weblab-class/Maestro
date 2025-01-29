import React, { memo, useState, useEffect, useContext } from "react";
import "./GuyResultsGuy.css";
import { get } from "../../utilities";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import * as Tone from "tone";

/**
 * GuyResultsGuy displays details of a single guy result.
 *
 * Proptypes:
 * @param {number} index The relative index of the guy in the current page
 * @param {Object} guy
 * @param {Function} setter Sets the selectedGuy in Search
 */

const GuyResultsGuy = memo((props) => {
  const { isAnimated } = useContext(UserContext);
  const guy = props.guy;
  const selectedGuy = props.selectedGuy;
  const navigate = useNavigate();

  const [creatorName, setCreatorName] = useState("");
  let fmSynth = null;

  if (typeof guy.sound !== "string") {
    fmSynth = new Tone.FMSynth({
      ...guy.sound.parameters,
      modulationIndex: 10,
    }).toDestination();
  }

  useEffect(() => {
    get("/api/username", { creator_id: guy.creator_id }).then((userResponse) => {
      setCreatorName(userResponse.name);
    });
  }, []);

  const onClick = () => {
    props.setSelectedGuy(guy);
    if (typeof guy.sound === "string") {
      var sound = new Audio(guy.sound);
      sound.play();
    } else {
      fmSynth.triggerAttackRelease(guy.sound.note, "2n");
    }
  };

  return (
    <div className={`result-guy-box ${guy === selectedGuy ? "result-guy-selected" : ""}`}>
      <p className="result-guy-index">{props.index}</p>
      <button index={`${props.index}`} className="result-guy-image-button" onClick={onClick}>
        <img
          src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${guy.asset_id}/512.${
            +isAnimated ? "webp" : "png"
          }`}
          className="result-guy-image"
        />
      </button>
      <p className="result-guy-name">{guy.name}</p>
      <Link to={`/profile/${guy.creator_id}`} className="result-guy-username">
        {creatorName}
      </Link>
      {typeof guy.sound !== "string" && (
        <button
          onClick={() => {
            navigate("/guycreator", { state: { guy } });
          }}
          className="edit-guy-button"
        >
          Remix Guy!
        </button>
      )}
    </div>
  );
});

export default GuyResultsGuy;
