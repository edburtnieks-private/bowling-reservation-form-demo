import React, { FC } from "react";
import { useForm, FormContext } from "react-hook-form";

import { TextInput } from "../../shared-components/Inputs/TextInput";
import { IncrementInput } from "../../shared-components/Inputs/IncrementInput";

import styles from "./styles.module.scss";

import { reservationSchema } from "./schema";

type ReservationFormProps = {
  minLaneCount?: number;
  maxLaneCount?: number;
};

type ReservationFormData = {
  laneCount: number;
  name: string;
  phone: string;
};

const ReservationForm: FC<ReservationFormProps> = ({
  minLaneCount = 1,
  maxLaneCount = 10
}) => {
  const defaultValues: ReservationFormData = {
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
          <div className={styles.field}>
            <IncrementInput
              name="laneCount"
              id="lane-count"
              label="Lane count"
              minValue={minLaneCount}
              maxValue={maxLaneCount}
              decrementButtonLabel="Remove lane"
              incrementButtonLabel="Add lane"
            />
          </div>

          <div className={styles.field}>
            <TextInput name="name" id="name" label="Name" />
          </div>

          <div className={styles.field}>
            <TextInput name="phone" id="phone" label="Phone" type="tel" />
          </div>
        </div>

        {/* Temporary */}
        <button>Make reservation</button>
      </form>
    </FormContext>
  );
};

export { ReservationForm };
