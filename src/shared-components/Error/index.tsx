import React, { FC } from "react";
import { Message } from "react-hook-form";

import styles from "./styles.module.scss";

type ErrorProps = {
  message: Message;
};

const Error: FC<ErrorProps> = ({ message }) => (
  <div className={styles.error}>{message}</div>
);

export { Error };
