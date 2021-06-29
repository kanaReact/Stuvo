import React from 'react';
import { View, LogBox } from 'react-native'
import Navigation from './src/Navigation/Navigation'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import store from './src/Redux/Store'
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const persistStore = store()
class App extends React.Component {
  render() {
    return (
      <Provider store={persistStore.store}>
        <PersistGate loading={null} persistor={persistStore.persistor}>
          <Navigation />
        </PersistGate>
      </Provider>

    );
  }
}
export default App
