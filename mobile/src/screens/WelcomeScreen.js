import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/WelcomeScreen.styles';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Bienvenido a BinSmart</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Options')} style={styles.button}>
          <Text style={styles.buttonText}>Empezar!</Text>
        </TouchableOpacity>
      </View>
  );
}