import React, { FC } from "react";
import classNames from "classnames";
import { useFormContext, ErrorMessage } from "react-hook-form";
import { useIntl } from "react-intl";

import { Error } from "../../../shared-components/Error";
import { getLanes } from "../utils";

import styles from "./styles.module.scss";

type LaneRadioProps = {
  lane: number;

  disabled?: boolean;
};

type LaneSelectProps = {
  label: string;
  totalLaneCount: number;
};

const LaneRadio: FC<LaneRadioProps> = ({ lane, disabled }) => {
  const { register } = useFormContext();
  const { formatMessage } = useIntl();

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
        aria-label={`${formatMessage({ id: "lane" })} ${lane}`}
      >
        {lane}
      </label>
    </>
  );
};

const LaneSelect: FC<LaneSelectProps> = ({ label, totalLaneCount }) => {
  return (
    <>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{label}</legend>

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
