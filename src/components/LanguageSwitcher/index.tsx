import React from "react";

import { ReactComponent as GlobeIcon } from "../../assets/icons/globe.svg";

import styles from "./styles.module.scss";

type LanguageSwitcherProps = {
  setLocale: (locale: string) => void;
};

const LanguageSwitcher = ({ setLocale }: LanguageSwitcherProps) => {
  return (
    <div className={styles.wrapper}>
      <GlobeIcon className={styles.icon} />

      <ul className={styles.list}>
        <li className={styles.listItem}>
          <button
            type="button"
            className={styles.button}
            onClick={() => setLocale("en")}
          >
            English
          </button>
        </li>

        <li className={styles.listItem}>
          <button
            type="button"
            className={styles.button}
            onClick={() => setLocale("lv")}
          >
            Latviešu
          </button>
        </li>
      </ul>
    </div>
  );
};

export { LanguageSwitcher };
