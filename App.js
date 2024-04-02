import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App({navigation}) {
  // useEffect( () => {
  //   const checkLoginStatus = async ( ) => {
  //     const isLogin = await AsyncStorage.getItem('isLogin');
  //     if(isLogin) {
  //       dispatch(setIsLogin(isLogin === "true")); // Convert string to boolean
  //     }
  //   };
  //   checkLoginStatus();
  // }, [])
  const handleGetToken = async () => {
    const authorization = await AsyncStorage.getItem('authorization');
    console.log('token', authorization);
    if(!authorization) {
      navigation.replace('Login');
    }
    else {
      navigation.replace('Home');
    }
  }

  useEffect(() => {
    handleGetToken();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
