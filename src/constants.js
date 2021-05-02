const avatarColors = ["#ff5722", "#673ab7", "#bdbdbd", "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e","#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50","#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12","#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"]
export const userColors = {
    owner: "rgb(233, 30, 99)",
    participants: "rgb(230, 126, 34)",
    others: "rgb(52, 152, 219)"
}

/* 
Organizer color: rgb(233, 30, 99)
Admins color: rgb(230, 126, 34)
Participants color: rgb(52, 152, 219) */

//Could be moved to helpers file
export function getRandomColor(){
    return avatarColors[Math.floor(Math.random() * avatarColors.length)]
}