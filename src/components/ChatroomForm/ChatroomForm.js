import { useState } from "react";

import fb, { db } from "../../firebase";
import firebase from "firebase";

import "./chatroom-form.css";
import { useNavigate } from "react-router-dom";

export default function ChatRoomForm() {
  const validators = {
    title: (title) => {
      return title.length > 0 && title.length < 50;
    },
    description: (description) => {
      return description.length < 250;
    },
    rules: (rules) => {
      return rules.length < 300;
    },
  };

  const navigate = useNavigate();

  const initialFormData = {
    title: {
      value: "",
      isRequired: true,
      isValid: false,
      errorMessage: "Please enter the title",
    },
    description: {
      value: "",
      isRequired: false,
      isValid: true,
      errorMessage: "Max character limit is 250",
    },
    rules: {
      value: "",
      isRequired: false,
      isValid: true,
      errorMessage: "Max character limit is 300",
    },
  };

  const [form, setForm] = useState(initialFormData);
  const [showErrors, setShowErrors] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (!isFormValid) {
      setShowErrors(true);
      return;
    }

    createChatroomInFireBase();
  };

  const createChatroomInFireBase = () => {
    const currentUser = fb.auth().currentUser;
    db.collection("chatrooms")
      .add({
        title: form.title.value,
        description: form.description.value,
        isActive: true,
        rules: form.rules.value,
        owner: currentUser.uid,
        createdAt: new Date().valueOf(),
      })
      .then((chatroom) => {
        addOwnerToChatroom(chatroom, currentUser);
        addChatroomToUserCollection(chatroom, currentUser);
        navigate(`/chatroom/${chatroom.id}`);
      });
  };

  const addOwnerToChatroom = (chatroom, currentUser) => {
    db.collection("chatrooms")
      .doc(chatroom.id)
      .collection("members")
      .doc(currentUser.uid)
      .set({
        uid: currentUser.uid,
        name: currentUser.displayName,
        role: "OWNER",
      })
      .then(() => {
        console.log("success");
      });
  };

  const addChatroomToUserCollection = (chatroom, currentUser) => {
    db.collection("users")
      .doc(currentUser.uid)
      .update({
        chatrooms: firebase.firestore.FieldValue.arrayUnion(chatroom.id),
      });
  };

  const onChangeHandler = (e) => {
    showErrors && setShowErrors(false);
    const currentTarget = e.currentTarget;
    const id = e.currentTarget.id;
    setForm(function (state) {
      const stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy[id].isValid = validateField(id, currentTarget.value);
      stateCopy[id].value = currentTarget.value;
      return stateCopy;
    });
  };

  const validateField = (field, value) => {
    return validators[field](value);
  };

  const validateForm = () => {
    const isFormValid = true;
    for (let field in form) {
      if (!form[field].isValid) {
        return false;
      }
    }
    return isFormValid;
  };

  return (
    <div className="form-container">
      <form className="chatroom-form" onSubmit={formSubmitHandler}>
        <h2>Create Chatroom</h2>
        <label>
          Title <span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="title"
          value={form.title.value}
          onChange={onChangeHandler}
        ></input>
        <p
          className="error-input"
          style={{
            display: !form.title.isValid && showErrors ? "block" : "none",
          }}
        >
          {form.title.errorMessage}
        </p>
        <label>Description (Max 250 chars)</label>
        <textarea
          id="description"
          value={form.description.value}
          onChange={onChangeHandler}
        ></textarea>
        <p
          className="error-input"
          style={{
            display: !form.description.isValid && showErrors ? "block" : "none",
          }}
        >
          {form.description.errorMessage}
        </p>
        <label>Rules (Max 300 chars)</label>
        <textarea
          id="rules"
          value={form.rules.value}
          onChange={onChangeHandler}
        ></textarea>
        <p
          className="error-input"
          style={{
            display: !form.rules.isValid && showErrors ? "block" : "none",
          }}
        >
          {form.rules.errorMessage}
        </p>
        <button className="chatroom-btn">Create</button>
      </form>
    </div>
  );
}
