import React, { useContext, useEffect, useState } from "react";
import "./ProfileDropdown.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const ProfileDropdown = () => {
  const { userId, handleLogin, handleLogout, assetId, isAnimated } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const profileLinkClick = () => {
    setIsOpen(false);
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="profile-dropdown">
      <button className="profile-button" onClick={toggleDropdown}>
        <img
          src={`https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.${
            +isAnimated ? "webp" : "png"
          }`}
          width="40px"
          height="40px"
        />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={profileLinkClick}>
            My Profile
          </button>
          {/* <Link to={`/profile/${userId}`} 
        className="dropdown-item"
        >My Profile</Link> */}
          <button className="dropdown-item" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
