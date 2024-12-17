import React from "react";

import styles from "../styles/Panel.module.css";

import logo from "../images/logo.svg";
import home from "../images/home.svg";
import chat from "../images/chat.svg";
import settings from "../images/settings.svg";

const Panel = ({ params }) => {
  return (
    <div className={styles.panel}>
      <img className={styles.logo} src={logo} alt="" />
      <div className={styles.folders}>
        <img className={styles.folders__element} src={home} alt="" />
        <img className={styles.folders__element} src={chat} alt="" />
      </div>
      {/* <LeaveButton className={styles.settingsMenu} params={params} /> */}
      <img className={styles.settings} src={settings} alt="" />
    </div>
  );
};

export default Panel;
