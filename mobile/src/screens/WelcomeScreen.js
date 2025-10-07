import { View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles/WelcomeScreen.styles';

export default function WelcomeScreen({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Options')}>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido a BinSmart</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}