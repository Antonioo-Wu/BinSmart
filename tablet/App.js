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

const Tab = createBottomTabNavigator();
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
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Scan') {
              iconName = focused ? 'recycle' : 'recycle';
            } else if (route.name === 'Metrics') {
              iconName = focused ? 'chart-column' : 'chart-column';
            } else if (route.name === 'History') {
              iconName = focused ? 'clock-four' : 'clock-four';
            }

            return <FontAwesome6 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#37b859',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          headerTitle: 'BinSmart',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="Scan" 
          component={ScanStackScreen}
        />
        <Tab.Screen 
          name="Metrics" 
          component={MetricsScreen}
        />
        <Tab.Screen 
          name="History" 
          component={HistoryScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}