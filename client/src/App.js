import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

export default function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showChats, setShowChats] = useState(false);

  // console.log("Name: ", name);

  const joinChat = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_chat", room);
      setShowChats(true);
    }
  };
  return (
    <div className="App">
      {!showChats ? (
        <div className="joinChatContainer">
          <h3>Join a Chat</h3>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <h4>Select Your Room</h4>
          <fieldset>
            <div className="radio-container">
              <input
                className="custom-radio"
                type="radio"
                name="red room"
                value="red room"
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
              <label>Red Room</label>
            </div>
            <div className="radio-container">
              <input
                className="custom-radio"
                type="radio"
                name="green room"
                value="green room"
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
              <label>Green Room</label>
            </div>
            <div className="radio-container">
              <input
                className="custom-radio"
                type="radio"
                name="blue room"
                value="blue room"
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
              <label>Blue Room</label>
            </div>
          </fieldset>
          <button onClick={joinChat}>Chat</button>
        </div>
      ) : (
        <Chat socket={socket} name={name} room={room} />
      )}
    </div>
  );
}
