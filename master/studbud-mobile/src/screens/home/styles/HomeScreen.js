import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    height: 300,
    justifyContent: 'center',
    //backgroundColor: '$lightBlue'
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContainer: {
    flex: 0.6,
    marginBottom: 5,
  }
});

export default styles;
