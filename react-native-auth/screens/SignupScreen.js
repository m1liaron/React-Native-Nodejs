import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, Image } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';


import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-google-signin/google-signin'

export default function SignupScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();

  const configureGoogleSignin = () => {
    GoogleSignin.configure({
      androidClientId: "13567678850-g0jo32j8dhj66e2nhj2l9o5sqqv3688u.apps.googleusercontent.com",
      iosClientId: "13567678850-r5frkd4h1f59n8pv4tn37a45tdsfm007.apps.googleusercontent.com",
      webClientId: "13567678850-oo19askh0so2hrs0rcl887ho1u4erhtj.apps.googleusercontent.com",
    });
  }

  useEffect(() => {
    configureGoogleSignin()
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      setError();
    } catch (error) {
      setError(error)
    }
  };

  const logout = async () => {
    setUserInfo(undefined);
    GoogleSignin.revokeAccess()
    GoogleSignin.signOut()
  }

  const sendCred = async (props) => {
    fetch('http://10.0.2.2:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          // await AsyncStorage.setItem('token', data.token);
          props.navigation.replace('home');
        } catch (e) {
          console.log('error hai', e);
        }
      });
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
      {userInfo ? (
        <View>
        <Button title="Logout" onPress={logout} />
        <Image
          style={styles.profileImage}
          source={{ uri: userInfo.user.photo }}
        /> 
        <Text>{userInfo.user.givenName}</Text>
        <Text>{userInfo.user.familyName}</Text>
      </View>
      ) : (
        <GoogleSigninButton 
          size={GoogleSigninButton.Size.Standard} 
          color={GoogleSigninButton.Color.Dark} 
          onPress={signIn}
        />
      )}
      
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
  },
});
