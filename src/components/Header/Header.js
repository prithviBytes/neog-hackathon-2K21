import "./header.css"
import { FaArtstation } from "react-icons/fa"
import { UserContext } from '../../context/UserContext'
import { useContext } from "react"
import { GiHamburgerMenu } from "react-icons/gi";
import {VscChromeClose} from "react-icons/vsc";
import {NavbarContext} from "../../context/NavbarContext"
export default function Header() {
    const { currentUser } = useContext(UserContext)
    const {isNavbarOpen,toggleNavbar} = useContext(NavbarContext)
    return <nav className="Header">
        <span className="Navbar-toggler" onClick={toggleNavbar}>
            {
                isNavbarOpen ? <VscChromeClose className="toggler-icon" /> : <GiHamburgerMenu className="toggler-icon" />
            }
        </span>
        <div className="Header-Brand-container">
            <FaArtstation className="Header-Brand-logo" />
            <h2 className="Header-Brand-name">Debate.ly</h2>
        </div>
        <div className="flex-grow" />
        <div className="User-message">
            <p>
                <span>Hi, </span>{currentUser && currentUser.displayName}
            </p>
        </div>
    </nav>
}