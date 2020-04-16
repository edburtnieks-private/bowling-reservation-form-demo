import { object, date, number, string } from "yup";

const reservationSchema = object().shape({
  date: date()
    .min(new Date(), "Provide date from today")
    .max(
      new Date(new Date().getFullYear(), 11, 31),
      "Can't make reservation for next year"
    )
    .required("Provide date"),
  startTime: number()
    .truncate()
    .min(11, "We start working at 11:00")
    .max(23, "We work till 23:00")
    .required("Provide strart time"),
  duration: number()
    .truncate()
    .min(1, "Minimum duration time is 1h")
    .max(4, "Maximum duration time is 4h")
    .required("Provide duration"),
  laneCount: number()
    .truncate()
    .min(1, "Minimum lane count is 1")
    .max(10, "Maximum lane count is 10")
    .required("Provide lane count"),
  name: string().required("Provide name"),
  phone: string().required("Provide phone")
});

export { reservationSchema };
