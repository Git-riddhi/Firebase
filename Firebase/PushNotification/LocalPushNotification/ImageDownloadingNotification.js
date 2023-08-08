// ImageDownloader.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";

const ImageDownloadingNotification = () => {
    const [progress, setProgress] = useState(0);
    const [notificationId, setNotificationId] = useState(null);

    const handleDownload = async () => {
        try {
            const imageUrl =
                "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"; // Replace with your image URL
            const response = await axios.get(imageUrl, {
                responseType: "arraybuffer",
                onDownloadProgress: (progressEvent) => {
                    const progressPercent = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setProgress(progressPercent);

                    // Update notification progress
                    if (notificationId) {
                        notifee.updateNotification(notificationId, {
                            progress: {
                                value: progressPercent,
                            },
                        });
                    }
                },
            });

            // Save the image or do whatever you want with the downloaded data
            // For example, to display the downloaded image:

            //   const imageData = Buffer.from(response.data, 'base64');
            setProgress(100);
            setNotificationId(null);
        } catch (error) {
            console.error("Image download error:", error);
            setNotificationId(null);
        }
    };

    const handleDownloadButtonPress = async () => {
        // Create a notification
        const notification = {
            title: "Image Download",
            body: "Downloading...",
            android: {
                channelId: "downloads",
                progress: {
                    indeterminate: true,
                    value: progress,
                },
            },
        };

        // Display the notification
        const id = await notifee.displayNotification(notification);
        setNotificationId(id);

        // Start image download
        handleDownload();
    };

    return (
        <View>
            <TouchableOpacity
                onPress={handleDownloadButtonPress}
                style={{ alignItems: "center", justifyContent: "center", marginTop: 50 }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        padding: 5,
                        color: "white",
                        backgroundColor: "green",
                        width: "50%",
                        textAlign: "center",
                    }}
                >
                    Download Image
                </Text>
            </TouchableOpacity>
            {progress > 0 && progress < 100 && <Text>{`${progress}%`}</Text>}
            {progress === 100 && (
                <Image
                    source={{
                        uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
                    }}
                    style={{ width: 200, height: 300, marginTop: 20, alignSelf: 'center' }}
                />
            )}
        </View>
    );
};

export default ImageDownloadingNotification;
