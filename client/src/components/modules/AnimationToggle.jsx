import React, { useContext } from "react";
import { UserContext } from "../App"; // Adjust the path as needed

const AnimationToggle = () => {
  const { setIsAnimated, isAnimated } = useContext(UserContext);

  const handleToggle = () => {
    setIsAnimated(!isAnimated);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative flex items-center cursor-pointer" onClick={handleToggle}>
        <div
          className={`w-14 h-8 rounded-full transition-colors duration-300 ${
            isAnimated ? "bg-green-500" : "bg-gray-400"
          }`}
        ></div>
        <div
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 transform ${
            isAnimated ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </div>
      <span className="ml-4 text-lg font-medium text-gray-700">
        {isAnimated ? "Animations On" : "Animations Off"}
      </span>
    </div>
  );
};

export default AnimationToggle;
