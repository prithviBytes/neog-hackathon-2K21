import "./avatar.css"

export default function Avatar({ imgURL, username }) {
    if (imgURL) {
        return <img className="image-avatar" src={imgURL} alt="" />
    } else {
        const colors = ["#ff5722", "#673ab7", "#bdbdbd", "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e","#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50","#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12","#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"]
        const color = colors[Math.floor(Math.random() * colors.length)]
        return <div style={{backgroundColor: color}} className="text-avatar">{`${username.charAt(0)}${username.charAt(1)}`}</div>
    }
}