// import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Button, ImageBackground } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { appColor, appDimension, appImage } from '../../../Utils/globalConstant';


// const deviceWidth = Dimensions.get('screen').width
// const deviceHeight = Dimensions.get('screen').height


// const Chat = (props) => {
//     const [chatUserId, setChatUserId] = useState(null)


//     useEffect(async () => {
//         const userId = await AsyncStorage.getItem('USERID')
//         setChatUserId(userId)
//         // console.log("userId===", userId);
//     }, [])


//     if (chatUserId) {
//         setTimeout(() => {
//             props.navigation.navigate('ChatList', { id: chatUserId })
//         }, 2000)
//     }
//     else {
//         console.log("chatUserId====", chatUserId);
//     }


//     return (
//         <View style={styles.container}>
//             <Text style={styles.textStyle}>WeChat</Text>
//             <Image
//                 source={{ uri: appImage.chat_banner_image }}
//                 style={styles.imageStyle}
//                 resizeMode='contain' />
//         </View>
//     )
// }
// export default Chat