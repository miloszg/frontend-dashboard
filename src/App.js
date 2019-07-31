import React, { useState } from 'react';

import './App.css';
import './bootstrap.css';
import Dashboard from './components/dashboard/DashboardApp';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import messages_de from './translations/de.json';
import messages_en from './translations/en.json';
import messages_pl from './translations/pl.json';
import locale_en from 'react-intl/locale-data/en';
import locale_de from 'react-intl/locale-data/de';
import locale_pl from 'react-intl/locale-data/pl';

addLocaleData([...locale_en, ...locale_de, ...locale_pl]);

const localMessages = {
  de: messages_de,
  en: messages_en,
  pl: messages_pl
};

function App() {
  const [locale, changeLocale] = useState('en');

  return (
    <IntlProvider locale={locale} messages={localMessages[locale]}>
      <>     
        <div className="App">
          <Dashboard locale ={locale}/>
          <div className="bg-dark footer">
            <button onClick={() => changeLocale('en')}>US</button>
            <button onClick={() => changeLocale('de')}>DE</button>
            <button onClick={() => changeLocale('pl')}>PL</button>
          </div>
        </div>
      </>
    </IntlProvider>
  );
}

export default injectIntl(App);
