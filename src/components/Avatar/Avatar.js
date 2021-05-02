import "./avatar.css"
import {getRandomColor} from '../../constants'

export default function Avatar({ imageURL, username, avatarColor }) {
    if (imageURL) {
        return <img className="image-avatar" src={imageURL} alt="" />
    } else {
        return <div style={{backgroundColor: avatarColor}} className="text-avatar">{`${username.charAt(0)}${username.charAt(1)}`}</div>
    }
}