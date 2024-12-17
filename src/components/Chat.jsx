import React from "react";

import styles from "../styles/Chat.module.css";

import Panel from "./Panel";
import Primary from "./Primary";

const Chat = () => {
  return (
    <div className={styles.wrap}>
      <Panel />
      <Primary />
    </div>
  );
};

export default Chat;
