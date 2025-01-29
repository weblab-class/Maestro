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
      <div>
        {/* Button to open the popup */}
        <button className="open-button" onClick={handleOpenPopup}>
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
              <h2 className="bolded-words">Welcome to Maestro!</h2>
              <p>
               Are you ready to make some music? 
              </p>
  
              <p className="list-spacing">Whether you want to build sounds from scratch or discover new ones, Maestro gives you the tools to create music like never before!</p>
              <p className="list-spacing">In Maestro, every sound is stored in a <strong className="bolded-words">Guy</strong> with its own name and emoji. These Guys are the building blocks of your track. So get ready to 
              <strong className="bolded-words"> build beats, one Guy at a time!</strong></p>
              <p>Let's get started!</p>
  
              <hr></hr>
  
              <p>You are currently on the <strong className="bolded-words">PROFILE</strong> page.</p>
              <p>How to use this page:</p>
              <ul className="list-spacing">
              <li>Your Profile is where you can customize your Maestro persona and view your created Guys.</li>
    
          <li>Click your profile avatar to change it.</li>
          <li>Click your profile username to change it.</li>
          <li>View your profile ID.</li>
          <li>View your created Guys by clicking "Browse my Guys!"</li>
     
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
  