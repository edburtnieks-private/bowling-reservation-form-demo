import React, { useState } from "react";

import "./styles.scss";
import { ReservationForm } from "./components/ReservationForm";

const App = () => {
  const [reservationData, setReservationData] = useState<Object>({});

  return (
    <>
      <ReservationForm
        startHour={11}
        endHour={24}
        minDuration={1}
        maxDuration={4}
        minLaneCount={1}
        maxLaneCount={1}
        totalLaneCount={10}
        minPlayerCount={1}
        maxPlayerCount={6}
        handleSubmit={setReservationData}
      />

      <div className="result-wrapper">
        <h2>JSON result</h2>
        <pre>
          <code>{JSON.stringify(reservationData, null, 2)}</code>
        </pre>
      </div>
    </>
  );
};

export { App };
