import "./GuyDisplayGuy.css";
import { get, post } from "../../utilities";
import { useState, useEffect } from "react";

/**
 * Guy is a container for guy documents. These contain an emoticon and a sound.
 *
 * Proptypes
 * @param {Object} guy
 * @param {String} key
 * @param {Function} onGuyClick
 */
const GuyDisplayGuy = (props) => {
  const selectedGuy = props.selectedGuy;
  const [guy, setGuy] = useState(props.guy);

  const [creatorId, setCreatorId] = useState("");

  const handleClick = () => {
    if (selectedGuy) {
      post("/api/switchGuys", { oldGuyId: guy._id, newGuyId: selectedGuy._id }).then(
        ({ newGuy }) => {
          console.log(newGuy);
          setGuy(newGuy);
          props.setSelectedGuy(null);
        }
      );
    }
  };

  useEffect(() => {
    get("/api/username", { creator_id: guy.creator_id }).then((userResponse) => {
      setCreatorId(userResponse.name);
    });
  }, []);

  return (
    <button className="display-guy-button tooltip" width="80" height="80" onClick={handleClick}>
      <span className="tooltiptext">{guy.name + " by " + creatorId} </span>
      <img
        className="guy-icon"
        src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${guy.asset_id}/512.webp`}
        width="60"
        height="60"
      />
    </button>
  );
};

export default GuyDisplayGuy;
