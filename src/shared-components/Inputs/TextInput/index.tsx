import React, { FC } from "react";
import { useFormContext } from "react-hook-form";

import { BaseInput } from "../BaseInput";
import styles from "../BaseInput/styles.module.scss";

type BaseInputProps = {
  name: string;
  id: string;
  label: string;

  type?: string;
};

const TextInput: FC<BaseInputProps> = ({
  name,
  id,
  label,
  type = "text",
  ...rest
}) => {
  const { register } = useFormContext();

  return (
    <BaseInput name={name} id={id} label={label}>
      <input
        className={styles.input}
        type={type}
        name={name}
        id={id}
        ref={register}
        {...rest}
      />
    </BaseInput>
  );
};

export { TextInput };
