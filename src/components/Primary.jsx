import React, { Children, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";

import icon from "../images/emoji.svg";

import styles from "../styles/Primary.module.css";

import Messages from "./Messages";

const socket = io.connect("https://chatify-server-miva.onrender.com");

const Primary = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState({ room: "", user: "" });
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [users, setUsers] = useState(0);
  const [hovered, setHover] = useState(false);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  useEffect(() => {
    socket.on("joinRoom", ({ data: { users } }) => {
      setUsers(users.length);
    });
  }, []);

  const leftRoom = () => {
    socket.emit("leftRoom", { params });
    navigate("/");
  };

  const handleChange = ({ target: { value } }) => setMessage(value);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit("sendMessage", { message, params });

    setMessage("");
  };
  const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

  return (
    <div className={styles.primary__wrap}>
      <div className={styles.header}>
        <div className={styles.header__info}>
          <div className={styles.title}>{params.room}</div>
          <button
            className={styles.leftBtn}
            onClick={leftRoom}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={`${styles.leftBtnX} ${hovered ? styles.moveUpX : ""}`}
            >
              X
            </div>
            <div
              className={`${styles.leftBtnLeave} ${
                hovered ? styles.moveUpLeave : ""
              }`}
            >
              Leave
            </div>
          </button>
        </div>
        <div className={styles.users}>{users} users in this room</div>
      </div>
      <div className={styles.chat}>
        <div className={styles.messages}>
          <Messages messages={state} name={params.name} />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input}>
            <input
              type="text"
              name="message"
              value={message}
              placeholder="Type a message"
              autoComplete="off"
              required
              onChange={handleChange}
            />
          </div>
          {/* <div className={styles.emoji}>
            <img
              className={styles.emoji__icon}
              src={icon}
              alt="emojis icon"
              onClick={() => setOpen(!isOpen)}
            />

            {isOpen && (
              <div className={styles.emojies}>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div> */}

          <div className={styles.button}>
            <input type="submit" onSubmit={handleSubmit} value="Send" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Primary;
