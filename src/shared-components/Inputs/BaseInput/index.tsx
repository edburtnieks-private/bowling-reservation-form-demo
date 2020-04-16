import React, { FC } from "react";
import { ErrorMessage } from "react-hook-form";

import { Error } from "../../Error";
import styles from "./styles.module.scss";

type BaseInputProps = {
  id: string;
  label: string;
  name: string;
};

const BaseInput: FC<BaseInputProps> = ({ id, label, name, children }) => (
  <div className={styles.field}>
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
