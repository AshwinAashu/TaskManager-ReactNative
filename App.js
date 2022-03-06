// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen options = {{ headerShown :  false}} name="Login" component={LoginScreen} />
      <Stack.Screen options = {{ headerShown : false }} name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
