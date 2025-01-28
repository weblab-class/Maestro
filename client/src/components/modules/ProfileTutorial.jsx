import React, { useState, useContext, useEffect } from "react";
import "./ProfileTutorial.css";
import { UserContext } from "../App";

const ProfileTutorial = () => {
  const { userId, isAnimated } = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    setIsPopupOpen(userId === undefined);
  }, [userId]);

  return (
    <div className="popup-button-container">
      {/* Button to open the popup */}
      <button className="open-button profile-button" onClick={handleOpenPopup}>
        <img
          src={`https://fonts.gstatic.com/s/e/notoemoji/latest/2753/512.${
            +isAnimated ? "webp" : "png"
          }`}
          width="40px"
          height="40px"
          alt="Open Tutorial"
        />
      </button>

      {/* Popup */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Welcome to the profile page!</h2>
            <p>Here, you can look at a user's information, or your own! </p>
            <ul>
              <li>Change your username and profile picture!</li>
              <li>Find a user's guys!</li>
            </ul>

            <strong> How to edit your profile: </strong>

            <ul>
              <li> Log in, and go to your profile page.</li>
              <li> Username: Click your current username, enter your new name and submit! </li>
              <li>
                Profile Picture: Click current profile picture. Navigate to the provided link, and
                find your favorite emoji's unicode in the top right of the screen. Enter it into the
                textbox and submit!
              </li>
            </ul>

            {/* Close button */}
            <button className="close-button" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileTutorial;
