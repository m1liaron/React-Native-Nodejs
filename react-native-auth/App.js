import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { Button } from 'react-native-paper';

export default function App() {
  return (
  <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView behavior='position'>
        <Text>Hello world!</Text>
        <Text style={{fontSize:30}}>Create New Account</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
        />
        <Button
          mode='contained'
          style={styles.button}
        >
          Register
        </Button>
        <TouchableOpacity>
          <Text>
            Already have an account?
          </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
    </KeyboardAvoidingView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: "95%", 
    borderColor: 'blue', 
    borderWidth: 1,  
    margin: 12,
    padding: 10,
    color: 'blue'
  },
  button:{
    width:"95%",
    margin:18
  }
});
