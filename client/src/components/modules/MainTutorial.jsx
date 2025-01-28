import React, { useState, useContext, useEffect, useRef} from "react";
import "./MainTutorial.css";
import { UserContext } from "../App";
import { useLocation } from "react-router-dom";

const tutorialSteps = [
  { id: "step1", message: "Step 1", element: "#target1-keyboard"},
  { id: "step2", message: "Step 2", element: "#target2-guylist"},
  { id: "step3", message: "Step 3", element: "#target3-navbuttons"},
];

const MainTutorial = () => {
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const speechBoxRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (isTutorialActive) {
      const targetElement = document.querySelector(tutorialSteps[currentStep].element);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const speechBoxHeight = speechBoxRef.current?.offsetHeight || 0;
        const speechBoxWidth = speechBoxRef.current?.offsetWidth || 0;
  
        setPosition({
          top: rect.top + window.scrollY - speechBoxHeight + (tutorialSteps[currentStep].offsetTop || 0),
          left: rect.left + window.scrollX + rect.width / 2 - speechBoxWidth / 2 + (tutorialSteps[currentStep].offsetLeft || 0),
        });
      }
    }
  }, [currentStep, isTutorialActive]);

  const startTutorial = () => {
    setIsTutorialActive(true);
    setCurrentStep(0);
  };

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleDone = () => {
    setIsTutorialActive(false);
  };

  useEffect(()=>{setIsTutorialActive(false)}, [location])

  return (
    <div>

      <button className="open-button" onClick={startTutorial}>
        <img
          src="https://fonts.gstatic.com/s/e/notoemoji/latest/2753/512.webp"
          width="40px"
          height="40px"
          alt="Open Tutorial"
        />
      </button>

      {isTutorialActive && (
        <div
          ref={speechBoxRef}
          className="speech-box"
          style={{
            position: "absolute",
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex: 1000,
            transitionDelay: .7
          }}
        >
          <div className="speech-content">{tutorialSteps[currentStep].message}</div>
          <div className="speech-buttons">
            {currentStep > 0 && <button onClick={handleBack}>Back</button>}
            {currentStep < tutorialSteps.length - 1 && <button onClick={handleNext}>Next</button>}
            {currentStep === tutorialSteps.length - 1 && <button onClick={handleDone}>Done</button>}
          </div>
        </div>
      )}
    </div>
        
  );
};

export default MainTutorial;
