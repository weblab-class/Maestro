import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import GuyResults from "../modules/GuyResults";
import GuyDisplay from "../modules/GuyDisplay";

import "./Search.css";

const Search = () => {
  // Get query parameters from the URL
  const params = new URLSearchParams(window.location.search);

  // Retrieve specific parameters
  const name = params.get("name");
  const username = params.get("username");

  const [nameInput, setNameInput] = useState(name || "");
  const [usernameInput, setUsernameInput] = useState(username || "");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [results, setResults] = useState([]);
  const [selectedGuy, setSelectedGuy] = useState(null);

  const handleNameChange = (event) => setNameInput(event.target.value);
  const handleUsernameChange = (event) => setUsernameInput(event.target.value);

  const search = () => {
    get("/api/search", { name: nameInput, username: usernameInput, page }).then((response) => {
      setResults(response.results || []);
      setTotalPages(response.totalPages || 0);
    });
  };

  const changePage = (delta) => () => {
    const newPage =
      delta > 0 && page === totalPages ? 1 : delta < 0 && page === 1 ? totalPages : page + delta;
    setPage(newPage);
  };

  useEffect(() => {
    search();
  }, [page, nameInput, usernameInput]);

  useEffect(() => {
    const handleArrowKeyPress = (event) => {
      if (event.key === "ArrowRight") changePage(1)();
      if (event.key === "ArrowLeft") changePage(-1)();
    };
    window.addEventListener("keydown", handleArrowKeyPress);
    return () => window.removeEventListener("keydown", handleArrowKeyPress);
  }, [page, totalPages]);

  return (
    <div className="search-container">
      {/* Header for search inputs and buttons */}
      <div className="search-header">
        <input
          type="text"
          placeholder="Search guy name!"
          value={nameInput}
          className="search-input"
          onChange={handleNameChange}
        />
        <input
          type="text"
          placeholder="Search username!"
          value={usernameInput}
          className="search-input"
          onChange={handleUsernameChange}
        />
        <button onClick={search} className="action-button">
          Search!
        </button>
      </div>

      {/* Left panel */}
      <div className="results-panel">
        {/* Optionally add content here */}
        <GuyResults
          results={results}
          setSelectedGuy={setSelectedGuy}
          selectedGuy={selectedGuy}
          changePage={changePage}
          page={page}
        />
      </div>

      {/* Right panel */}
      <div className="right-panel">
        <GuyDisplay selectedGuy={selectedGuy} setSelectedGuy={setSelectedGuy} />
      </div>
    </div>
  );
};

export default Search;
