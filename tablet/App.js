import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome6 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

// Importamos nuestras pantallas
import { ScanScreen } from './src/screens/tabs/ScanScreen';
import { ScanResultScreen } from './src/screens/tabs/ScanResultScreen';
import { MetricsScreen } from './src/screens/tabs/MetricsScreen';
import { HistoryScreen } from './src/screens/tabs/HistoryScreen';
import { GuestScreen } from './src/screens/GuestScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { UserScreen } from './src/screens/UserScreen';
import { QRCodeScreen } from './src/screens/QRCodeScreen';

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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="MainApp" 
          options={({ navigation }) => ({
            title: 'BinSmart',
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileMenu')}
                style={{ marginRight: 15 }}
              >
                <FontAwesome6 name="user-circle" size={24} color="#37b859" />
              </TouchableOpacity>
            ),
          })}
        >
          {() => (
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
                headerShown: false,
              })}
            >
              <Tab.Screen name="Scan" component={ScanStackScreen} />
              <Tab.Screen name="Metrics" component={MetricsScreen} />
              <Tab.Screen name="History" component={HistoryScreen} />
            </Tab.Navigator>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="ProfileMenu"
          component={HomeScreen}
          options={{
            title: 'Profile Menu',
            headerTintColor: '#37b859',
          }}
        />
        <Stack.Screen
          name="Guest"
          component={GuestScreen}
          options={{
            title: 'Guest Mode',
            headerTintColor: '#37b859',
          }}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{
            title: 'User Mode',
            headerTintColor: '#37b859',
          }}
        />
        <Stack.Screen
          name="QRScanner"
          component={QRCodeScreen}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}