import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
});