import "./avatar.css"
import {getRandomColor} from '../../constants'

export default function Avatar({ imgURL, username, avatarColor }) {
    console.log(imgURL)
    if (imgURL) {
        return <img className="image-avatar" src={imgURL} alt="" />
    } else {
        return <div style={{backgroundColor: avatarColor}} className="text-avatar">{`${username.charAt(0)}${username.charAt(1)}`}</div>
    }
}