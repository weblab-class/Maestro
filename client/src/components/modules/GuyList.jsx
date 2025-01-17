import "./GuyList.css";
import Guy from "./Guy";
import { GuyContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const GuyList = (props) => {
  const navigate = useNavigate();
  const { guyList } = useContext(GuyContext);
  const [displayRow, setDisplayRow] = useState(0); // Track the visible row number
  const itemsPerRow = 8;

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
  const numRows = Math.ceil(guyList.length / itemsPerRow);

  // Handle scroll event
  const handleScroll = (event) => {
    if (event.deltaY > 0) {
      setDisplayRow((prevRow) => (prevRow + 1) % numRows);
    } else if (event.deltaY < 0) {
      setDisplayRow((prevRow) => (prevRow - 1 + numRows) % numRows);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setDisplayRow((prevRow) => (prevRow + 1) % numRows);
    } else if (event.key === "ArrowUp") {
      setDisplayRow((prevRow) => (prevRow - 1 + numRows) % numRows);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [numRows]);

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
          if (item.guy_id) {
            return <Guy key={item.guy_id} guy={item} onGuyClick={props.onGuyClick} />;
          }
          // If the item does not have a guy_id (render a button)
          return item;
        })}
      </div>

      <div className={`SelectedGuyIndicator ${!props.selectedGuy ? "placeholder" : ""}`}>
        {props.selectedGuy ? props.selectedGuy.guy_name : ""}
      </div>
    </div>
  );
};

export default GuyList;
