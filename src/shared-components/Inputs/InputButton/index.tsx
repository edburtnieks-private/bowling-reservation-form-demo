import React, { FC } from "react";
import classNames from "classnames";

import baseInputStyles from "../BaseInput/styles.module.scss";
import styles from "./styles.module.scss";

type InputButtonProps = {
  onClick: Function;
  className?: string;
  disabled?: boolean;
};

const InputButton: FC<InputButtonProps> = ({
  onClick,
  className,
  disabled = false,
  children,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={classNames(baseInputStyles.input, styles.button, className)}
      onClick={() => onClick()}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export { InputButton };
