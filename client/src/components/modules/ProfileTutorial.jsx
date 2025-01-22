import React, { useState, useContext, useEffect } from "react";
import "./ProfileTutorial.css";
import { GuyContext, UserContext } from "../App";

const ProfileTutorial = () => {
  const { userId } = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const { guyVisibility, setGuyVisibility } = useContext(GuyContext);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const onChange = () => {
    setGuyVisibility(!guyVisibility);
  };

  useEffect(() => {
    setIsPopupOpen(userId === undefined);
  }, [userId]);

  return (
    <div>
      {/* Button to open the popup */}
      <button className="open-button" onClick={handleOpenPopup}>
        <img
          src="https://fonts.gstatic.com/s/e/notoemoji/latest/2753/512.webp"
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
            <p>Here, you can look at a user's information, or your own</p>
            <ul>
              <li>Change your username and profile picture!</li>
              <li>Find a user's guys!</li>
            </ul>
            <p>
              <strong>More specific instructions to edit your own profile:</strong>
            </p>
            <ul>
              <li> Log in, and go to your profile page.</li>
              <li>
                {" "}
                Change your username by clicking your current username, entering your new name and
                submitting{" "}
              </li>
              <li>
                Change your profile picture by first clicking your current profile picture. Then, go
                into the linked website and click on your favorite emoji! Find the code in the top
                right, and enter that code to change your profile picture!
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
