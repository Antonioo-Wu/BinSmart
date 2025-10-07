import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/OptionsScreen.styles';

export default function OptionsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.guestButton]}
        onPress={() => navigation.navigate('Guest')}
      >
        <Text style={styles.buttonText}>Invitado</Text>
      </TouchableOpacity>
    </View>
  );
}