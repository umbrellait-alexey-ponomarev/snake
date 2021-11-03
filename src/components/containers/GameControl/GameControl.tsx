import React, { useCallback, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import {
  changeDirection,
  move,
  setSpeed,
  startGame,
  setPause,
} from '../../../redux/snakeSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { styles } from './style';

const GameControl = () => {
  const { direction, isCrashed, isStarted, isPaused, speed, history } =
    useAppSelector(state => state.snake);
  const dispatch = useAppDispatch();

  const startHandler = () => {
    dispatch(startGame());
  };

  const moveHandler = useCallback(() => {
    setTimeout(() => {
      dispatch(move());
    }, speed);
  }, [dispatch, speed]);

  const stopHandler = () => {
    dispatch(setPause());
  };

  const onTopPressHandler = () => {
    dispatch(changeDirection('top'));
  };

  const onLeftPressHandler = () => {
    dispatch(changeDirection('left'));
  };

  const onBottomPressHandler = () => {
    dispatch(changeDirection('bottom'));
  };

  const onRightPressHandler = () => {
    dispatch(changeDirection('right'));
  };

  useEffect(() => {
    if (isCrashed) {
      dispatch(setPause());
    }

    if (history.length !== 3 && history.length % 3 === 0) {
      dispatch(setSpeed());
    }

    return () => {
      if (isCrashed) {
        dispatch(setPause());
      }
    };
  }, [dispatch, isCrashed, history.length]);

  useEffect(() => {
    if (isStarted && !isPaused) {
      moveHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, isStarted, isPaused]);

  return (
    <View style={styles.container}>
      <View style={styles.options}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={startHandler}
          disabled={isStarted}>
          <Text>start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => dispatch(setSpeed())}>
          <Text>speed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pauseButton}
          onPress={stopHandler}
          disabled={!isStarted}>
          <Text>pause</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.padsContainer}>
        <TouchableOpacity
          style={styles.pad}
          onPress={onTopPressHandler}
          disabled={direction === 'bottom' || isPaused}>
          <Text>&uarr;</Text>
        </TouchableOpacity>

        <View style={styles.XPadsWrapper}>
          <TouchableOpacity
            style={styles.pad}
            onPress={onLeftPressHandler}
            disabled={direction === 'right' || isPaused}>
            <Text>&larr;</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pad}
            onPress={onRightPressHandler}
            disabled={direction === 'left' || isPaused}>
            <Text>&rarr;</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.pad}
          onPress={onBottomPressHandler}
          disabled={direction === 'top' || isPaused}>
          <Text>&darr;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GameControl;
