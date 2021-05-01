import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Auth from "./components/Auth/Auth";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <PrivateRoute path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}
