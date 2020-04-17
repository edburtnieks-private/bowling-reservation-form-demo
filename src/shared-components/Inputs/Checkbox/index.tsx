import React, { FC } from "react";
import { useFormContext } from "react-hook-form";

import styles from "./styles.module.scss";

type CheckboxProps = {
  name: string;
  id: string;
  label: string;
};

const Checkbox: FC<CheckboxProps> = ({ name, id, label, ...rest }) => {
  const { register } = useFormContext();

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.checkbox}
        name={name}
        id={id}
        ref={register}
        type="checkbox"
        {...rest}
      />
      <label className={styles.label} htmlFor={id}>
        <div>{label}</div>
        <span className={styles.customCheckbox} />
      </label>
    </div>
  );
};

export { Checkbox };
