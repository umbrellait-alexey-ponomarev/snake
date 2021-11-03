import React from 'react';
import { View } from 'react-native';
import { useAppSelector } from '../../../redux/store';
import { styles } from './style';

const GameField = () => {
  const { field } = useAppSelector(state => state.snake);

  return (
    <View style={styles.container}>
      <View>
        {field.map((item, i) => {
          return (
            <View style={styles.row} key={i}>
              {item.map((use, index) => (
                <View
                  style={[
                    styles.cell,
                    // eslint-disable-next-line react-native/no-inline-styles
                    { backgroundColor: use ? 'green' : 'white' },
                  ]}
                  key={index}
                />
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default GameField;
