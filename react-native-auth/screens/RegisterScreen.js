import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  Alert, 
  Image, 
  Platform  
} from 'react-native';

// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin'
// import AsyncStorage from '@react-native-async-storage/async-storage';

import {GOOGLE_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID} from "@env"

export default function RegisterScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();
  const [gEmail, setgEmail] = useState('');

  // const configureGoogleSignin = () => {
  //   GoogleSignin.configure({
  //     // webClientId: GOOGLE_CLIENT_ID,
  //     androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  //     // iosClientId: GOOGLE_IOS_CLIENT_ID,
  //     // forceCodeForRefreshToken: true,
  //     // offlineAccess: true,
  //   });
  // }

  // useEffect(() => {
  //     configureGoogleSignin();
  // }, []);

  // const sendGoogleSignup = async (googleEmail) => {
  //   console.log("Start google-signup");
  //   try {
  //     const response = await fetch('http://10.0.2.2:3000/google-signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(userInfo), // Ensure correct formatting here
  //     });
  
  //     const data = await response.json();
      
  //     if (response.ok) {
  //       console.log(`Success here your user ${data.googleEmail}`);
  //       setgEmail(data.googleEmail);
  //       props.navigation.replace('todo');
  //     } else {
  //       console.error('Error in Google Sign-Up:', data.error || response.status);
  //     }
  //   } catch (error) {
  //     console.log("ERROR");
  //     console.error('Error in Google Sign-Up:', error);
  //   }
  // };

  // const signIn = async () => {
  //   console.log("Google authentication")
  //     try {
  //       console.log("Success Authentication")
  //       await GoogleSignin.hasPlayServices();
  //       const userInfo = await GoogleSignin.signIn();
  //       setUserInfo(userInfo);
  //       setError();
  //       // sendGoogleSignup(userInfo.user.email);
  //       console.log(userInfo.user)
  //       console.log(`User email is ${userInfo.user.email}`) 
  //     } catch (error) {
  //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //         // user cancelled the login flow
  //         console.log('cancelled the login flow')
  //       } else if (error.code === statusCodes.IN_PROGRESS) {
  //         // operation (e.g. sign in) is in progress already
  //         console.log('operation (e.g. sign in) is in progress already')
  //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //         // play services not available or outdated
  //         console.log('play services not available or outdated')
  //       } else {
  //         console.error('Unexpected error in Google Sign-In:', error);
  //       }
  //     }
  // };


  const logout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  }

  const sendCred = async (props) => {
    console.log('Before fetch');
    try {
      const response = await fetch('http://10.0.2.2:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      
      const data = await response.json();
  
      if (response.ok) {
        console.log('After fetch', data);
        alert("Register Succesful")
        // Handle the response data accordingly
        // await AsyncStorage.setItem('token', data.token);
        props.navigation.replace('home');
      } else {
        console.error('Error in signup:', data.error || response.status);
      }
    } catch (error) {
      console.error('Error in signup:', error);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 30 }}>Create New Account</Text>
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
      <Button mode="contained" style={styles.button} onPress={() => sendCred(props)}>
        Register
      </Button>
      <TouchableOpacity onPress={() => props.navigation.replace('login')}>
        <Text>Already have an account?</Text>
      </TouchableOpacity>
      
      <Text>{JSON.stringify(error)}</Text>
      {/* {userInfo ? (
       <View>
          <Button mode="contained" style={styles.button} onPress={logout}>
            Logout
          </Button>
          <Image
            style={styles.profileImage}
            source={{ uri: userInfo.user.photo }}
          /> 
          <Text>{userInfo.user.givenName}</Text>
          <Text>{userInfo.user.familyName}</Text>
          <Text>{gEmail}</Text>
      </View>
      ) : (
        <View>
          {Platform.OS === 'web' ? (
            <Button mode="contained" style={styles.button} onPress={signIn}>
              Login with Google (Web)
            </Button>
          ) : (
            <Button mode="contained" style={styles.button} onPress={signIn}>
              Login with Google (Android)
            </Button>
          )}
        </View>
      )} */}
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
    width: '95%',
    borderColor: 'blue',
    borderWidth: 1,
    margin: 12,
    padding: 10,
    color: 'blue',
  },
  button: {
    width: '95%',
    margin: 18,
  },
  profileImage: {
    width: 100, 
    height: 100, 
    borderRadius: 50,
    marginTop: 10
  }
});
