import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "./NavBar.css";
import MainTutorial from "./MainTutorial";
import { get, post } from "../../utilities";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string}
 */
const NavBar = (props) => {
  let tutorial = "";
  const pathname = useLocation().pathname;
  const [pfp, pfpSet] = useState("1f605");

  if (pathname === "/") {
    tutorial = <MainTutorial />;
  }
  useEffect(() => {
    get("/api/pfpget").then((Response) => pfpSet(Response.pfp));
  }, [props.userId]);

  return (
    <nav className="NavBar-container">
      <div className="NavBar-linkContainer NavBar-leftContainer">{tutorial}</div>

      <div className="NavBar-title">
        <Link to="/" className="NavBar-link">
          Maestro
        </Link>
      </div>
      <div className="NavBar-linkContainer  NavBar-rightContainer">
        {props.userId ? (
          <div>
            <button className="NavBar-link NavBar-login u-inlineBlock" onClick={props.handleLogout}>
              Sign out
            </button>
            <Link to={`/profile/${props.userId}`} className="NavBar-link">
              <button className="open-button">
                <img
                  src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${pfp}/512.webp`}
                  width="40px"
                  height="40px"
                />
              </button>
            </Link>
          </div>
        ) : (
          <GoogleLogin
            text="signin_with"
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
            containerProps={{ className: "NavBar-link NavBar-login" }}
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
