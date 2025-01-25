import { useEffect, useRef } from "react";
import "./GuyResults.css";

import GuyResultsGuy from "./GuyResultsGuy";

const GuyResults = ({ results = [], setSelectedGuy, selectedGuy, changePage, page }) => {
  const containerRef = useRef(null);

  const scrollStep = 50;

  const handleKeyDown = (event) => {
    if (containerRef.current) {
      if (event.key === "ArrowDown") {
        containerRef.current.scrollBy(0, scrollStep);
      } else if (event.key === "ArrowUp") {
        containerRef.current.scrollBy(0, -scrollStep);
      }
    }

    if (event.ctrlKey) {
      const numberKey = event.key;
      let index;

      if (numberKey >= "1" && numberKey <= "9") {
        index = parseInt(numberKey, 10) - 1;
      } else if (numberKey === "0") {
        index = 9;
      } else {
        setSelectedGuy(null);
      }

      if (index !== undefined && index < results.length) {
        const gDg = document.querySelectorAll(`[index="${index === 9 ? 0 : index + 1}"]`)[0];
        gDg.click();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [results]);

  return (
    <div>
      <div className="pagination-container">
        <button onClick={changePage(-1)} className="action-button">
          {"<"}
        </button>
        <div>{page}</div>
        <button onClick={changePage(1)} className="action-button">
          {">"}
        </button>
      </div>
      <div className="guy-results-container" ref={containerRef}>
        {results.length > 0 ? (
          results.map((result, index) => {
            const displayIndex = index === 9 ? 0 : index + 1;
            return (
              <GuyResultsGuy
                key={result._id || index}
                index={displayIndex}
                guy={result}
                setSelectedGuy={setSelectedGuy}
                selectedGuy={selectedGuy}
              />
            );
          })
        ) : (
          <p className="no-results">No results found</p>
        )}
      </div>
    </div>
  );
};

export default GuyResults;
