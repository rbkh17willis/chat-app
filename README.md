# Chat App
This is a project is for mobile devices made using React Native as the framework. The app will provide users with a chat interface and options to share images and their location. This is a mobile application tested through Expo.
Firestore and Firebase served as the main database and storage for user messages.

# Features and Requirements
Key Features:
* a Start page where useres can enter their name and select a background color for the chat screen before entering the chat room
* a Chat page displaying the conversation as well as an input field and submit button
* Chat allows the sharing of image files and location data
* Data gets stored online using Google Firebase and offline using client-side storage; this will enable users to read old messages without an internet connection available.

# Technologies Used:
* React Native as the framework
* Expo as the development platform
* Google Firebase for cloud-cased storage of messages and image files sent through the chat
* GiftedChat library for creating the chat interface
* Android Studio for a device emulator

## How to Run This App
  - Clone repository
  - Install Node.js & use v16.19.0 by running `nvm use 16.19.0`
  - Install Expo by running `npm install -g expo-cli`
  - Locate the `chat-app` folder and run `npm install` to initialize a `package.json` file

  - Set up Google Firebase by first signing in at
  https://firebase.google.com/
  - Then, create project
  - Select production mode
  - After creating the project, click on Project Overview >
  Project Settings > Your Apps
  - Copy configuration code (all the code inside of `const firebaseConfig = { ... }`)

  - Return to repository
  - Locate `chat-app` folder
  - Install Firebase through `npm install firebase`
  - Initialize Firebase by  pasting configuration code that you copied earlier inside of App.js

  - Download Expo Go app on mobile device or use emulator on PC
  - Open Expo Go app
  - Type in terminal of IDE `npx expo start` to start project on Expo Go app


# Dependencies:
* @react-navigation/native: ^6.1.17
* @react-navigation/native-stack: ^6.9.26
* expo: ~51.0.8
* expo-status-bar: ~1.12.1
* firebase: ^10.3.1
* react: 18.2.0
* react-native: 0.74.1
* react-native-gifted-chat: ^2.4.0
* react-native-safe-area-context: 4.10.1
* react-native-screens: 3.31.1
* @react-native-async-storage/async-storage: 1.23.1
* @react-native-community/netinfo: 11.3.1
* expo-location: ~17.0.1
* react-native-maps: 1.14.0
* expo-image-picker: ~15.0.5
