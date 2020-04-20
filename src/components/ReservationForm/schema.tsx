import { object, date, number, string, array, bool } from "yup";

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
    .min(11, "First reservation available at 11.00")
    .max(23, "Last reservation available at 23:00")
    .required("Provide strart time"),
  duration: number()
    .truncate()
    .min(1, "Minimum duration time is 1h")
    .max(4, "Maximum duration time is 4h")
    .required("Provide duration"),
  laneCount: number()
    .truncate()
    .min(1, "Minimum lane count is 1")
    .max(1, "Maximum lane count is 1")
    .required("Provide lane count"),
  name: string().required("Provide name"),
  phone: string().required("Provide phone"),
  lane: number()
    .truncate()
    .min(1, "Choose lane number between 1 and 10")
    .max(10, "Choose lane number between 1 and 10")
    .required("Provide lane number"),
  isPlayers: bool()
    .notRequired()
    .nullable()
    .default(false),
  playerCount: number()
    .truncate()
    .notRequired()
    .nullable()
    .default(1),
  shoeCount: number()
    .truncate()
    .notRequired()
    .nullable()
    .default(1),
  players: array(string())
    .notRequired()
    .nullable()
});

export { reservationSchema };
