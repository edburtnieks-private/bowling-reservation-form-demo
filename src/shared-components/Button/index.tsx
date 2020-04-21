import React, { FC } from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

type ButtonProps = {
  buttonType?: "primary";
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
};

const Button: FC<ButtonProps> = ({
  buttonType = "primary",
  disabled = false,
  type = "button",
  children
}) => (
  <button
    type={type}
    className={classNames(styles.button, styles[buttonType])}
    disabled={disabled}
  >
    {children}
  </button>
);

export { Button };
