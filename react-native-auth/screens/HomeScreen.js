import AsyncStorage from '@react-native-community/async-storage';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';

export default function HomeScreen(props) {

  const logout = async () => {
    await AsyncStorage.removeItem("token")
      .then(() => {
        props.navigation.navigate("login")
      })
  }

  return (
      <SafeAreaView style={styles.container}>
            <Text>your email is niga</Text>
            <Button
              mode="contained"
              onPress={() => logout()}
            >
              logout
            </Button>
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
