import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import OptionsScreen from '../screens/OptionsScreen';
import LoginScreen from '../screens/LoginScreen';
import CameraScreen from '../screens/CameraScreen';
import ScanResultScreen from '../screens/ScanResultScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="Options" 
        component={OptionsScreen}
        options={{
          title: 'Opciones',
          headerBackTitle: 'Atrás'
        }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          title: 'Iniciar Sesión',
          headerBackTitle: 'Atrás'
        }}
      />
      <Stack.Screen 
        name="Guest" 
        component={CameraScreen}
        options={{
          title: 'Escanear Residuo',
          headerBackTitle: 'Atrás'
        }}
      />
      <Stack.Screen 
        name="ScanResult" 
        component={ScanResultScreen}
        options={{
          title: 'Resultado',
          headerBackTitle: 'Atrás'
        }}
      />
    </Stack.Navigator>
  );
}