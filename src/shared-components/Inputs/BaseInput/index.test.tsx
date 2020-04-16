import React from "react";
import { render } from "@testing-library/react";
import { useForm, FormContext } from "react-hook-form";

import { BaseInput } from "./index";

describe("<BaseInput />", () => {
  it("shows label", () => {
    const props = {
      name: "base-input",
      id: "base-input",
      label: "Base input"
    };

    const Form = () => {
      const formMethods = useForm();

      return (
        <FormContext {...formMethods}>
          <form>
            <BaseInput {...props}>
              <div />
            </BaseInput>
          </form>
        </FormContext>
      );
    };

    const { getByTestId } = render(<Form />);

    expect(getByTestId("label").textContent).toEqual("Base input");
  });
});
