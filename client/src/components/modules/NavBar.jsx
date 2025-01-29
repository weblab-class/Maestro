import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "./NavBar.css";
import MainTutorial from "./NewMainTutorial";
import { UserContext } from "../App";
import SearchTutorial from "./NewSearchTutorial";
import ProfileTutorial from "./NewProfileTutorial";
import ProfileDropdown from "./ProfileDropdown";
import SoundmakerTutorial from "./NewSoundmakerTutorial";

/*
 * NavBar displays the title, a button for showing a tutorial,
 * and either a sign-in button, or a link to your profile page.
 */

const NavBar = () => {
  let tutorial = "";

  const { userId, handleLogin, setIsAnimated, isAnimated } = useContext(UserContext);
  const pathname = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(false);

  if (pathname === "/") {
    tutorial = <MainTutorial />;
  } else if (pathname.startsWith("/search")) {
    tutorial = <SearchTutorial />;
  } else if (pathname.startsWith("/guycreator")) {
    tutorial = <SoundmakerTutorial />;
  } else {
    tutorial = <ProfileTutorial />;
  }

  const handleLoginClick = (credentialResponse) => {
    handleLogin(credentialResponse);
  };

  return (
    <nav className="NavBar-container">
      <div className="tutorial-container">{tutorial}</div>

      <div className="NavBar-title neon-text unselectable">
        <Link to="/" className="NavBar-link">
          Maestro
        </Link>
      </div>
      {/* <div className="toggle-container">
        <button
          onClick={() => {
            setIsAnimated(!isAnimated);
          }}
          className={`toggle-button ${isAnimated ? "toggle-off" : "toggle-on"}`}
        >
          {isAnimated ? "Guy animations: OFF" : "Guy animations: ON"}
        </button>
      </div> */}
      {userId ? (
        <ProfileDropdown setIsOpen={setIsOpen} isOpen={isOpen} />
      ) : (
        <GoogleLogin
          text="signin_with"
          onSuccess={handleLoginClick}
          onFailure={(err) => console.log(err)}
          containerProps={{ className: "" }}
        />
      )}
    </nav>
  );
};

export default NavBar;
