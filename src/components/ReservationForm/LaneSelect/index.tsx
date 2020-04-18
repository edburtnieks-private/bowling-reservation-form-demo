import React, { FC } from "react";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";

import { getLanes } from "../utils";

import styles from "./styles.module.scss";

type LaneCheckboxProps = {
  lane: number;
};

type LaneSelectProps = {
  totalLaneCount: number;
};

const LaneCheckbox: FC<LaneCheckboxProps> = ({ lane }) => {
  const { register } = useFormContext();

  return (
    <>
      <input
        className={classNames("sr-only", styles.checkbox)}
        type="checkbox"
        name="lanes"
        id={`lane-${lane}`}
        value={lane}
        ref={register}
      />
      <label
        htmlFor={`lane-${lane}`}
        className={styles.checkboxLabel}
        aria-label={`Lane ${lane}`}
      >
        {lane}
      </label>
    </>
  );
};

const LaneSelect: FC<LaneSelectProps> = ({ totalLaneCount }) => {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Lanes</legend>

      <div className={styles.wrapper}>
        {getLanes(totalLaneCount).map(lane => (
          <LaneCheckbox key={lane} lane={lane} />
        ))}
      </div>
    </fieldset>
  );
};

export { LaneSelect };
