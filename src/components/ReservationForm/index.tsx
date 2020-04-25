import React, { FC, useState } from "react";
import {
  useForm,
  useFieldArray,
  FormContext,
  Controller
} from "react-hook-form";
import { useIntl, FormattedMessage } from "react-intl";

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
  phoneNumber: string;
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
  const { locale, formatMessage } = useIntl();
  const [isDateAndTimeDropdownOpen, setDateAndTimeDropdown] = useState(false);
  const [isMoreDetailsDropdownOpen, setMoreDetailsDropdown] = useState(false);

  const defaultValues: ReservationFormData = {
    date: getStartDate(startHour, endHour),
    duration: minDuration,
    isPlayers: false,
    lane: `${Math.floor(Math.random() * totalLaneCount) + 1}`,
    laneCount: minLaneCount,
    name: "",
    phoneNumber: "",
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
      phoneNumber: data.phoneNumber,
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
            label={formatMessage({ id: "date_and_time" })}
            value={formatDateAndTime(
              reservationFormMethods.watch("date"),
              reservationFormMethods.watch("startTime"),
              locale
            )}
            isOpen={isDateAndTimeDropdownOpen}
            toggleDropdown={() =>
              setDateAndTimeDropdown(!isDateAndTimeDropdownOpen)
            }
            toggleAriaLabel={formatMessage({ id: "date_and_time" })}
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
                  label={formatMessage({ id: "start_time" })}
                  options={availableTimes(startHour, endHour)}
                  customOptionTextEnd=":00"
                  vertical
                  onChange={setDuration}
                />

                <IncrementInput
                  name="duration"
                  id="duration"
                  label={`${formatMessage({ id: "duration" })} (h)`}
                  minValue={minDuration}
                  maxValue={getMaxDuration(
                    reservationFormMethods.watch("startTime"),
                    maxDuration
                  )}
                  vertical
                  decrementButtonLabel={formatMessage({ id: "remove_hour" })}
                  incrementButtonLabel={formatMessage({ id: "add_hour" })}
                  describedBy="durationDescription"
                >
                  <p id="durationDescription" className="sr-only">
                    {formatMessage({ id: "current_duration" })}:{" "}
                    {reservationFormMethods.watch("duration")}{" "}
                    {+reservationFormMethods.watch("duration") === 1
                      ? formatMessage({ id: "hour" })
                      : formatMessage({ id: "hours" })}{" "}
                    {formatMessage({ id: "out_of" })}{" "}
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
            label={formatMessage({ id: "lane_count" })}
            minValue={minLaneCount}
            maxValue={maxLaneCount}
            decrementButtonLabel={formatMessage({ id: "remove_lane" })}
            incrementButtonLabel={formatMessage({ id: "add_lane" })}
            describedBy="laneCountDescription"
          >
            <p id="laneCountDescription" className="sr-only">
              {formatMessage({ id: "current_lane_count" })}:{" "}
              {reservationFormMethods.watch("laneCount")}{" "}
              {formatMessage({ id: "out_of" })}{" "}
              {maxLaneCount}
            </p>
          </IncrementInput>

          <TextInput
            name="name"
            id="name"
            label={formatMessage({ id: "name" })}
          />

          <TextInput
            type="tel"
            name="phoneNumber"
            id="phone-number"
            label={formatMessage({ id: "phone_number" })}
          />
        </div>

        <div className={styles.footer}>
          <Dropdown
            label={formatMessage({ id: "more_details" })}
            isOpen={isMoreDetailsDropdownOpen}
            toggleDropdown={() =>
              setMoreDetailsDropdown(!isMoreDetailsDropdownOpen)
            }
            className={styles.moreDetailsDropdown}
            position="right"
            toggleAriaLabel={formatMessage({ id: "more_details" })}
            secondary
          >
            <div className={styles.moreDetailsDropdownContent}>
              <div className={styles.laneInfoWrapper}>
                <LaneSelect
                  label={formatMessage({ id: "lane_number" })}
                  totalLaneCount={totalLaneCount}
                />

                <div className={styles.laneInfo}>
                  <IncrementInput
                    name="playerCount"
                    id="player-count"
                    label={
                      <Checkbox
                        name="isPlayers"
                        id="is-players"
                        label={formatMessage({ id: "players" })}
                      />
                    }
                    minValue={minPlayerCount}
                    maxValue={maxPlayerCount}
                    disabled={!reservationFormMethods.watch("isPlayers")}
                    decrement={decrementPlayerCount}
                    increment={incrementPlayerCount}
                    decrementButtonLabel={formatMessage({ id: "remove_player" })}
                    incrementButtonLabel={formatMessage({ id: "add_player" })}
                    describedBy="playerCountDescription"
                  >
                    <p id="playerCountDescription" className="sr-only">
                      {formatMessage({ id: "current_player_count" })}:{" "}
                      {reservationFormMethods.watch("playerCount")}{" "}
                      {formatMessage({ id: "out_of" })}{" "}
                      {maxPlayerCount}
                    </p>
                  </IncrementInput>

                  <IncrementInput
                    name="shoeCount"
                    id="shoe-count"
                    label={formatMessage({ id: "shoes" })}
                    minValue={0}
                    maxValue={
                      reservationFormMethods.watch("playerCount") ||
                      maxPlayerCount
                    }
                    disabled={!reservationFormMethods.watch("isPlayers")}
                    decrementButtonLabel={formatMessage({ id: "remove_shoe" })}
                    incrementButtonLabel={formatMessage({ id: "add_shoe" })}
                    describedBy="shoeCountDescription"
                  >
                    <p id="shoeCountDescription" className="sr-only">
                      {formatMessage({ id: "current_shoe_count" })}:{" "}
                      {reservationFormMethods.watch("shoeCount")}{" "}
                      {formatMessage({ id: "out_of" })}{" "}
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
                      label={`${formatMessage({ id: "player" })} ${playerIndex}`}
                      disabled={!reservationFormMethods.watch("isPlayers")}
                      vertical
                      fieldArray
                    />
                  );
                })}
              </div>
            </div>
          </Dropdown>

          <Button type="submit">
            <FormattedMessage id="make_reservation" />
          </Button>
        </div>
      </form>
    </FormContext>
  );
};

export { ReservationForm };
