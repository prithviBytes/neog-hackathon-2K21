import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import ChatroomForm from "./components/ChatroomForm/ChatroomForm";
import Chatroom from "./components/Chatroom/Chatroom";
import Auth from "./components/Auth/Auth";
import Profile from "./components/Profile/Profile";
import { UserContext } from "./context/UserContext";
import "./styles.css";
import { useContext } from "react";
import Discussions from "./components/Discussions/Discussions";

export default function App() {
  const { isUserLoggedIn } = useContext(UserContext);
  return (
    <div className="App">
      {isUserLoggedIn ? (
        <>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Home />} />
              <Route path="/discussions" element={<Discussions />} />
              <Route path="/chatroom/new" element={<ChatroomForm />} />
              <Route path="/chatroom/:id" element={<Chatroom />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}
