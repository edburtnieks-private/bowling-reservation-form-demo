import React from "react";

import { InputButton } from "../../shared-components/Inputs/InputButton";

import styles from "./styles.module.scss";

type LanguageSwitcherProps = {
  setLocale: (locale: string) => void;
};

const LanguageSwitcher = ({ setLocale }: LanguageSwitcherProps) => {
  return (
    <ul className={styles.wrapper}>
      <li className={styles.listItem}>
        <InputButton onClick={() => setLocale("en")}>
          English
        </InputButton>
      </li>

      <li className={styles.listItem}>
        <InputButton onClick={() => setLocale("lv")}>
          Latviešu
        </InputButton>
      </li>
    </ul>
  );
};

export { LanguageSwitcher };
