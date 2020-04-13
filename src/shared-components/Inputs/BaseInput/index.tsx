import React, { FC } from "react";
import { ErrorMessage } from "react-hook-form";

import { Error } from "../../Error";
import styles from "./styles.module.scss";

type BaseInputProps = {
  name: string;
  id: string;
  label: string;
};

const BaseInput: FC<BaseInputProps> = ({ name, id, label, children }) => (
  <div>
    <label className={styles.label} htmlFor={id}>
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
