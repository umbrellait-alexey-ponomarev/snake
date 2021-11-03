import { StyleSheet } from 'react-native';
import { white } from '../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  options: {
    width: '100%',
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  startButton: {
    padding: 5,
    alignSelf: 'flex-start',
  },
  pauseButton: {
    padding: 5,
    alignSelf: 'flex-end',
  },
  padsContainer: {
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  XPadsWrapper: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  pad: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: white,
    borderRadius: 5,
  },
});
