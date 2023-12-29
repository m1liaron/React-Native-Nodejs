import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';

export default function HomeScreen() {
  return (
      <SafeAreaView style={styles.container}>
            <Text>your email is </Text>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
