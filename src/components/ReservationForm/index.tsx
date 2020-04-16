import React, { FC, useState } from "react";
import { useForm, FormContext, Controller } from "react-hook-form";

import { TextInput } from "../../shared-components/Inputs/TextInput";
import { IncrementInput } from "../../shared-components/Inputs/IncrementInput";
import { Dropdown } from "../../shared-components/Inputs/Dropdown";
import { Calendar } from "../../shared-components/Inputs/Calendar";
import { Select } from "../../shared-components/Inputs/Select";

import styles from "./styles.module.scss";

import {
  formatDateAndTime,
  getStartDate,
  getStartTime,
  availableTimes,
  getDuration,
  getMaxDuration
} from "./utils";
import { reservationSchema } from "./schema";

type ReservationFormProps = {
  endHour: number;
  maxDuration: number;
  maxLaneCount: number;
  minDuration: number;
  minLaneCount: number;
  startHour: number;
};

type ReservationFormData = {
  date: Date;
  startTime: number;
  duration: number;
  laneCount: number;
  name: string;
  phone: string;
};

const ReservationForm: FC<ReservationFormProps> = ({
  endHour,
  maxDuration,
  maxLaneCount,
  minDuration,
  minLaneCount,
  startHour
}) => {
  const [isDateAndTimeDropdownOpen, setDateAndTimeDropdown] = useState(false);

  const defaultValues: ReservationFormData = {
    date: getStartDate(startHour, endHour),
    startTime: getStartTime(startHour, endHour),
    duration: minDuration,
    laneCount: minLaneCount,
    name: "",
    phone: ""
  };

  const reservationFormMethods = useForm<ReservationFormData>({
    defaultValues,
    validationSchema: reservationSchema
  });

  const setDuration = (): void => {
    reservationFormMethods.setValue(
      "duration",
      getDuration(
        reservationFormMethods.getValues().duration,
        getMaxDuration(
          reservationFormMethods.getValues().startTime,
          maxDuration
        )
      )
    );
  };

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
            <div className={styles.dateAndTimeFields}>
              <div className={styles.calendarWrapper}>
                <Controller
                  as={
                    <Calendar
                      name="date"
                      minDate={getStartDate(startHour, endHour)}
                    />
                  }
                  name="date"
                />
              </div>

              <div>
                <Select
                  name="startTime"
                  id="start-time"
                  label="Start time"
                  options={availableTimes(startHour, endHour)}
                  customOptionTextEnd=":00"
                  vertical
                  onChange={setDuration}
                />

                <IncrementInput
                  name="duration"
                  id="duration"
                  label="Duration (h)"
                  minValue={minDuration}
                  maxValue={getMaxDuration(
                    reservationFormMethods.getValues().startTime,
                    maxDuration
                  )}
                  decrementButtonLabel="Remove hour"
                  incrementButtonLabel="Add hour"
                  vertical
                />
              </div>
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
