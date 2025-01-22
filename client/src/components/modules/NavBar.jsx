import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "./NavBar.css";
import MainTutorial from "./MainTutorial";
import { UserContext } from "../App";
import { get } from "../../utilities";
import SearchTutorial from "./SearchTutorial";
import ProfileTutorial from "./ProfileTutorial";

/*
 * NavBar displays the title, a button for showing a tutorial,
 * and either a sign-in button, or a link to your profile page.
 */

const NavBar = () => {
  let tutorial = "";

  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const pathname = useLocation().pathname;
  const [pfp, setPfp] = useState("2795");

  if (pathname === "/") {
    tutorial = <MainTutorial />;
  } else if (pathname.startsWith("/search")) {
    tutorial = <SearchTutorial />;
  } else if (pathname.startsWith("/profile")) {
    tutorial = <ProfileTutorial />;
  }

  useEffect(() => {
    get("/api/pfpget").then((pfpResponse) => {
      setPfp(pfpResponse.pfp);
    });
  }, [userId]);

  return (
    <nav className="NavBar-container">
      <div className="NavBar-linkContainer NavBar-leftContainer">{tutorial}</div>

      <div className="NavBar-title">
        <Link to="/" className="NavBar-link">
          Maestro
        </Link>
      </div>
      <div className="NavBar-linkContainer  NavBar-rightContainer">
        {userId ? (
          <div>
            <button className="NavBar-link NavBar-login u-inlineBlock" onClick={handleLogout}>
              Sign out
            </button>
            <Link to={`/profile/${userId}`} className="NavBar-link">
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
            onSuccess={handleLogin}
            onFailure={(err) => console.log(err)}
            containerProps={{ className: "NavBar-link NavBar-login" }}
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
