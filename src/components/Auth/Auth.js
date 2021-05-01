import { useState, useEffect } from "react";

import firebase, { db } from "../../firebase";

export default function Auth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

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
        <button onClick={googleSignIn}>Google Signin</button>
      )}
    </>
  );
}
