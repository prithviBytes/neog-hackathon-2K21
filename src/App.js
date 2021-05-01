import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Auth />
      </div>
    </div>
  );
}
