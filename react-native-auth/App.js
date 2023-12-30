import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
      if (token) {
        setLogged(true);
      } else {
        setLogged(false);
      }
  }

  useEffect(() => {
    detectLogin()
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none"
      screenOptions={{
        headerShown: false
      }}
      >
          <Stack.Screen name="loading" component={LoadingScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="signup" component={SignupScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
