import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomColor } from '../../constants'
import { FaArtstation } from "react-icons/fa";
import {AiOutlineGoogle} from "react-icons/ai"
import "./auth.css";

import firebase, { db } from "../../firebase";

export default function Auth({ from }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  const emailSignIn = (event, email, password) => {
    event.preventDefault();
    if (isNewAccount) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          const user = result.user;
          result.user
            .updateProfile({
              displayName: name,
            })
            .then(() => {
              findOrCreateNewUserInCollection(user);
              setName("");
              setEmail("");
              setPassword("");
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          const user = result.user;
          findOrCreateNewUserInCollection(user);
          setName("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          console.log(error.code, error.message);
        });
    }
  };

  const googleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        findOrCreateNewUserInCollection(user);
      });
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then((result) => {
        console.log("on logout", firebase.auth().currentUser);
      });
  };

  const findOrCreateNewUserInCollection = (user) => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((data) => {
        if (!data.data()) {
          db.collection("users").doc(user.uid).set({
            name: user.displayName,
            email: user.email,
            imageURL: user.photoURL,
            avatarColor: getRandomColor(),
            chatrooms: [],
          });
        }
      });
    navigate("/");
  };

  return (
    <>
      {isLoggedIn ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <div className="Auth">
          <div className="Form-container">
            <div className="Form-container-left">
              <p className="Form-welcome"><FaArtstation className="Brand-logo" />Welcome !</p>
              <p className="Form-welcome-subtext">Please Login before we can continue.</p>
              <form
                className="Form"
                onSubmit={(event) => emailSignIn(event, email, password)}
              >
                {isNewAccount ? (
                  <>
                  <label htmlFor="name">Name</label>
                  <input
                    className="input-box"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  </>
                ) : (
                  ""
                )}
                <label htmlFor="email">Email Address</label>
                <input
                  className="input-box"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                  className="input-box"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button className="Auth-form-button button-signin">{isNewAccount ? "Create Account" : "Sign In"}</button>
              </form>
            </div>
            <div className="Form-container-right">
              <button className="Auth-form-button" onClick={googleSignIn}>Google SignIn<AiOutlineGoogle className="google-icon" /></button>
              <button className="Auth-form-button" onClick={() => setIsNewAccount(!isNewAccount)}>
                {isNewAccount ? "Already Registered" : "Create Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
