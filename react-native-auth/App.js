import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  HomeScreen  from './screens/HomeScreen';
import  SignupScreen  from './screens/SignupScreen';
import  LoginScreen  from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer
    >
      <Stack.Navigator
        headerMode="none"
      >
        {/* <Stack.Screen name="home" component={HomeScreen} /> */}
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}