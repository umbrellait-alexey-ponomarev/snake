import { StyleSheet } from 'react-native';
import { white } from '../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
  },
  cell: {
    backgroundColor: white,
    width: 11,
    height: 11,
    borderRadius: 4,
  },
});
