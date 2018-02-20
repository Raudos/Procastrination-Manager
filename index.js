import React from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import i18n from "src/config/i18n";
import { createStore as Store } from "src/redux/store";
import Router from "src/router/index";

const App = props => (
  <Provider store={Store}>
    <I18nextProvider i18n={i18n}>
      <Router />
    </I18nextProvider>
  </Provider>
);

AppRegistry.registerComponent('timemanager', () => App);
