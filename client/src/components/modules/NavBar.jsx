import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "./NavBar.css";
import MainTutorial from "./MainTutorial";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string}
 */
const NavBar = (props) => {
  let tutorial = "";
  const pathname = useLocation().pathname;
  if (pathname === "/") {
    tutorial = <MainTutorial />;
  }

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
            {/* <button className="NavBar-link NavBar-login u-inlineBlock" onClick={props.handleLogout}>
              Sign out
            </button> */}
            <Link to={`/profile/${props.userId}`} className="NavBar-link">
              <button className="open-button">
                <img
                  src={`https://fonts.gstatic.com/s/e/notoemoji/latest/1f331/512.webp`}
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
