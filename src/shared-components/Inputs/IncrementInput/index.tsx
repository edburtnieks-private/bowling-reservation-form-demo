import React, { FC, ReactNode } from "react";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";

import { BaseInput } from "../BaseInput";
import { InputButton } from "../InputButton";
import { Minus } from "../../Icons/Minus";
import { Plus } from "../../Icons/Plus";

import baseInputStyles from "../BaseInput/styles.module.scss";
import styles from "./styles.module.scss";

type IncrementInputProps = {
  id: string;
  label: ReactNode;
  maxValue: number;
  minValue: number;
  name: string;

  decrementButtonLabel?: string;
  defaultValue?: string | number | string[];
  describedBy?: string;
  disabled?: boolean;
  incrementButtonLabel?: string;
  vertical?: boolean;

  decrement?: (value: number) => void;
  increment?: (value: number) => void;
};

const IncrementInput: FC<IncrementInputProps> = ({
  id,
  label,
  maxValue,
  minValue,
  name,
  decrementButtonLabel,
  defaultValue,
  describedBy,
  disabled,
  incrementButtonLabel,
  vertical,
  decrement,
  increment,
  children,
  ...rest
}) => {
  const { register, setValue, getValues, watch } = useFormContext();

  const handleDecrement = () => {
    if (getValues()[name] > minValue) {
      const newValue = +getValues()[name] - 1;

      if (decrement) {
        decrement(newValue);
      }

      setValue(name, newValue);
    }
  };

  const handleIncrement = () => {
    if (getValues()[name] < maxValue) {
      const newValue = +getValues()[name] + 1;

      if (increment) {
        increment(newValue);
      }

      setValue(name, newValue);
    }
  };

  return (
    <BaseInput
      name={name}
      id={id}
      label={label}
      vertical={vertical}
      incrementInput
    >
      <div
        className={classNames(styles.wrapper, {
          [styles.componentDisabled]: disabled
        })}
      >
        <InputButton
          className={styles.button}
          onClick={handleDecrement}
          disabled={disabled || +watch(name) <= minValue}
          aria-label={decrementButtonLabel}
          aria-describedby={describedBy}
        >
          <Minus disabled={disabled || +watch(name) <= minValue} />
        </InputButton>

        <input
          className={classNames(baseInputStyles.input, styles.input)}
          name={name}
          defaultValue={defaultValue}
          id={id}
          ref={register}
          disabled
          {...rest}
        />

        <InputButton
          className={styles.button}
          onClick={handleIncrement}
          disabled={disabled || +watch(name) >= maxValue}
          aria-label={incrementButtonLabel}
          aria-describedby={describedBy}
        >
          <Plus disabled={disabled || +watch(name) >= maxValue} />
        </InputButton>
      </div>

      {children}
    </BaseInput>
  );
};

export { IncrementInput };
