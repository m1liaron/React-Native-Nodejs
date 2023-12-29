import { StatusBar } from 'expo-status-bar';
import { 
  ActivityIndicator,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { Button } from 'react-native-paper';

export default function LoadingScreen() {
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
