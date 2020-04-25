import React, { FC, useRef } from "react";
import classNames from "classnames";
import { useIntl } from "react-intl";

import { InputButton } from "../InputButton";
import { Caret } from "../../Icons/Caret";
import { Cross } from "../../Icons/Cross";

import { setAriaAttributes, trapFocus } from "./utils";

import baseInputStyles from "../BaseInput/styles.module.scss";
import styles from "./styles.module.scss";

type DropdownProps = {
  isOpen: boolean;
  label: string;

  toggleDropdown: () => void;

  className?: string;
  id?: string;
  position?: "bottom" | "right";
  secondary?: boolean;
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
  secondary = false,
  toggleAriaLabel = "",
  value,
  children,
  ...rest
}) => {
  const { formatMessage } = useIntl();
  const buttonToggle = useRef<HTMLButtonElement>(null);
  const inputToggle = useRef<HTMLInputElement>(null);
  const dropdownContent = useRef<HTMLDivElement>(null);

  const onToggleDropdown = (): void => {
    toggleDropdown();
    setAriaAttributes(
      isOpen,
      toggleAriaLabel,
      formatMessage({ id: "show" }),
      formatMessage({ id: "hide" }),
      {
        buttonToggle,
        inputToggle,
        dropdownContent
      }
    );
    trapFocus(isOpen, dropdownContent);
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
              aria-label={`${formatMessage({ id: "show" })} ${toggleAriaLabel}`}
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
          className={classNames(styles.buttonToggle, {
            [styles.secondary]: secondary
          })}
          onClick={onToggleDropdown}
          ref={buttonToggle}
          aria-label={`${formatMessage({ id: "show" })} ${toggleAriaLabel}`}
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
          { [styles.right]: position === "right" },
          "content"
        )}
        aria-hidden="true"
      >
        {children}

        <InputButton
          className={styles.closeButton}
          onClick={onToggleDropdown}
          aria-label={`${formatMessage({ id: "hide" })} ${toggleAriaLabel}`}
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
