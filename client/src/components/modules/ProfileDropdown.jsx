import React, { useContext, useState } from "react";
import "./ProfileDropdown.css"; 
import { Link, useLocation, useNavigate} from "react-router-dom";
import { UserContext } from "../App";

const ProfileDropdown = () => {
  const { userId, handleLogin, handleLogout, assetId } = useContext(UserContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log("isOpen, ", isOpen);
  };

  const profileLinkClick = () => {
    setIsOpen(false);
    navigate(`/profile/${userId}`)

  }

  return (
    <div className="profile-dropdown">
      <button className="profile-button" onClick={toggleDropdown}>
      <img
                  src={`https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.webp`}
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
