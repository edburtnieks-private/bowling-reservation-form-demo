import React, { useState } from "react";
import { IntlProvider, FormattedMessage } from "react-intl";

import { ReservationForm } from "./components/ReservationForm";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { Links } from "./components/Links";

import en from "./translations/en.json";
import lv from "./translations/lv.json";

import "./styles.scss";

const defaultLocale = "en";
const messages = {
  en,
  lv
};

const App = () => {
  const [reservationData, setReservationData] = useState<Object>({});
  const [locale, setLocale] = useState<string>(defaultLocale);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <header className="header">
        <LanguageSwitcher setLocale={setLocale} />
      </header>

      <main className="main">
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

        <div className="result">
          <h2>
            <FormattedMessage id="json_result" />
          </h2>

          <pre>
            <code>{JSON.stringify(reservationData, null, 2)}</code>
          </pre>
        </div>
      </main>

      <footer className="footer">
        <Links />
      </footer>
    </IntlProvider>
  );
};

export { App };
