import React, { FC, useRef } from "react";
import classNames from "classnames";

import { InputButton } from "../InputButton";
import { Caret } from "../../Icons/Caret";
import { Cross } from "../../Icons/Cross";

import baseInputStyles from "../BaseInput/styles.module.scss";
import styles from "./styles.module.scss";

type DropdownProps = {
  isOpen: boolean;
  label: string;

  toggleDropdown: () => void;

  className?: string;
  id?: string;
  position?: "bottom" | "right";
  toggleAriaLabel?: string;
  value?: string;
};

const Dropdown: FC<DropdownProps> = ({
  isOpen,
  label,
  toggleDropdown,
  className,
  id,
  position = "bottom",
  toggleAriaLabel,
  value,
  children,
  ...rest
}) => {
  const buttonToggle = useRef<HTMLButtonElement>(null);
  const inputToggle = useRef<HTMLInputElement>(null);
  const dropdownContent = useRef<HTMLDivElement>(null);

  const onToggleDropdown = (): void => {
    toggleDropdown();

    if (!isOpen) {
      if (buttonToggle.current) {
        buttonToggle.current.setAttribute("aria-expanded", "true");
        buttonToggle.current.setAttribute(
          "aria-label",
          `Hide ${toggleAriaLabel}`
        );
      }

      if (inputToggle.current) {
        inputToggle.current.setAttribute("aria-expanded", "true");
        inputToggle.current.setAttribute(
          "aria-label",
          `Hide ${toggleAriaLabel}`
        );
      }

      if (dropdownContent.current) {
        dropdownContent.current.setAttribute("aria-hidden", "false");
        dropdownContent.current.focus();
      }
    } else {
      if (buttonToggle.current) {
        buttonToggle.current.setAttribute("aria-expanded", "false");
        buttonToggle.current.setAttribute(
          "aria-label",
          `Show ${toggleAriaLabel}`
        );
      }

      if (inputToggle.current) {
        inputToggle.current.setAttribute("aria-expanded", "false");
        inputToggle.current.setAttribute(
          "aria-label",
          `Show ${toggleAriaLabel}`
        );
      }

      if (dropdownContent.current) {
        dropdownContent.current.setAttribute("aria-hidden", "true");
      }
    }
  };

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
              onClick={onToggleDropdown}
              ref={inputToggle}
              aria-label={`Show ${toggleAriaLabel}`}
              aria-expanded="false"
              aria-controls="dropdownContent"
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
          onClick={onToggleDropdown}
          ref={buttonToggle}
          aria-label={`Show ${toggleAriaLabel}`}
          aria-expanded="false"
          aria-controls="dropdownContent"
          {...rest}
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
        id="dropdownContent"
        ref={dropdownContent}
        className={classNames(
          styles.content,
          { [styles.active]: isOpen },
          { [styles.bottom]: position === "bottom" },
          { [styles.right]: position === "right" }
        )}
        aria-hidden="true"
      >
        {children}

        <InputButton
          className={styles.closeButton}
          onClick={onToggleDropdown}
          aria-label={`Hide ${toggleAriaLabel}`}
          aria-expanded="true"
          aria-controls="dropdownContent"
        >
          <Cross />
        </InputButton>
      </div>
    </div>
  );
};

export { Dropdown };
