import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Alert } from 'react-native';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import FireBase
import { initializeApp } from 'firebase/app';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import { useNetInfo }from '@react-native-community/netinfo';

import { Chat } from './components/Chat';
import { Start } from './components/Start';
import { useEffect } from 'react';

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyAqK2fgT535Xhiu2iMdSA2ef2VvzshALXM",
    authDomain: "chatapp-be271.firebaseapp.com",
    projectId: "chatapp-be271",
    storageBucket: "chatapp-be271.appspot.com",
    messagingSenderId: "802731673424",
    appId: "1:802731673424:web:9588c3493fa18633e30e55",
    measurementId: "G-LGH18MKM8N"
  };
  
  // Initialize Firebase// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const Stack = createNativeStackNavigator();

  const connectionStatus = useNetInfo();
  useEffect(() => {
      if (connectionStatus.isConnected) {
          enableNetwork(db);
      } else {
          disableNetwork(db);
      }
  }, [connectionStatus.isConnected])

  return (
      <NavigationContainer style={styles.container}>
          <Stack.Navigator initialRouteName="Start">
              <Stack.Screen name="Start" component={Start} />
              <Stack.Screen name="Chat">
                  {props => <Chat db={db} isConnected={connectionStatus.isConnected} {...props}/>}
              </Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>
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