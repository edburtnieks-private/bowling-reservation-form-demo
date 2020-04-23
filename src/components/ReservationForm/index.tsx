import React, { FC, useState } from "react";
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
import { Button } from "../../shared-components/Button";
import { LaneSelect } from "./LaneSelect";

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
  maxPlayerCount: number;
  minDuration: number;
  minLaneCount: number;
  minPlayerCount: number;
  startHour: number;
  totalLaneCount: number;
  handleSubmit: (value: Object) => void;
};

type ReservationFormData = {
  date: Date;
  duration: number;
  lane: string;
  laneCount: number;
  name: string;
  phone: string;
  startTime: number;

  isPlayers?: boolean;
  playerCount?: number;
  players?: string[];
  shoeCount?: number;
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
  totalLaneCount,
  handleSubmit
}) => {
  const [isDateAndTimeDropdownOpen, setDateAndTimeDropdown] = useState(false);
  const [isMoreDetailsDropdownOpen, setMoreDetailsDropdown] = useState(false);

  const defaultValues: ReservationFormData = {
    date: getStartDate(startHour, endHour),
    duration: minDuration,
    isPlayers: false,
    lane: `${Math.floor(Math.random() * totalLaneCount) + 1}`,
    laneCount: minLaneCount,
    name: "",
    phone: "",
    playerCount: minPlayerCount,
    players: Array(minPlayerCount).fill(""),
    shoeCount: minPlayerCount,
    startTime: getStartTime(startHour, endHour)
  };

  const reservationFormMethods = useForm<ReservationFormData>({
    defaultValues,
    validationSchema: reservationSchema
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
        reservationFormMethods.watch("duration"),
        getMaxDuration(reservationFormMethods.watch("startTime"), maxDuration)
      )
    );
  };

  const decrementPlayerCount = (value: number): void => {
    removePlayer(value - 1);

    const shoeCount = reservationFormMethods.watch("shoeCount");

    if (shoeCount) {
      if (+shoeCount > 0) {
        reservationFormMethods.setValue("shoeCount", +shoeCount - 1);
      }
    }
  };

  const incrementPlayerCount = (): void => {
    appendPlayer({ value: "" });

    const shoeCount = reservationFormMethods.watch("shoeCount");

    if (shoeCount) {
      reservationFormMethods.setValue("shoeCount", +shoeCount + 1);
    }
  };

  const onSubmit = (data: ReservationFormData) => {
    const reservationData: ReservationFormData = {
      date: data.date,
      startTime: data.startTime,
      duration: data.duration,
      laneCount: data.laneCount,
      name: data.name,
      phone: data.phone,
      lane: data.lane
    };

    if (data.isPlayers) {
      reservationData.playerCount = data.playerCount;
      reservationData.shoeCount = data.shoeCount;
      reservationData.players = data.players;
    }

    handleSubmit(reservationData);
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
            toggleAriaLabel="date and time"
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
                    reservationFormMethods.watch("startTime"),
                    maxDuration
                  )}
                  vertical
                  decrementButtonLabel="Remove hour"
                  incrementButtonLabel="Add hour"
                  describedBy="durationDescription"
                >
                  <p id="durationDescription" className="sr-only">
                    Current duration:
                    {reservationFormMethods.watch("duration")}{" "}
                    {+reservationFormMethods.watch("duration") === 1
                      ? `hour`
                      : `hours`}{" "}
                    out of{" "}
                    {getMaxDuration(
                      reservationFormMethods.watch("startTime"),
                      maxDuration
                    )}
                  </p>
                </IncrementInput>
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
            describedBy="laneCountDescription"
          >
            <p id="laneCountDescription" className="sr-only">
              Current lane count:
              {reservationFormMethods.watch("laneCount")}{" "}
              {+reservationFormMethods.watch("laneCount") === 1
                ? `lane`
                : `lanes`}{" "}
              out of {maxLaneCount}
            </p>
          </IncrementInput>

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
            className={styles.moreDetailsDropdown}
            position="right"
            toggleAriaLabel="more details"
            secondary
          >
            <div className={styles.moreDetailsDropdownContent}>
              <div className={styles.laneInfoWrapper}>
                <LaneSelect totalLaneCount={totalLaneCount} />

                <div className={styles.laneInfo}>
                  <IncrementInput
                    name="playerCount"
                    id="player-count"
                    label={
                      <Checkbox
                        name="isPlayers"
                        id="is-players"
                        label="Players"
                      />
                    }
                    minValue={minPlayerCount}
                    maxValue={maxPlayerCount}
                    disabled={!reservationFormMethods.watch("isPlayers")}
                    decrement={decrementPlayerCount}
                    increment={incrementPlayerCount}
                    decrementButtonLabel="Remove player"
                    incrementButtonLabel="Add player"
                    describedBy="playerCountDescription"
                  >
                    <p id="playerCountDescription" className="sr-only">
                      Current player count:
                      {reservationFormMethods.watch("playerCount")} out of{" "}
                      {maxPlayerCount}
                    </p>
                  </IncrementInput>

                  <IncrementInput
                    name="shoeCount"
                    id="shoe-count"
                    label="Shoes"
                    minValue={0}
                    maxValue={
                      reservationFormMethods.watch("playerCount") ||
                      maxPlayerCount
                    }
                    disabled={!reservationFormMethods.watch("isPlayers")}
                    decrementButtonLabel="Remove shoe"
                    incrementButtonLabel="Add shoe"
                    describedBy="shoeCountDescription"
                  >
                    <p id="shoeCountDescription" className="sr-only">
                      Current shoe count:
                      {reservationFormMethods.watch("shoeCount")} out of{" "}
                      {reservationFormMethods.watch("playerCount")}
                    </p>
                  </IncrementInput>
                </div>
              </div>
              <div>
                {players.map((player, index) => {
                  const playerIndex = index + 1;

                  return (
                    <TextInput
                      key={player.id}
                      name={`players[${index}]`}
                      id={`player-${playerIndex}`}
                      label={`Player ${playerIndex}`}
                      disabled={!reservationFormMethods.watch("isPlayers")}
                      vertical
                      fieldArray
                    />
                  );
                })}
              </div>
            </div>
          </Dropdown>

          <Button type="submit">Make reservation</Button>
        </div>
      </form>
    </FormContext>
  );
};

export { ReservationForm };
