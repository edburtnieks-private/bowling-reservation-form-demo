import React, { FC } from "react";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "react-hook-form";

import { Error } from "../../../shared-components/Error";
import { getLanes } from "../utils";

import styles from "./styles.module.scss";

type LaneRadioProps = {
  lane: number;

  disabled?: boolean;
};

type LaneSelectProps = {
  totalLaneCount: number;
};

const LaneRadio: FC<LaneRadioProps> = ({ lane, disabled }) => {
  const { register } = useFormContext();

  return (
    <>
      <input
        className={classNames("sr-only", styles.radio)}
        type="radio"
        name="lane"
        id={`lane-${lane}`}
        value={lane}
        disabled={disabled}
        ref={register}
      />
      <label
        htmlFor={`lane-${lane}`}
        className={styles.radioLabel}
        aria-label={`Lane ${lane}`}
      >
        {lane}
      </label>
    </>
  );
};

const LaneSelect: FC<LaneSelectProps> = ({ totalLaneCount }) => {
  return (
    <>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Lane</legend>

        <div className={styles.wrapper}>
          {getLanes(totalLaneCount).map(lane => (
            <LaneRadio key={lane} lane={lane} />
          ))}
        </div>
      </fieldset>

      <ErrorMessage
        name="lane"
        children={({ message }) => <Error message={message} />}
      />
    </>
  );
};

export { LaneSelect };
