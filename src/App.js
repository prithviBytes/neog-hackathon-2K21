import {Routes,Route,Navigate} from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Auth from "./components/Auth/Auth";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth />}/>
        <PrivateRoute path="/home" element={<Homepage />} />
      </Routes>
    </div>
  );
}
