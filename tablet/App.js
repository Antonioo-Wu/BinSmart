import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome6 } from '@expo/vector-icons';

// Importamos nuestras pantallas
import { ScanScreen } from './src/screens/tabs/ScanScreen';
import { ScanResultScreen } from './src/screens/tabs/ScanResultScreen';
import { MetricsScreen } from './src/screens/tabs/MetricsScreen';
import { HistoryScreen } from './src/screens/tabs/HistoryScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { QRCodeScreen } from './src/screens/QRCodeScreen';
import { UserProvider } from './src/context/UserContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ScanStack = createNativeStackNavigator();

function ScanStackScreen() {
  return (
    <ScanStack.Navigator>
      <ScanStack.Screen 
        name="ScanMain" 
        component={ScanScreen}
        options={{ headerShown: false }}
      />
      <ScanStack.Screen 
        name="ScanResult" 
        component={ScanResultScreen}
        options={{ headerShown: false }}
      />
    </ScanStack.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{
            title: 'BinSmart',
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="QRScanner"
          component={QRCodeScreen}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen 
          name="MainApp" 
          options={{
            title: 'BinSmart',
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => null, 
          }}
        >
          {() => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'Escanear') {
                    iconName = focused ? 'recycle' : 'recycle';
                  } else if (route.name === 'Métricas') {
                    iconName = focused ? 'chart-column' : 'chart-column';
                  } else if (route.name === 'Historial') {
                    iconName = focused ? 'clock-four' : 'clock-four';
                  }
                  return <FontAwesome6 name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#37b859',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
              })}
            >
              <Tab.Screen name="Escanear" component={ScanStackScreen} />
              <Tab.Screen name="Métricas" component={MetricsScreen} />
              <Tab.Screen name="Historial" component={HistoryScreen} />
            </Tab.Navigator>
          )}
        </Stack.Screen>

        {/* Pantalla de escaneo simple para invitados */}
        <Stack.Screen
          name="GuestScan"
          component={ScanScreen}
          options={{
            title: 'Escanear - Modo Invitado',
            headerTintColor: '#37b859',
          }}
        />

        {/* Pantalla de resultado para invitados */}
        <Stack.Screen 
          name="GuestScanResult" 
          component={ScanResultScreen}
          options={{ 
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}