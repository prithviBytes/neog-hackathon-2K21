import { FaArtstation, FaHome, FaUserAlt, FaFolderPlus } from "react-icons/fa";
import { AiFillWechat, AiOutlineLogout } from "react-icons/ai";
import fb from "../../firebase";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const logout = () => {
    fb.auth().signOut();
  };

  return (
    <nav className="Navbar">
      <div className="Navbar-container">
        <div className="Brand-container">
          <FaArtstation className="Brand-logo" />
          <h2 className="Brand-name">Discord</h2>
        </div>
        <div className="Navbar-navigation">
          <Link to="/">
            <div className="Navbar-item">
              <FaHome className="Navbar-item-logo" />
              <h4 className="Navbar-item-text">Home</h4>
            </div>
          </Link>
          <Link to="/discussions">
            <div className="Navbar-item">
              <AiFillWechat className="Navbar-item-logo" />
              <h4 className="Navbar-item-text">Your Discussions</h4>
            </div>
          </Link>
          <Link to="/chatroom/new">
            <div className="Navbar-item">
              <FaFolderPlus className="Navbar-item-logo" />
              <h4 className="Navbar-item-text">Create Room</h4>
            </div>
          </Link>
          <Link to="/profile">
            <div className="Navbar-item">
              <FaUserAlt className="Navbar-item-logo" />
              <h4 className="Navbar-item-text">Profile</h4>
            </div>
          </Link>
          <div className="Navbar-item" onClick={logout}>
            <AiOutlineLogout className="Navbar-item-logo" />
            <h4 className="Navbar-item-text">Logout</h4>
          </div>
        </div>
      </div>
    </nav>
  );
}
