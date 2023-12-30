import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { 
  ActivityIndicator,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { Button } from 'react-native-paper';

export default function LoadingScreen(props) {

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
      if (token) {
        props.navigation.replace("home")
      } else {
        props.navigation.replace("login")
      }
  }

  useEffect(() => {
    detectLogin()
  }, [])

  return (
        <ActivityIndicator size="large" color="blue"/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
