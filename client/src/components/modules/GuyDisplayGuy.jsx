import "./GuyDisplayGuy.css";
import { get, post } from "../../utilities";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

/**
 * Guy is a container for guy documents. These contain an emoticon and a sound.
 *
 * Proptypes
 * @param {Object} guy
 * @param {String} key
 * @param {Function} onGuyClick
 */
const GuyDisplayGuy = (props) => {
  const { isAnimated } = useContext(UserContext);
  const selectedGuy = props.selectedGuy;
  const [guy, setGuy] = useState(props.guy);
  const [id, setId] = useState(props.guy._id);

  const [creatorId, setCreatorId] = useState("");

  const handleClick = () => {
    if (selectedGuy) {
      post("/api/switchGuys", { oldGuyId: guy._id, newGuyId: selectedGuy._id })
        .then(({ newGuy }) => {
          console.log("New Guy: " + newGuy.name);
          setGuy(newGuy);
          props.setSelectedGuy(null);
          setId(newGuy._id);
        })
        .catch(() => alert("You cannot have duplicate guys in your list!"));
    }
  };

  useEffect(() => {
    get("/api/username", { creator_id: guy.creator_id }).then((userResponse) => {
      setCreatorId(userResponse.name);
    });
  }, [guy]);

  return (
    <button
      button_id={id}
      className="display-guy-button tooltip"
      width="80"
      height="80"
      onClick={handleClick}
    >
      <span className="tooltiptext">{guy.name + " by " + creatorId} </span>
      <img
        className="guy-icon"
        src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${guy.asset_id}/512.${
          +isAnimated ? "webp" : "png"
        }`}
        width="60"
        height="60"
      />
    </button>
  );
};

export default GuyDisplayGuy;
