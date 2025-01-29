import React, { useState, useContext, useEffect } from "react";
import "./MainTutorial.css";
import { UserContext } from "../App";

const tutorialPages = [
  <div key="1">
    <h2 className="bolded-words">Welcome to Maestro!</h2>
    <p>Are you ready to make some music?</p>

    <p>
      Whether you want to build sounds from scratch or discover new ones, Maestro gives you the
      tools to create music like never before!
    </p>
    <p>
      In Maestro, every sound is stored in a <strong className="bolded-words">Guy</strong> with its
      own name and emoji. These Guys are the building blocks of your track. So get ready to
      <strong className="bolded-words"> build beats, one Guy at a time!</strong>
    </p>
    <p>Let's get started!</p>
    <hr></hr>

    <p>
      You are currently on the <strong className="bolded-words">GUY CREATOR</strong> page. Here, you
      can create and customize your Guys.
    </p>
    <p>Step through this tutorial to learn how to use this page.</p>
  </div>,
  <div key="2">
    <h3>Create your sound:</h3>
    <ul>
      <li>Create a sound from scratch using the synth maker.</li>
      <li>Upload a custom sound via Dropbox.</li>
    </ul>
  </div>,
  <div key="3">
    <h3>Once your sound is ready:</h3>
    <ul>
      <li>Assign your Guy a name and an emoji.</li>
      <li>Hit "Next" to finish creating your Guy.</li>
      <li>Confirm your choice to publish your Guy and share it with others.</li>
    </ul>
  </div>,
];

const SoundmakerTutorial = () => {
  const { userId, isAnimated } = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPageIndex(0);
  };

  const nextPage = () => setPageIndex((prev) => prev + 1);
  const prevPage = () => setPageIndex((prev) => prev - 1);

  useEffect(() => {
    setIsPopupOpen(userId === undefined);
  }, [userId]);

  const handleTutorialClick = (pageIndex) => {
    console.log(pageIndex);
    if (pageIndex === 2) {
      // Ensure you're comparing numbers
      return handleClosePopup(); // Call handleClosePopup when pageIndex is 2
    } else {
      return nextPage(); // Call nextPage otherwise
    }
  };

  return (
    <div>
      <button className="open-button" onClick={handleOpenPopup}>
        <img
          src={`https://fonts.gstatic.com/s/e/notoemoji/latest/2753/512.${
            isAnimated ? "webp" : "png"
          }`}
          width="40px"
          height="40px"
          alt="Open Tutorial"
        />
      </button>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>{tutorialPages[pageIndex]}</p>
            <div className="close-button-container">
              <button className="close-button" onClick={() => handleTutorialClick(pageIndex)}>
                {pageIndex === 2 ? "Close" : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoundmakerTutorial;
