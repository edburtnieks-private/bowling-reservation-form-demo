import React, { Fragment, FC, useState } from "react";
import {
  useForm,
  useFieldArray,
  FormContext,
  Controller
} from "react-hook-form";

import { TextInput } from "../../shared-components/Inputs/TextInput";
import { IncrementInput } from "../../shared-components/Inputs/IncrementInput";
import { Dropdown } from "../../shared-components/Inputs/Dropdown";
import { Calendar } from "../../shared-components/Inputs/Calendar";
import { Select } from "../../shared-components/Inputs/Select";
import { Checkbox } from "../../shared-components/Inputs/Checkbox";

import styles from "./styles.module.scss";

import {
  formatDateAndTime,
  getStartDate,
  getStartTime,
  availableTimes,
  getDuration,
  getMaxDuration,
  getLanes
} from "./utils";
import { reservationSchema } from "./schema";

type ReservationFormProps = {
  endHour: number;
  maxDuration: number;
  maxLaneCount: number;
  maxPlayerCount: number;
  minDuration: number;
  minLaneCount: number;
  minPlayerCount: number;
  startHour: number;
  totalLaneCount: number;
};

type ReservationFormData = {
  date: Date;
  startTime: number;
  duration: number;
  laneCount: number;
  name: string;
  phone: string;
  lanes: Object[];
  playerCount: number;
  players: string[];
  isShoes: boolean;
  shoeCount: number;
};

const ReservationForm: FC<ReservationFormProps> = ({
  endHour,
  maxDuration,
  maxLaneCount,
  maxPlayerCount,
  minDuration,
  minLaneCount,
  minPlayerCount,
  startHour,
  totalLaneCount
}) => {
  const [isDateAndTimeDropdownOpen, setDateAndTimeDropdown] = useState(false);
  const [isMoreDetailsDropdownOpen, setMoreDetailsDropdown] = useState(false);

  const defaultValues: ReservationFormData = {
    date: getStartDate(startHour, endHour),
    startTime: getStartTime(startHour, endHour),
    duration: minDuration,
    laneCount: minLaneCount,
    name: "",
    phone: "",
    lanes: [],
    playerCount: 2,
    players: Array(2).fill(""),
    isShoes: true,
    shoeCount: 2
  };

  const reservationFormMethods = useForm<ReservationFormData>({
    defaultValues,
    validationSchema: reservationSchema
  });

  const {
    fields: lanes,
    append: appendLane,
    remove: removeLane
  } = useFieldArray({
    control: reservationFormMethods.control,
    name: "lanes"
  });

  const {
    fields: players,
    append: appendPlayer,
    remove: removePlayer
  } = useFieldArray({
    control: reservationFormMethods.control,
    name: "players"
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

  const onLanesChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (event.target.checked) {
      appendLane({ active: true });
    } else {
      removeLane(index);
    }
  };

  const decrementPlayerCount = (value: number): void => {
    removePlayer(value - 1);
  };

  const incrementPlayerCount = () => {
    appendPlayer({ name: "players" });
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

        <div className={styles.footer}>
          <Dropdown
            label="More details"
            isOpen={isMoreDetailsDropdownOpen}
            toggleDropdown={() =>
              setMoreDetailsDropdown(!isMoreDetailsDropdownOpen)
            }
            closeDropdown={() => setMoreDetailsDropdown(false)}
            className={styles.moreDetailsDropdown}
            position="right"
          >
            <div className={styles.moreDetailsDropdownContent}>
              <div>
                <div>
                  {getLanes(totalLaneCount).map((lane, index) => (
                    <Fragment key={lane}>
                      <input
                        type="checkbox"
                        name={`lanes[${index}].active`}
                        id={`lane-${lane}`}
                        ref={reservationFormMethods.register()}
                        onChange={event => onLanesChange(event, index)}
                      />
                      <label htmlFor={`lane-${lane}`}>{lane}</label>
                    </Fragment>
                  ))}
                </div>

                <div className={styles.laneInfo}>
                  <IncrementInput
                    name="playerCount"
                    id="player-count"
                    label="Players"
                    minValue={minPlayerCount}
                    maxValue={maxPlayerCount}
                    decrement={decrementPlayerCount}
                    increment={incrementPlayerCount}
                  />

                  <IncrementInput
                    name="shoeCount"
                    id="shoe-count"
                    label={
                      <Checkbox name="isShoes" id="is-shoes" label="Shoes" />
                    }
                    minValue={minPlayerCount}
                    maxValue={maxPlayerCount}
                    disabled={!reservationFormMethods.getValues().isShoes}
                  />
                </div>
              </div>

              <div>
                {players.map((_, index) => {
                  const playerIndex = index + 1;

                  return (
                    <TextInput
                      key={index}
                      name={`players[${index}]`}
                      id={`player-${playerIndex}`}
                      label={`Player ${playerIndex}`}
                      vertical
                    />
                  );
                })}
              </div>
            </div>
          </Dropdown>

          {/* Temporary */}
          <button>Make reservation</button>
        </div>
      </form>
    </FormContext>
  );
};

export { ReservationForm };
