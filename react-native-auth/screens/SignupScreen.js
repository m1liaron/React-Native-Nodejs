import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
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

export default function SignupScreen(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
  <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView behavior='position'>
        <Text>Hello world!</Text>
        <Text style={{fontSize:30}}>Create New Account</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
        //   onChange={setEmail}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Email"
          value={password}
        //   onChange={setPassword}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <Button
          mode='contained'
          style={styles.button}
        >
          Register
        </Button>
        <TouchableOpacity>
          <Text
            onPress={() => props.navigation.navigate("login")}
          >
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
