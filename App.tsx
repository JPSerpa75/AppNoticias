import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './app/navigators/MainTab';



export default function App() {
  return (
    <NavigationContainer>
      <MainTab/>
    </NavigationContainer>
  );
}
