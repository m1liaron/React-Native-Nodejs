import { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';

// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen(props) {
  const [email, setEmail] = useState("loading...")
  
//   const Boiler = async ()=>{
//     // const token = await AsyncStorage.getItem("token")
//         fetch('http://10.0.2.2:3000/',{
//         headers:new Headers({
//           Authorization:"Bearer "+token
//         })
//         }).then(res=>res.json())
//         .then(data=>{
//           console.log(data)
//           setEmail(data.email)
//         } 
//       )
//  }
// useEffect(()=>{
//  Boiler()
// },[])


  // const logout = async (props) => {
  //   // await AsyncStorage.removeItem("token")
  //     .then(() => {
  //       props.navigation.replace("login")
  //     })
  // }

  return (
      <SafeAreaView style={styles.container}>
            <Text>your email is {email}</Text>
            {/* <Button
              mode="contained"
              onPress={() => logout(props)}
            >
              logout
            </Button> */}
            
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
