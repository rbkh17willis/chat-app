import { StatusBar } from 'expo-status-bar';
import { StyleSheet, LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // Web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAqK2fgT535Xhiu2iMdSA2ef2VvzshALXM",
    authDomain: "chatapp-be271.firebaseapp.com",
    projectId: "chatapp-be271",
    storageBucket: "chatapp-be271.appspot.com",
    messagingSenderId: "802731673424",
    appId: "1:802731673424:web:9588c3493fa18633e30e55",
    measurementId: "G-LGH18MKM8N"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app)

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
            {props => <Chat db={db} {...props} />}
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

export default App;