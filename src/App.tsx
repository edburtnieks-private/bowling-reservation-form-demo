import React from "react";

import "./styles.scss";
import { ReservationForm } from "./components/ReservationForm";

const App = () => (
  <ReservationForm
    minLaneCount={1}
    maxLaneCount={10}
    startHour={11}
    endHour={24}
  />
);

export { App };
