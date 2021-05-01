import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import ChatRoomForm from "./components/ChatroomForm/ChatroomForm";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Auth />
        <ChatRoomForm />
      </div>
    </div>
  );
}
