import React, { FC } from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

type CaretProps = {
  active?: boolean;
  className?: string;
  left?: boolean;
  right?: boolean;
};

const Caret: FC<CaretProps> = ({ active, left, right, className }) => (
  <div
    className={classNames(
      styles.wrapper,
      { [styles.active]: active },
      { [styles.left]: left },
      { [styles.right]: right },
      className
    )}
  />
);

export { Caret };
