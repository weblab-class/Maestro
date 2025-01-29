import "./GuyListGuy.css";
import { get } from "../../utilities";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

/**
 * GuyListGuy is a container for guy documents. These contain an emoticon and a sound.
 *
 * Proptypes
 * @param {Object} guy
 * @param {String} key
 * @param {Function} onGuyClick
 */
const GuyListGuy = (props) => {
  const { isAnimated } = useContext(UserContext);
  const guy = props.guy;

  const [creatorId, setCreatorId] = useState("");

  useEffect(() => {
    get("/api/username", { creator_id: guy.creator_id }).then((userResponse) => {
      setCreatorId(userResponse.name);
    });
  }, [guy]);

  return (
    <button className="guy-button tooltip" width="120" height="120">
      <span className="tooltiptext">{guy.name + " by " + creatorId} </span>
      <img
        className="guy-icon"
        src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${guy.asset_id}/512.${
          +isAnimated ? "webp" : "png"
        }`}
        onClick={() => props.setSelectedGuy(guy)}
        width="100"
        height="100"
      />
    </button>
  );
};

export default GuyListGuy;
