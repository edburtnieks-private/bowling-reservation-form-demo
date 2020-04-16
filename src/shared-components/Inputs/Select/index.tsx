import React, { FC } from "react";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";

import { BaseInput } from "../BaseInput";
import { Caret } from "../../Icons/Caret";

import baseInputStyles from "../BaseInput/styles.module.scss";
import styles from "./styles.module.scss";

type SelectProps = {
  id: string;
  label: string;
  name: string;
  options: (string | number)[];

  customOptionTextEnd?: string;
  vertical?: boolean;
};

const Select: FC<SelectProps> = ({
  id,
  label,
  name,
  options,
  customOptionTextEnd,
  vertical,
  ...rest
}) => {
  const { register } = useFormContext();

  return (
    <BaseInput name={name} id={id} label={label} vertical={vertical}>
      <div className={styles.wrapper}>
        <select
          className={classNames(baseInputStyles.input, styles.select)}
          name={name}
          id={id}
          ref={register}
          {...rest}
        >
          {(options as (string | number)[]).map((option: string | number) => (
            <option key={option} value={option}>
              {option}
              {customOptionTextEnd && customOptionTextEnd}
            </option>
          ))}
        </select>

        <Caret className={styles.caret} />
      </div>
    </BaseInput>
  );
};

export { Select };
