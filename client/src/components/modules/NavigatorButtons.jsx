import { useNavigate } from "react-router-dom";
import "./NavigatorButtons.css"

const NavigatorButtons = (props) => {
    const navigate = useNavigate();
    return (<div className="nav-button-bar">
      <div id={props.id}></div>
        <button
        className="guy-button guy-icon guy-impostor"
        onClick={() => {
          navigate("./soundmaker");
        }
        }
        key="11"
      >
        Create a new Guy!
      </button>
      <button
        className="guy-button guy-icon guy-impostor"
        onClick={() => {
          navigate("./search");
        }}
        key="12"
      >
        Find a new Guy!
      </button>
      <div id={props.id}></div>;
    </div>);
};
export default NavigatorButtons;