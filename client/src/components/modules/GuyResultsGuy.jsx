import React, { memo, useState, useEffect, useContext } from "react";
import "./GuyResultsGuy.css";
import { get } from "../../utilities";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

/**
 * GuyResultsGuy displays details of a single guy result.
 *
 * Proptypes:
 * @param {number} index The relative index of the guy in the current page
 * @param {Object} guy
 * @param {Function} setter Sets the selectedGuy in Search
 */

const GuyResultsGuy = memo((props) => {
  const { userId } = useContext(UserContext);
  const guy = props.guy;
  const selectedGuy = props.selectedGuy;

  const [creatorName, setCreatorName] = useState("");

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
    }
  };

  const deleteGuy = () => {
    // Make the API request to delete the guy
    get(`/api/delGuy`, { guyId: guy._id }).then(() => {
      // Call the updateGuys function to remove the guy from the list
      window.location.reload();
      // props.setResetter(!props.resetter);
    });
  };

  return (
    <div className={`result-guy-box ${guy === selectedGuy ? "result-guy-selected" : ""}`}>
      <p className="result-guy-index">{props.index}</p>
      <button index={`${props.index}`} className="result-guy-image-button" onClick={onClick}>
        <img
          src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${guy.asset_id}/512.webp`}
          className="result-guy-image"
        />
      </button>
      <p className="result-guy-name">{guy.name}</p>
      <Link to={`/profile/${guy.creator_id}`} className="result-guy-username">
        {creatorName}
      </Link>
      {userId === guy.creator_id && (
        <button onClick={deleteGuy} className="delete-guy-button">
          Delete
        </button>
      )}
    </div>
  );
});

export default GuyResultsGuy;
