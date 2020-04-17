import React, { FC } from "react";
import classNames from "classnames";

import { InputButton } from "../InputButton";
import { Caret } from "../../Icons/Caret";
import { Cross } from "../../Icons/Cross";

import baseInputStyles from "../BaseInput/styles.module.scss";
import styles from "./styles.module.scss";

type DropdownProps = {
  isOpen: boolean;
  label: string;

  closeDropdown: () => void;
  toggleDropdown: () => void;

  className?: string;
  id?: string;
  position?: string;
  value?: string;
};

const Dropdown: FC<DropdownProps> = ({
  isOpen,
  label,
  closeDropdown,
  toggleDropdown,
  className,
  id,
  position = "bottom",
  value,
  children,
  ...rest
}) => {
  return (
    <div
      className={classNames(
        baseInputStyles.field,
        styles.wrapper,
        { [styles.right]: position === "right" },
        className
      )}
    >
      {value ? (
        <>
          <label className={baseInputStyles.label} htmlFor={id}>
            {label}
          </label>

          <div className={classNames(styles.inputToggle)}>
            <input
              type="button"
              className={classNames(baseInputStyles.input, styles.input)}
              id={id}
              value={value}
              onClick={() => toggleDropdown()}
              {...rest}
            />

            <Caret
              className={styles.caret}
              active={isOpen}
              right={position === "right"}
            />
          </div>
        </>
      ) : (
        <InputButton
          className={styles.buttonToggle}
          onClick={() => toggleDropdown()}
        >
          <span>{label}</span>
          <Caret
            className={styles.caret}
            active={isOpen}
            right={position === "right"}
          />
        </InputButton>
      )}

      <div
        className={classNames(styles.overlay, { [styles.active]: isOpen })}
      />

      <div
        className={classNames(
          styles.content,
          { [styles.active]: isOpen },
          { [styles.bottom]: position === "bottom" },
          { [styles.right]: position === "right" }
        )}
      >
        {children}

        <InputButton
          className={styles.closeButton}
          onClick={() => closeDropdown()}
          aria-label="Close dropdown"
        >
          <Cross />
        </InputButton>
      </div>
    </div>
  );
};

export { Dropdown };
