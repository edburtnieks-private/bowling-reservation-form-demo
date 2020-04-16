import React, { FC } from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

type MinusProps = {
  disabled?: boolean;
};

const Minus: FC<MinusProps> = ({ disabled }) => (
  <div
    className={classNames(styles.wrapper, { [styles.disabled]: disabled })}
  />
);

export { Minus };
