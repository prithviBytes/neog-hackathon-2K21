import Navbar from "../components/Navbar/Navbar"
import ChatRoomForm from "../components/ChatroomForm/ChatroomForm"

export default function Homepage() {
    return <>
        <Navbar />
        <div className="content">
            <ChatRoomForm />
        </div>
    </>
}