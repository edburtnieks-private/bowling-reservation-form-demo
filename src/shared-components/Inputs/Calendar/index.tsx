import React from "react";
import Calendar, { CalendarProps } from "react-calendar";
import { ErrorMessage } from "react-hook-form";
import { useIntl } from "react-intl";

import { Error } from "../../Error";
import { Caret } from "../../Icons/Caret";

import "react-calendar/dist/Calendar.css";
import "./styles.scss";

type CalendarInputProps = {
  name: string;

  minDate?: Date;
};

const CalendarInput = ({ name, minDate, ...rest }: CalendarInputProps) => {
  const { locale, formatDate, formatMessage } = useIntl();

  const options: CalendarProps = {
    minDate: minDate || new Date(),
    maxDate: new Date(new Date().getFullYear(), 11, 31),
    minDetail: "year",
    showFixedNumberOfWeeks: true,
    prevLabel: <Caret left />,
    nextLabel: <Caret right />,
    nextAriaLabel: formatMessage({ id: "next_month" }),
    prevAriaLabel: formatMessage({ id: "previous_month" }),
    navigationAriaLabel: formatMessage({ id: "change_month" }),
    locale,
    formatShortWeekday: (_, date) => formatDate(date, { weekday: 'narrow' }),
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
