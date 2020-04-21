type Elements = {
  buttonToggle: React.RefObject<HTMLButtonElement>;
  inputToggle: React.RefObject<HTMLInputElement>;
  dropdownContent: React.RefObject<HTMLDivElement>;
};

export const setAriaAttributes = (
  isOpen: boolean,
  toggleAriaLabel: string,
  { buttonToggle, inputToggle, dropdownContent }: Elements
): void => {
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
      inputToggle.current.setAttribute("aria-label", `Hide ${toggleAriaLabel}`);
    }

    if (dropdownContent.current) {
      dropdownContent.current.setAttribute("aria-hidden", "false");
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
      inputToggle.current.setAttribute("aria-label", `Show ${toggleAriaLabel}`);
    }

    if (dropdownContent.current) {
      dropdownContent.current.setAttribute("aria-hidden", "true");
    }
  }
};

export const trapFocus = (
  isOpen: boolean,
  dropdownContent: React.RefObject<HTMLDivElement>
) => {
  if (dropdownContent.current) {
    const focusableElements = dropdownContent.current.querySelectorAll(
      "a:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), input:not([disabled]), input:not([disabled]), select:not([disabled])"
    );
    const firstFocusableElement = focusableElements[0] as HTMLElement;
    const lastFocusableElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;
    const KEYCODE_TAB = 9;

    const focus = (event: KeyboardEvent) => {
      const isTabPressed = event.key === "Tab" || event.keyCode === KEYCODE_TAB;

      if (!isTabPressed) return;

      if (event.shiftKey) {
        // Shift + tab
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          event.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          event.preventDefault();
        }
      }
    };

    if (!isOpen) {
      dropdownContent.current.addEventListener("keydown", focus);
    } else {
      dropdownContent.current.removeEventListener("keydown", focus);
    }
  }
};
