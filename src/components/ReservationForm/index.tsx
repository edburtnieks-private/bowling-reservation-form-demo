import React from "react";
import { useForm, FormContext } from "react-hook-form";

import { TextInput } from "../../shared-components/Inputs/TextInput";
import styles from "./styles.module.scss";

import { reservationSchema } from "./schema";

type ReservationFormData = {
  name: string;
  phone: string;
};

const ReservationForm = () => {
  const defaultValues: ReservationFormData = {
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
