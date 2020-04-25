import React, { FC } from "react";
import { Message } from "react-hook-form";
import { FormattedMessage } from "react-intl";

import styles from "./styles.module.scss";

type ErrorProps = {
  message: Message;
};

const Error: FC<ErrorProps> = ({ message }) => (
  <div className={styles.error}>
    <FormattedMessage id={message as string} />
  </div>
);

export { Error };
