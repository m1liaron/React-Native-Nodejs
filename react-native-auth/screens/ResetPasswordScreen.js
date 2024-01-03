import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, TextInput } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useAuth, AuthContext } from '../AuthContext';
import AsyncStorage from '@react-native-community/async-storage';

import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert
  } from 'react-native';
import { useState } from 'react';

const ResetPasswordScreen = (props) => {
    const { forgotEmail } = useAuth()
    const [password, setPassword] = useState("");
    const [verifyCode, setVerifyCode] = useState("");

    const handleResetPassword = async(props)=>{
        fetch("http://10.0.2.2:3000/reset-password",{
          method:"POST",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           email: forgotEmail,
           password: password,
           verificationCode: verifyCode
         })
        })
        .then(res=>res.json())
        .then(async (data)=>{
               try {
                  await AsyncStorage.setItem('token',data.token)
                  props.navigation.replace("home")
                  setPassword("")
               } catch (e) {
                 console.log("error hai",e)
                  Alert(e)
               }
        })
    }

  return (
    <SafeAreaView SafeAreaView style={styles.container}>
        <Text style={{fontSize:30}}>Reset Password</Text>
        <TextInput
          placeholder="Verification Code"
          style={styles.input}
          value={verifyCode}
          onChangeText={(text) => setVerifyCode(text)}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => handleResetPassword(props)}
        >
          Reset Password
        </Button>
        <TouchableOpacity>
           <Text
            onPress={() => props.navigation.replace("login")}
           >
            Back to Login
           </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </SafeAreaView>
  )
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
export default ResetPasswordScreen