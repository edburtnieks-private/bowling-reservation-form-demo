import React from "react";

import { ReactComponent as GitHubIcon } from "../../assets/icons/github.svg";
import { ReactComponent as BriefcaseIcon } from "../../assets/icons/briefcase.svg";
import { ReactComponent as RefreshCWIcon } from "../../assets/icons/refresh-cw.svg";

import styles from "./styles.module.scss";

const Links = () => {
  return (
    <ul className={styles.wrapper}>
      <li className={styles.listItem}>
        <a
          href="https://github.com/edburtnieks/bowling-reservation-form-demo"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon className={styles.icon} />
          <span>GitHub</span>
        </a>
      </li>

      <li className={styles.listItem}>
        <a
          href="https://edburtnieks.me"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BriefcaseIcon className={styles.icon} />
          <span>Portfolio</span>
        </a>
      </li>

      <li className={styles.listItem}>
        <a
          href="https://www.edburtnieks.me/examples/bowling-reservation-form/"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <RefreshCWIcon className={styles.icon} />
          <span>Process</span>
        </a>
      </li>
    </ul>
  );
};

export { Links };
