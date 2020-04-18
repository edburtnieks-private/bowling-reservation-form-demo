import React, { FC, RefObject, forwardRef } from "react";
import classNames from "classnames";

import baseInputStyles from "../BaseInput/styles.module.scss";
import styles from "./styles.module.scss";

type InputButtonProps = {
  onClick: () => void;

  className?: string;
  disabled?: boolean;
  ref?: RefObject<HTMLButtonElement>;
};

const InputButton: FC<InputButtonProps> = forwardRef(
  ({ onClick, className, disabled = false, children, ...rest }, ref) => (
    <button
      type="button"
      className={classNames(baseInputStyles.input, styles.button, className)}
      onClick={() => onClick()}
      disabled={disabled}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  )
);

export { InputButton };
