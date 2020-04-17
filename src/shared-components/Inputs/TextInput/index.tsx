import React, { FC } from "react";
import { useFormContext } from "react-hook-form";

import { BaseInput } from "../BaseInput";
import styles from "../BaseInput/styles.module.scss";

type BaseInputProps = {
  name: string;
  id: string;
  label: string;

  type?: string;
  vertical?: boolean;
};

const TextInput: FC<BaseInputProps> = ({
  name,
  id,
  label,
  type = "text",
  vertical,
  ...rest
}) => {
  const { register } = useFormContext();

  return (
    <BaseInput name={name} id={id} label={label} vertical={vertical} textInput>
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
