import { useNavigate } from "react-router-dom";
import "./NavigatorButtons.css"

const NavigatorButtons = (props) => {
    const navigate = useNavigate();
    return (<div className="nav-button-bar">
      <div id={props.id}></div>
        <button
        className="guy-impostor nav-button"
        onClick={() => {
          navigate("./guycreator");
        }
        }
        key="11"
      >
        CREATE NEW GUY
      </button>
      <button
        className="guy-impostor nav-button"
        onClick={() => {
          navigate("./search");
        }}
        key="12"
      >
        FIND NEW GUY
      </button>
      <div id="target3-navbuttons"></div>
    </div>);
};
export default NavigatorButtons;