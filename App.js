import React from 'react';
import Home from './src/Home';
import store, {peristedStore} from './src/Redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={peristedStore} loading={null}>
        <Home />
      </PersistGate>
    </Provider>
  );
}
