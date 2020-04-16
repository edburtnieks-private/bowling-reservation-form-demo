import React from "react";
import Calendar, { CalendarProps } from "react-calendar";
import { ErrorMessage } from "react-hook-form";

import { Error } from "../../Error";
import { Caret } from "../../Icons/Caret";

import "react-calendar/dist/Calendar.css";
import "./styles.scss";

type CalendarInputProps = {
  name: string;

  minDate?: Date;
};

const CalendarInput = ({ name, minDate, ...rest }: CalendarInputProps) => {
  const options: CalendarProps = {
    minDate: minDate || new Date(),
    maxDate: new Date(new Date().getFullYear(), 11, 31),
    minDetail: "year",
    showFixedNumberOfWeeks: true,
    prevLabel: <Caret left />,
    nextLabel: <Caret right />
  };

  return (
    <>
      <Calendar {...options} {...rest} />

      <ErrorMessage
        name={name}
        children={({ message }) => <Error message={message} />}
      />
    </>
  );
};

export { CalendarInput as Calendar };
