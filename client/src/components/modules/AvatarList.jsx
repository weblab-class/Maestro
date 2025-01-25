import React, { useState } from "react";
import assetIds from "../../assets/assetIds";
import "./AvatarList.css";

const AvatarList = ({ selectedAvatar, handleAvatarClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Number of avatars per page
  const totalPages = Math.ceil(assetIds.length / itemsPerPage);

  const currentPageAssets = assetIds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <div className="avatar-grid">
        {currentPageAssets.map((avatar, index) => (
          <button
            key={index}
            className={`avatar-option ${selectedAvatar === avatar ? "selected" : ""}`}
            onClick={() => handleAvatarClick(avatar)}
          >
            <img
              src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${avatar}/512.webp`}
              alt={`Avatar ${index}`}
              width="40"
              height="40"
            />
          </button>
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AvatarList;
