import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { NavbarContextProvider } from "./context/NavbarContext"
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <NavbarContextProvider>
          <App />
        </NavbarContextProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
