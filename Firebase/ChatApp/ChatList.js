// import {
//     View,
//     Text,
//     StyleSheet,
//     FlatList,
//     Dimensions,
//     Image,
//     TouchableOpacity,
// } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import firestore from '@react-native-firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/AntDesign'
// import { appColor, appDimension } from '../../../../Utils/globalConstant';


// let id = '';
// const ChatList = (props) => {
//     const [users, setUsers] = useState([]);
//     const userid = props?.route?.params?.id


//     console.log("userid===", userid);


//     useEffect(() => {
//         getUsers();
//     }, []);


//     const getUsers = async () => {
//         id = await AsyncStorage.getItem('USERID');
//         let tempData = [];
//         const number = await AsyncStorage.getItem('MOBILE');
//         firestore()
//             .collection('usersSignUpData')
//             .where('mobile', '!=', number)
//             .get()
//             .then(res => {
//                 if (res.docs != []) {
//                     res.docs.map(item => {
//                         tempData.push(item.data());
//                     });
//                 }
//                 setUsers(tempData);
//             });
//     };


//     return (
//         <View>
//             <View style={styles.header}>
//                 <Icon name={'arrowleft'}
//                     size={25}
//                     color={appColor.PRIMARY_COLOR}
//                     onPress={() => { props.navigation.navigate('Services') }} />
//                 <Text style={styles.title}>RN Firebase Chat App</Text>
//             </View>
//             <FlatList
//                 data={users}
//                 renderItem={({ item, index }) => {
//                     return (
//                         <TouchableOpacity
//                             style={[styles.userItem, { backgroundColor: 'white' }]}
//                             onPress={() => {
//                                 // console.log("{ data: item, id: id }", { data: item, id: id });
//                                 props.navigation.navigate('ChatRoom', { data: item, user: userid });
//                             }}>
//                             <Text style={styles.name}>{item.name}</Text>
//                         </TouchableOpacity>
//                     );
//                 }}
//             />
//         </View>
//     );
// };
// export default ChatList;