import React, { FC } from "react";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";

import { BaseInput } from "../BaseInput";
import { InputButton } from "../InputButton";

import baseInputStyles from "../BaseInput/styles.module.scss";
import styles from "./styles.module.scss";

type IncrementInputProps = {
  name: string;
  id: string;
  label: string;
  minValue: number;
  maxValue: number;
  disabled?: boolean;
  decrement?: Function;
  decrementButtonLabel?: string;
  increment?: Function;
  incrementButtonLabel?: string;
};

const IncrementInput: FC<IncrementInputProps> = ({
  name,
  id,
  label,
  minValue,
  maxValue,
  disabled,
  decrement,
  decrementButtonLabel,
  increment,
  incrementButtonLabel,
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
    <BaseInput name={name} id={id} label={label}>
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
        >
          -
        </InputButton>

        <input
          className={classNames(baseInputStyles.input, styles.input)}
          name={name}
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
        >
          +
        </InputButton>
      </div>
    </BaseInput>
  );
};

export { IncrementInput };
