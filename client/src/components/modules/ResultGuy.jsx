import React, { memo, useState, useEffect } from "react";
import "./ResultGuy.css";
import { get } from "../../utilities";
import { Link } from "react-router-dom";

/**
 * ResultGuy displays details of a single guy result.
 *
 * Proptypes:
 * @param {number} index The relative index of the guy in the current page
 * @param {Object} guy
 * @param {Function} setter Sets the selectedGuy in Search
 */

const ResultGuy = memo((props) => {
  const guy = props.guy;

  const [creatorName, setCreatorName] = useState("");

  useEffect(() => {
    get("/api/username", { creator_id: guy.creator_id }).then((userResponse) => {
      setCreatorName(userResponse.name);
    });
  }, []);

  const onClick = () => {
    props.setter(guy);
    var sound = new Audio(guy.sound);
    sound.play();
  };

  return (
    <div className="result-guy-box">
      <p className="result-guy-index">{props.index}</p>
      <button className="result-guy-image-button">
        <img
          src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${guy.asset_id}/512.webp`}
          className="result-guy-image"
          onClick={onClick}
        />
      </button>
      <p className="result-guy-name">{guy.name}</p>

      <Link to={`/profile/${guy.creator_id}`} className="result-guy-username">
        {creatorName}
      </Link>
    </div>
  );
});

export default ResultGuy;
