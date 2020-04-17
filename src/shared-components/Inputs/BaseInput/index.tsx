import React, { FC, ReactNode } from "react";
import classNames from "classnames";
import { ErrorMessage } from "react-hook-form";

import { Error } from "../../Error";
import styles from "./styles.module.scss";

type BaseInputProps = {
  id: string;
  label: ReactNode;
  name: string;

  vertical?: boolean;
};

const BaseInput: FC<BaseInputProps> = ({
  id,
  label,
  name,
  vertical,
  children
}) => (
  <div className={classNames(styles.field, { [styles.vertical]: vertical })}>
    <label className={styles.label} htmlFor={id} data-testid="label">
      {label}
    </label>

    {children}

    <ErrorMessage
      name={name}
      children={({ message }) => <Error message={message} />}
    />
  </div>
);

export { BaseInput };
