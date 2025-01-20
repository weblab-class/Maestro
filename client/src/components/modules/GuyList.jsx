import "./GuyList.css";
import Guy from "./Guy";
import { UserContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../utilities";

/**
 * GuyList renders all the guys in rows, which can be changed by clicking arrow keys or scrolling.
 *
 * Proptypes
 * @param {String} selectedGuy // Gets displayed next to guyList
 * @param {Function} onGuyClick // run when guy is clicked.
 *
 */

const GuyList = (props) => {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  const [displayRow, setDisplayRow] = useState(0); // Track the visible row number
  const itemsPerRow = 8;

  const [guyList, setGuyList] = useState([]);

  const renderList = [
    ...guyList,
    <button
      className="guy-button guy-icon guy-impostor"
      onClick={() => {
        navigate("/creator");
      }}
    >
      Create a new Guy!
    </button>,
    <button
      className="guy-button guy-icon guy-impostor"
      onClick={() => {
        navigate("/search");
      }}
    >
      Find a new Guy!
    </button>,
  ];

  // Calculate the number of rows needed
  let numRows = Math.max(1, Math.ceil(guyList.length / itemsPerRow));

  // Handle scroll event
  const handleScroll = (event) => {
    if (event.deltaY > 0) {
      setDisplayRow((prevRow) => (prevRow + 1) % numRows);
    } else if (event.deltaY < 0) {
      setDisplayRow((prevRow) => (prevRow - 1 + numRows) % numRows);
    }
  };

  // Handle up/down key clicks
  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setDisplayRow((prevRow) => (prevRow + 1) % numRows);
    } else if (event.key === "ArrowUp") {
      setDisplayRow((prevRow) => (prevRow - 1 + numRows) % numRows);
    }
  };

  // Listen for key presses
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [numRows]);

  useEffect(() => {
    get("/api/guyListGet").then(({ guyList }) => {
      setDisplayRow(0);
      setGuyList(guyList);
    });
  }, [userId]);

  // Determines currently rendered guys.
  const currentRowItems = renderList.slice(
    displayRow * itemsPerRow,
    (displayRow + 1) * itemsPerRow
  );

  return (
    <div className="GuyListWrapper">
      <div className="RowIndicator">
        Row: {displayRow + 1} / {numRows}
      </div>

      <div className="GuyList" onWheel={handleScroll}>
        {currentRowItems.map((item) => {
          // If the item has a guy_id (assuming that's how you identify a Guy)
          if (item.sound) {
            return <Guy key={item._id} guy={item} onGuyClick={props.onGuyClick} />;
          }
          // If the item does not have a guy_id (render a button)
          return item;
        })}
      </div>

      <div className={`SelectedGuyIndicator ${!props.selectedGuy ? "placeholder" : ""}`}>
        {props.selectedGuy ? props.selectedGuy.name : ""}
      </div>
    </div>
  );
};

export default GuyList;
