// import { View, Text, StyleSheet } from 'react-native';
// import React, { useCallback, useEffect, useState } from 'react';
// import { Avatar, Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
// import { useRoute } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';
// import uuid from 'react-native-uuid';
// import { appColor, appDimension } from '../../../../Utils/globalConstant';
// import Icon from 'react-native-vector-icons/AntDesign'
// import SendIcon from 'react-native-vector-icons/MaterialIcons'


// const ChatRoom = (props) => {
//     const [messageList, setMessageList] = useState([]);
//     // const route = props?.route?.params?.id
//     console.log("route?.params?.id===1", props?.route?.params?.data);
//     // console.log("route?.params?.id===2",props?.route?.params?.user);
//     useEffect(() => {
//         const subscriber = firestore()
//             .collection('chats')
//             .doc(props?.route?.params?.user + props?.route?.params?.data?.userId)
//             .collection('messages')
//             .orderBy('createdAt', 'desc');
//         subscriber.onSnapshot(querysnapshot => {
//             const allmessages = querysnapshot.docs.map(item => {
//                 return { ...item._data, createdAt: item._data.createdAt };
//             });
//             setMessageList(allmessages);
//         });
//         // return () => subscriber();
//     }, []);


//     const onSend = useCallback(async (messages = []) => {
//         const msg = messages[0];
//         const myMsg = {
//             ...msg,
//             sendBy: props?.route?.params?.user,
//             sendTo: props?.route?.params?.data?.userId,
//             createdAt: Date.parse(msg.createdAt),
//         };
//         setMessageList(previousMessages =>
//             GiftedChat.append(previousMessages, myMsg),
//         );
//         firestore()
//             .collection('chats')
//             .doc('' + props?.route?.params?.user + props?.route?.params?.data?.userId)
//             .collection('messages')
//             .add(myMsg);
//         firestore()
//             .collection('chats')
//             .doc('' + props?.route?.params?.data?.userId + props?.route?.params?.user)
//             .collection('messages')
//             .add(myMsg);
//     }, []);


//     return (
//         <View style={styles.containerStyle}>
//             <View style={styles.header}>
//                 <Icon name={'arrowleft'}
//                     size={25}
//                     color={appColor.PRIMARY_COLOR}
//                     onPress={() => { props.navigation.goBack() }} />
//                 <Text style={styles.title}>{props?.route?.params?.data?.name}</Text>
//             </View>
//             <GiftedChat
//                 messages={messageList.length > 0 ? messageList : null}
//                 onSend={messages => onSend(messages)}
//                 user={{
//                     _id: props?.route?.params?.user,
//                 }}
//                 // renderAvatar={(a) => console.log("a====",a)}
//                 renderBubble={(props) => {
//                     return (
//                         <Bubble
//                             {...props}
//                             wrapperStyle={{
//                                 right: {
//                                     backgroundColor: appColor.SEND_MESSAGE_BUBBLE_COLOR
//                                 },
//                                 left: {
//                                     backgroundColor: appColor.RECIVE_MESSAGE_BUBBLE_COLOR,
//                                 }
//                             }}
//                             textStyle={{
//                                 left: {
//                                     color: 'white',
//                                     fontSize: 18,
//                                 },
//                                 right: {
//                                     color: 'white',
//                                     fontSize: 18,
//                                 }
//                             }}
//                             containerStyle={{
//                                 left: {
//                                 }
//                             }}
//                         />
//                     )
//                 }}
//                 showUserAvatar={false}
//                 renderAvatar={(props) => {
//                     <Avatar
//                         {...props}
//                         containerStyle={{
//                             left: {
//                                 // backgroundColor: 'yellow',
//                                 width: 0,
//                             }
//                         }}
//                     />
//                 }}
//                 renderAvatarOnTop={false}
//                 showAvatarForEveryMessage={false}
//                 alwaysShowSend={true}
//                 renderSend={(props) => {
//                     return (
//                         <Send {...props} containerStyle={styles.sendButtonStyle}>
//                             <SendIcon name='send' size={30} color={'white'} />
//                         </Send>
//                     )
//                 }}
//             />
//         </View>
//     );
// };
// export default ChatRoom;