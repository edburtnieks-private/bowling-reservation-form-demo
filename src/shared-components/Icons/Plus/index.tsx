import React, { FC } from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

type PlusProps = {
  disabled?: boolean;
};

const Plus: FC<PlusProps> = ({ disabled }) => (
  <div
    className={classNames(styles.wrapper, { [styles.disabled]: disabled })}
  />
);

export { Plus };
