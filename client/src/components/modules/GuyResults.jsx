import { useState, useEffect, useRef } from "react";
import "./GuyResults.css";

import ResultGuy from "./ResultGuy";

/**
 * GuyResults renders search results.
 *
 * Proptypes
 * @param {Array} results // Resulting guys
 * @param {Function} setter // Sets the selectedGuy in Search
 *
 */

const GuyResults = ({ results = [], setter }) => {
  const containerRef = useRef(null);

  // Handle the scroll position
  const scrollStep = 50; // Scroll by 50px with each key press

  const handleKeyDown = (event) => {
    if (containerRef.current) {
      if (event.key === "ArrowDown") {
        // Scroll down
        containerRef.current.scrollBy(0, scrollStep);
      } else if (event.key === "ArrowUp") {
        // Scroll up
        containerRef.current.scrollBy(0, -scrollStep);
      }
    }
  };

  useEffect(() => {
    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="guy-results-container" ref={containerRef}>
      {results.length > 0 ? (
        results.map((result, index) => (
          <ResultGuy
            key={result._id || index} // Use a unique key if possible
            index={index + 1}
            guy={result}
            setter={setter}
          />
        ))
      ) : (
        <p className="no-results">No results found</p>
      )}
    </div>
  );
};

export default GuyResults;
