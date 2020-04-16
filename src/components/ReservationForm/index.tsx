import React, { FC, useState } from "react";
import { useForm, FormContext, Controller } from "react-hook-form";

import { TextInput } from "../../shared-components/Inputs/TextInput";
import { IncrementInput } from "../../shared-components/Inputs/IncrementInput";
import { Dropdown } from "../../shared-components/Inputs/Dropdown";
import { Calendar } from "../../shared-components/Inputs/Calendar";

import styles from "./styles.module.scss";

import { formatDateAndTime, getStartTime } from "./utils";
import { reservationSchema } from "./schema";

type ReservationFormProps = {
  endHour: number;
  maxLaneCount: number;
  minLaneCount: number;
  startHour: number;
};

type ReservationFormData = {
  date: Date;
  startTime: number;
  laneCount: number;
  name: string;
  phone: string;
};

const ReservationForm: FC<ReservationFormProps> = ({
  endHour,
  maxLaneCount,
  minLaneCount,
  startHour
}) => {
  const [isDateAndTimeDropdownOpen, setDateAndTimeDropdown] = useState(false);

  const defaultValues: ReservationFormData = {
    date: new Date(),
    startTime: getStartTime(startHour, endHour),
    laneCount: minLaneCount,
    name: "",
    phone: ""
  };

  const reservationFormMethods = useForm<ReservationFormData>({
    defaultValues,
    validationSchema: reservationSchema
  });

  const onSubmit = (data: ReservationFormData) => {
    console.log({
      ...data
    });
  };

  return (
    <FormContext {...reservationFormMethods}>
      <form onSubmit={reservationFormMethods.handleSubmit(onSubmit)}>
        <div className={styles.mainFields}>
          <Dropdown
            id="date-and-time"
            label="Date and time"
            value={formatDateAndTime(
              reservationFormMethods.watch("date"),
              reservationFormMethods.watch("startTime")
            )}
            isOpen={isDateAndTimeDropdownOpen}
            toggleDropdown={() =>
              setDateAndTimeDropdown(!isDateAndTimeDropdownOpen)
            }
            closeDropdown={() => setDateAndTimeDropdown(false)}
          >
            <div className={styles.calendarWrapper}>
              <Controller as={<Calendar name="date" />} name="date" />
            </div>
          </Dropdown>

          <IncrementInput
            name="laneCount"
            id="lane-count"
            label="Lane count"
            minValue={minLaneCount}
            maxValue={maxLaneCount}
            decrementButtonLabel="Remove lane"
            incrementButtonLabel="Add lane"
          />

          <TextInput name="name" id="name" label="Name" />

          <TextInput name="phone" id="phone" label="Phone" type="tel" />
        </div>

        {/* Temporary */}
        <button>Make reservation</button>
      </form>
    </FormContext>
  );
};

export { ReservationForm };
