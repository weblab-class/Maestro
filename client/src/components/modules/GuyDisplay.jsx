import { useState, useEffect, useContext } from "react";
import "./GuyDisplay.css";
import { UserContext } from "../App";
import { get } from "../../utilities";
import GuyDisplayGuy from "./GuyDisplayGuy";

const GuyDisplay = (props) => {
  const userId = useContext(UserContext);
  const [guyList, setGuyList] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCol, setSelectedCol] = useState(null);

  useEffect(() => {
    if (userId) {
      get("/api/guyListGet").then(({ guyList }) => {
        setGuyList(guyList);
      });
    }
  }, [userId]);

  // Split the guyList into chunks of 8
  const rows = [];
  for (let i = 0; i < guyList.length; i += 8) {
    rows.push(guyList.slice(i, i + 8));
  }

  useEffect(() => {
    const rowKeys = "!@#$%"; // Shift + 1-5 for rows
    const colKeys = "!@#$%^&*"; // Shift + 1-8 for columns
    const handleKeyDown = (event) => {
      const key = event.key;
      if (props.selectedGuy && event.shiftKey) {
        if (selectedRow === null && rowKeys.includes(key)) {
          // Select row using keys 1-5
          setSelectedRow(Number(rowKeys.indexOf(key)));
        } else if (selectedCol === null && colKeys.includes(key)) {
          // Select column using keys 1-8
          setSelectedCol(Number(colKeys.indexOf(key)));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedRow, selectedCol, rows, props]);

  useEffect(() => {
    if (selectedCol !== null && selectedRow !== null) {
      console.log("Row: " + selectedRow);
      console.log("Col: " + selectedCol);
      const guy = rows[selectedRow]?.[selectedCol];
      console.log(guy);
      if (guy) {
        // Programmatically trigger the onClick handler for the selected guy
        const guyElement = document.getElementById(guy._id);
        console.log(guyElement);
        if (guyElement) {
          guyElement.click(); // Simulate click
        }
      }
      setSelectedRow(null);
      setSelectedCol(null); // Reset selection
    }
  }, [selectedRow, selectedCol]);

  if (userId) {
    return (
      <div className="guy-display">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className={`guy-row ${rowIdx === selectedRow ? "selected-row" : ""}`}>
            {row.map((guy, colIdx) => (
              <GuyDisplayGuy
                key={colIdx}
                guy={guy}
                selectedGuy={props.selectedGuy}
                setSelectedGuy={props.setSelectedGuy}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
};

export default GuyDisplay;
