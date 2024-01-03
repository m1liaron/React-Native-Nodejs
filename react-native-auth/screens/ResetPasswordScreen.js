import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Button, TextInput } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

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
    const [password, setPassword] = useState("");

    const hadleResetPassword = async (props)=>{
        fetch("http://10.0.2.2:3000/reset-password",{
          method:"POST",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           
         })
        })
        .then(res=>res.json())
        .then(async (data)=>{
               try {
                 console.log(data)
                 props.navigation.replace("home")
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
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => hadleResetPassword(props)}
        >
          Reset Password
        </Button>
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