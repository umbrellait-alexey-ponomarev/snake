import React from 'react';
import { Button, View } from 'react-native';

import { GameField } from '../../components/containers/GameField';
import { GameControl } from '../../components/containers/GameControl';
import { styles } from './styles';
import { useAppDispatch, useAppSelector } from 'commonapp/redux/store';
import { resetGame } from 'commonapp/redux/snakeSlice';

export const GameScreen = () => {
  const { isCrashed } = useAppSelector(state => state.snake);
  const dispatch = useAppDispatch();

  const restartHandler = () => {
    dispatch(resetGame());
  };

  return (
    <View style={styles.container}>
      {isCrashed ? (
        <Button title="Restart" onPress={restartHandler} />
      ) : (
        <>
          <GameField />
          <GameControl />
        </>
      )}
    </View>
  );
};
