import React from "react";
import { render } from "react-dom";
import { IntlProvider } from "react-intl";

import en from "./translations/en.json";
import lv from "./translations/lv.json";

import { App } from "./App";

const messages = {
  en,
  lv
};

const locale = "lv";

const rootElement = document.getElementById("root");
render(
  <IntlProvider locale={locale} messages={messages[locale]}>
    <App />
  </IntlProvider>,
  rootElement
);
