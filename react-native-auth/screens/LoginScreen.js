import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';

import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendCred = async (props)=>{
    fetch("http://10.0.2.2:3000/login",{
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
            //  await AsyncStorage.setItem('token',data.token)
             props.navigation.replace("todo")
           } catch (e) {
             console.log("error hai",e)
              Alert(e)
           }
    })
  }

  return (
      <SafeAreaView SafeAreaView style={styles.container}>
        <Text style={{fontSize:30}}>Login</Text>
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
          Login
        </Button>
        <TouchableOpacity>
           <Text
            onPress={() => props.navigation.replace("register")}
           >
            Don't have an account?
           </Text>
        </TouchableOpacity>
        <TouchableOpacity>
           <Text
            onPress={() => props.navigation.replace("forgot-password")}
           >
            Forgot Password ?
           </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
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
