import { useState, useEffect } from "react";
import "./auth.css";

import firebase, { db } from "../../firebase";

export default function Auth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            chatrooms: [],
          });
        }
      });
  };

  return (
    <>
      {isLoggedIn ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <div className="Form-container">
          <form
            className="Form"
            onSubmit={(event) => emailSignIn(event, email, password)}
          >
            {isNewAccount ? (
              <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={(event) => setName(event.target.value)}
              />
            ) : (
              ""
            )}

            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button>{isNewAccount ? "Create Account" : "Sign In"}</button>
          </form>
          <button onClick={googleSignIn}>Google Signin</button>
          <button onClick={() => setIsNewAccount(!isNewAccount)}>
            {isNewAccount ? "I Have a Account" : "Creat Account"}
          </button>
        </div>
      )}
    </>
  );
}
