import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, getDocs, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

import AsyncStorage from '@react-native-async-storage/async-storage';

export const Chat = ({ route, navigation, db, isConnected }) => {
    const { username, bgColor, userID } = route.params;
    const [messages, setMessages] = useState([]);
    const collectionName = "messages";

    useEffect(() => {
        navigation.setOptions({ title: username });

        var unsubChat = null;
        if (isConnected) {
            const qCollect = query(collection(db, collectionName), orderBy("createdTime", "desc"));
            unsubChat = onSnapshot(qCollect, (chatData) => {
                let newList = [];
                chatData.forEach(mesg => {
                    let newItem = {
                        ...mesg.data(),
                        createdAt: new Date(mesg.data().createdTime.seconds*1000)
                    };
                    newList.push(newItem);
                })
                setMessages(newList);
                setCachedList(newList);
            })
        } else {
            Alert.alert("Connection Lost!!")
            loadCachedList().then(cachedList => {
                setMessages(cachedList);
            });
        }

        return () => {
            if (unsubChat) unsubChat();
        }
    }, [isConnected]);

    const setCachedList = async (mesgList) => {
        try {
            await AsyncStorage.setItem("mesgList", JSON.stringify(mesgList));
        } catch (err) {
            Alert.alert("Unable to cache messages");
        }
    }
    const loadCachedList = async () => {
        try {
            let cachedList = await AsyncStorage.getItem("mesgList");
            return cachedList != null ? JSON.parse(cachedList) : [];
        } catch (err) {
            Alert.alert("Unable to load cached messages");
            return [];
        }
    }

    const onSend = async (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
        let newItem = {
            ...newMessages[0],
            createdTime: new Date()
        }
        await addDoc(collection(db, collectionName), newItem);
    }

    const renderBubble = (props) => {
        return <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#000",
            },
            left: {
              backgroundColor: "#FFF"
            }
          }}
          textStyle={{
            right: {
                color: "green"
            },
            left: {
                color: "red"
            }
          }}
        />
    }
    
    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }

    return (<View style={{ flex: 1 }}>
        <GiftedChat
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: userID,
                name: username
            }}
        />
        { Platform.OS === 'android' || Platform.OS === 'ios' ?
            <KeyboardAvoidingView behavior="height" /> : null }
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});