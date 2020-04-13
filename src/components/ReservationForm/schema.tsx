import { object, number, string } from "yup";

const reservationSchema = object().shape({
  laneCount: number()
    .truncate()
    .min(1, "Minimum lane count is 1")
    .max(10, "Maximum lane count is 10")
    .required("Lane count is required"),
  name: string().required("Name is required"),
  phone: string().required("Phone is required")
});

export { reservationSchema };
