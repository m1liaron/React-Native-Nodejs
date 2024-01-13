import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AppRegistry} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

import { AuthProvider } from './AuthContext';
import TodoListScreen from './screens/TodoListScreen';

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
          <Stack.Screen name="register" component={SignupScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="forgot-password" component={ForgotPasswordScreen} />
          <Stack.Screen name="reset-password" component={ResetPasswordScreen} />
          <Stack.Screen name="todo" component={TodoListScreen} />
      </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}


AppRegistry.registerComponent('Appname', () => App);