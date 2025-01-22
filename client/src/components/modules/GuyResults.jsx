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
  const scrollStep = 100; // Scroll by 50px with each key press

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
    // 0123456789
    // Check for Ctrl + number key
    if (event.ctrlKey) {
      const numberKey = event.key; // Get the pressed key as a string
      let index;

      // Map '1' to index 0, '2' to index 1, ..., '9' to index 8, and '0' to index 9
      if (numberKey >= "1" && numberKey <= "9") {
        index = parseInt(numberKey, 10) - 1; // Map '1' to index 0, '2' to index 1, ..., '9' to index 8
      } else if (numberKey === "0") {
        index = 9; // Map '0' to index 9
      }

      // If a valid index is calculated, and it is within bounds, set the selected guy
      if (index !== undefined && index < results.length) {
        setter(results[index]);
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
  }, [results, setter]); // Re-run effect if results or setter changes

  return (
    <div className="guy-results-container" ref={containerRef}>
      {results.length > 0 ? (
        results.map((result, index) => {
          // Adjust the index for display
          const displayIndex = index === 9 ? 0 : index + 1; // Set index to 0 for index 9, else index + 1
          return (
            <ResultGuy
              key={result._id || index} // Use a unique key if possible
              index={displayIndex} // Pass the adjusted index
              guy={result}
              setter={setter}
            />
          );
        })
      ) : (
        <p className="no-results">No results found</p>
      )}
    </div>
  );
};

export default GuyResults;
