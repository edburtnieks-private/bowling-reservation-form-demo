import { object, date, number, string, array, bool, ref } from "yup";

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
  playerCount: number()
    .truncate()
    .min(1, "Minimum player count is 1")
    .max(6, "Maximum player count is 6"),
  isShoes: bool(),
  shoeCount: number()
    .truncate()
    .min(1, "Minimum shoe count is 1")
    .max(ref("playerCount"), "Shoe count can't be more than player count"),
  players: array(string()).max(6)
});

export { reservationSchema };
