// import React from 'react';
// import { View, Button } from 'react-native';
// import notifee, { TimestampTriggerAlarmManager, TriggerType } from '@notifee/react-native';

// const TriggerNotification =()=> {
//   async function onCreateTriggerNotification() {
//     const date = new Date(Date.now());
//     date.setHours(11);
//     date.setMinutes(10);

//     // Create a time-based trigger
//     const trigger: TimestampTriggerAlarmManager = {
//       type: TriggerType.TIMESTAMP,
//       timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
//     };

//     // Create a trigger notification
//     await notifee.createTriggerNotification(
//       {
//         title: 'Meeting with Jane',
//         body: 'Today at 11:20am',
//         android: {
//           channelId: 'your-channel-id',
//         },
//       },
//       trigger,
//     );
//   }

//   return (
//     <View>
//       <Button title="Create Trigger Notification" onPress={() => onCreateTriggerNotification()} />
//     </View>
//   );
// }

// export default TriggerNotification