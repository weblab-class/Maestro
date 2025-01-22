import React, { useState, useContext, useEffect } from "react";
import "./SearchTutorial.css";
import { GuyContext, UserContext } from "../App";

const SearchTutorial = () => {
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
            <h2>Welcome to the search menu!</h2>
            <p>Here, you can find other user's guys! 👀</p>
            <ul>
              <li>Search by guy or username!</li>
              <li>Visit other profiles!</li>
              <li>Use your newly found guys in the composer!</li>
            </ul>
            <p>You can even listen to other user's guys before collecting them.</p>
            <p>
              <strong>Let’s get started:</strong>
            </p>
            <ul>
              <li> Type a search query into the username or guy text boxes.</li>
              <li> Navigate the search results by clicking the arrow buttons. </li>
              <li>
                {" "}
                Your guys are on the right side of the screen. With a guy selected, click on one of
                these to replace it with your new guy!
              </li>
              <li>
                {" "}
                When you are done, click the Maestro name in the navigation menu to use your new
                guys!
              </li>
            </ul>
            <p>
              <strong>For keyboard users:</strong>
            </p>
            <ul>
              <li>Use the right and left arrow keys to navigate search results</li>
              <li>Use the up and down arrow keys to scroll the results</li>
              <li>
                Press <code>Control</code> and the number key corresponding to the number next to a
                guy to select it!
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

export default SearchTutorial;
