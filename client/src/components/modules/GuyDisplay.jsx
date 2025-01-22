import { useState, useEffect, useContext } from "react";
import "./GuyDisplay.css";
import { UserContext } from "../App";
import { get } from "../../utilities";
import GuyDisplayGuy from "./GuyDisplayGuy";

const GuyDisplay = (props) => {
  const userId = useContext(UserContext);
  const [guyList, setGuyList] = useState([]);

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
  if (userId) {
    return (
      <div className="guy-display">
        {rows.map((row, index) => (
          <div key={index} className="guy-row">
            {row.map((guy, i) => (
              <GuyDisplayGuy
                key={i}
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
