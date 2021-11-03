import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { GameScreen } from 'commonapp/screens/game';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <GameScreen />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
