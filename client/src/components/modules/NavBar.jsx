import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-linkContainer u-inlineBlock"></div>

      <div className="NavBar-title u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Maestro
        </Link>
      </div>
      <div className="NavBar-linkContainer u-inlineBlock">
        {props.userId ? (
          <div>
            <button className="NavBar-link NavBar-login u-inlineBlock" onClick={props.handleLogout}>
              Sign out
            </button>
            <Link to={`/profile/${props.userId}`} className="NavBar-link">
              <img src="../../../favicon.png" width="60px" height="60px" />
            </Link>
          </div>
        ) : (
          <GoogleLogin
            text="signin_with"
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
            containerProps={{ className: "NavBar-link NavBar-login u-inlineBlock" }}
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
