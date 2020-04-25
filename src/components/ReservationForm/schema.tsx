import { object, date, number, string, array, bool } from "yup";

const reservationSchema = object().shape({
  date: date()
    .min(new Date(), "date_min")
    .max(new Date(new Date().getFullYear(), 11, 31), "date_max")
    .required("date_required"),
  startTime: number()
    .truncate()
    .min(11, "start_time_min")
    .max(23, "start_time_max")
    .required("start_time_required"),
  duration: number()
    .truncate()
    .min(1, "duration_min")
    .max(4, "duration_max")
    .required("duration_required"),
  laneCount: number()
    .truncate()
    .min(1, "lane_count_min")
    .max(1, "lane_count_max")
    .required("lane_count_required"),
  name: string()
    .required("name_required"),
  phoneNumber: string()
    .required("phone_number_required"),
  lane: number()
    .truncate()
    .min(1, "lane_number_min")
    .max(10, "lane_number_max")
    .required("lane_number_required"),
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
