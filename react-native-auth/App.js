import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AppRegistry} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

import { AuthProvider } from './AuthContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none"
          screenOptions={{
            headerShown: false
          }}
        >
          {/* <Stack.Screen name="loading" component={LoadingScreen} /> */}
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="signup" component={SignupScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="forgot-password" component={ForgotPasswordScreen} />
          <Stack.Screen name="reset-password" component={ResetPasswordScreen} />
      </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}


AppRegistry.registerComponent('Appname', () => App);