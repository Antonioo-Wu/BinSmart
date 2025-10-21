import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importamos nuestras pantallas
import { HomeScreen } from './src/screens/HomeScreen';
import { GuestScreen } from './src/screens/GuestScreen';
import { UserScreen } from './src/screens/UserScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3498db',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'BinSmart' }}
        />
        <Stack.Screen 
          name="Guest" 
          component={GuestScreen} 
          options={{ title: 'Invitado' }}
        />
        <Stack.Screen 
          name="User" 
          component={UserScreen} 
          options={{ title: 'Usuario Registrado' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}