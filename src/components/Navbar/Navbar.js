import { FaArtstation, FaHome, FaUserAlt, FaFolderPlus } from "react-icons/fa";
import { AiFillWechat, AiOutlineLogout } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import {VscChromeClose} from "react-icons/vsc"
import fb from "../../firebase";
import "./navbar.css";
import { Link } from "react-router-dom";
import {NavbarContext} from "../../context/NavbarContext"
import { useContext } from "react";

export default function Navbar() {
  const {isNavbarOpen, toggleNavbar} = useContext(NavbarContext)
  const logout = () => {
    fb.auth().signOut();
  };
  return (
    <>
    <nav className={`Navbar ${isNavbarOpen ? "Navbar-translate" : null}`}>
      <div className="Navbar-container">
        <div className="Brand-container">
          <FaArtstation className="Brand-logo" />
          <h2 className="Brand-name">Discord</h2>
        </div>
        <div className="Navbar-navigation">
          <Link to="/" onClick={toggleNavbar}>
            <div className="Navbar-item">
              <FaHome className="Navbar-item-logo"/>
              <h4 className="Navbar-item-text">Home</h4>
            </div>
          </Link> 
          <Link to="/discussions" onClick={toggleNavbar}>
            <div className="Navbar-item">
              <AiFillWechat className="Navbar-item-logo" />
              <h4 className="Navbar-item-text">Your Discussions</h4>
            </div>
          </Link>
          <Link to="/chatroom/new" onClick={toggleNavbar}>
            <div className="Navbar-item">
              <FaFolderPlus className="Navbar-item-logo" />
              <h4 className="Navbar-item-text">Create Room</h4>
            </div>
          </Link>
          <Link to="/profile" onClick={toggleNavbar}>
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
    </>
  );
}
