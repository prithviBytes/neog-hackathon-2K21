import "./header.css"
import {FaArtstation} from "react-icons/fa"
import {UserContext} from '../../context/UserContext'
import { useContext } from "react"

export default function Header() {
    const {currentUser} = useContext(UserContext)
    return <nav className="Header">
        <div className="Header-Brand-container">
            <FaArtstation className="Header-Brand-logo" />
            <h2 className="Header-Brand-name">Discord</h2>
        </div>
        <div className="flex-grow" />
        <div className="User-message">
            <p>
                <span>Hi, </span>{currentUser.displayName}
            </p> 
        </div>
    </nav>
}