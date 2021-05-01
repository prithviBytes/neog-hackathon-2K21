import { FaArtstation, FaHome, FaUserAlt, FaLock } from "react-icons/fa";
import { AiFillWechat } from "react-icons/ai";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="Navbar">
      <div className="Navbar-container">
        <div className="Brand-container">
          <FaArtstation className="Brand-logo" />
          <h2 className="Brand-name">Discord</h2>
        </div>
        <div className="Navbar-navigation">
          <div className="Navbar-item">
            <FaHome className="Navbar-item-logo" />
            <h4 className="Navbar-item-text">Home</h4>
          </div>
          <div className="Navbar-item">
            <AiFillWechat className="Navbar-item-logo" />
            <h4 className="Navbar-item-text">Your Discussions</h4>
          </div>
          <div className="Navbar-item">
            <FaLock className="Navbar-item-logo" />
            <h4 className="Navbar-item-text">Manage Rooms</h4>
          </div>
          <div className="Navbar-item">
            <FaUserAlt className="Navbar-item-logo" />
            <h4 className="Navbar-item-text">Profile</h4>
          </div>
        </div>
      </div>
    </nav>
  );
}
