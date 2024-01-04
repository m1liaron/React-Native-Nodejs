import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { Link } from '@react-navigation/native';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// Google Signup Import
import {
  GoogleOneTapSignIn,
  statusCodes,
  OneTapUser,
} from '@react-native-google-signin/google-signin';

export default function SignupScreen(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const sendCred= async (props)=>{
      fetch("http://10.0.2.2:3000/signup",{
        method:"POST",
        headers: {
         'Content-Type': 'application/json'
       },
       body:JSON.stringify({
         "email":email,
         "password":password
       })
      })
      .then(res=>res.json())
      .then(async (data)=>{
             try {
               await AsyncStorage.setItem('token',data.token)
               props.navigation.replace("home")
             } catch (e) {
               console.log("error hai",e)
             }
      })
   }

  return (
  <SafeAreaView style={styles.container}>
        <Text style={{fontSize:30}}>Create New Account</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => sendCred(props)}
        >
          Register
        </Button>
        <TouchableOpacity>
          <Text
            onPress={() => props.navigation.replace("login")}
          >
            Already have an account?
          </Text>
          <Link to="/auth/google">
            Google Registration
          </Link>
        </TouchableOpacity>
        <StatusBar style="auto" />
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
