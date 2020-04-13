import { object, string } from "yup";

const reservationSchema = object().shape({
  name: string().required("Name is required"),
  phone: string().required("Phone is required")
});

export { reservationSchema };
