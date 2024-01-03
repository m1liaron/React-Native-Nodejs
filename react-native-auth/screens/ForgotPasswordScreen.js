import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { AuthContext, useAuth } from '../AuthContext';


import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert
  } from 'react-native';

const ForgotPasswordScreen = (props) => {
    const { setForgotEmail } = useAuth()
    const [email, setEmail] = useState("");

    const sendCred = async (props)=>{
        fetch("http://10.0.2.2:3000/forgot-password",{
          method:"POST",
          headers: {
           'Content-Type': 'application/json'
         },
         body:JSON.stringify({
           "email":email
         })
        })
        .then(res=>res.json())
        .then(async (data)=>{
               try {
                  setForgotEmail(email);
                  props.navigation.replace("reset-password")
               } catch (e) {
                 console.log("error hai",e)
                  Alert(e)
               }
        })
    }

  return (
    <SafeAreaView SafeAreaView style={styles.container}>
        <Text style={{fontSize:30}}>Forgot Password</Text>
        <Text style={{fontSize:15}}>Enter you password below to reset your password.</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => sendCred(props)}
        >
          Send Email
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
export default ForgotPasswordScreen