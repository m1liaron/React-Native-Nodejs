import { GOOGLE_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID} from '@env'
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
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
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-community/async-storage';

WebBrowser.maybeCompleteAuthSession();

export default function SignupScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promtAsync] = Google.useAuthRequest({
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    webClientId: GOOGLE_CLIENT_ID
  })

  useEffect(() => {
    handleSignInWithGoogle();
  }, [])

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if(!user ){
      if(response?.type === "success"){
        await getUserInfo(response.authentication.accessToken)
      }
    } else {
      setUserInfo(JSON.parse(user))
    }
  }

  const getUserInfo = async (token) => {
    if(!token) return;
    try{
      const respone = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: "Bearer " + token }
        }
      );
      const user = await respone.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch(error){

    }
  }

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
        </TouchableOpacity>
            <TouchableOpacity>
              <Text>Google Registration</Text>
        </TouchableOpacity>
        {/* {JSON.stringify(userInfo)} */}

        <Button title="Sign in with Google" onPress={promtAsync}/>
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
