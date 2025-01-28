import "./GuyList.css";
import GuyListGuy from "./GuyListGuy";
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
        navigate("/soundmaker");
      }}
      key="11"
    >
      Create a new Guy!
    </button>,
    <button
      className="guy-button guy-icon guy-impostor"
      onClick={() => {
        navigate("/search");
      }}
      key="12"
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
    if (event.key === "ArrowRight") {
      setDisplayRow((prevRow) => (prevRow + 1) % numRows);
    } else if (event.key === "ArrowLeft") {
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
    {/* change color  if include & put under*/}
      {/* <div className="RowIndicator">
        Row: {displayRow + 1} / {numRows}
      </div> */}
      <button  
        style={{ border: "none", outline: "none", backgroundColor: "white" }}
        onClick={() => handleKeyDown({ key: "ArrowLeft" })}> 
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#1b73e8"><path d="M400-80 0-480l400-400 61 61.67L122.67-480 461-141.67 400-80Z"/>
        </svg>
        </button>

      <div className="GuyList" onWheel={handleScroll}>
        {currentRowItems.map((item, index) => {
          // If the item has a guy_id (assuming that's how you identify a GuyListGuy)
          if (item.sound) {
            return <GuyListGuy key={index} guy={item} setSelectedGuy={props.setSelectedGuy} />;
          }
          // If the item does not have a guy_id (render a button)
          return item;
        })}
      </div>
      <button 
        style={{ border: "none", outline: "none", backgroundColor: "white" }} 
        onClick={() => handleKeyDown({ key: "ArrowRight" })}> 
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#1b73e8"><path d="m309.67-81.33-61-61.67L587-481.33 248.67-819.67l61-61.66 400 400-400 400Z"/>
        </svg>
        </button>

      <div className={`SelectedGuyIndicator ${!props.selectedGuy ? "placeholder" : ""}`}>
        {props.selectedGuy ? props.selectedGuy.name : ""}
      </div>
      <div id={props.id}></div>;
    </div>
  );
};

export default GuyList;
