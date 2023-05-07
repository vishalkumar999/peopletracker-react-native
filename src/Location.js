import React, { useState, useEffect } from 'react'
import GetLocation from 'react-native-get-location'
import DeviceInfo from 'react-native-device-info';
import database from '@react-native-firebase/database';
import BackgroundService from 'react-native-background-actions';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));


const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 5000,
    },
};



const Location = () => {
    const [uniqueId, setUniqueId] = useState("");
    const [deviceName, setDeviceName] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [time, setTime] = useState("");

    const veryIntensiveTask = async (taskDataArguments) => {
        // Example of an infinite loop task
        const { delay } = taskDataArguments;
        await new Promise(async (resolve) => {
            for (let i = 0; BackgroundService.isRunning(); i++) {
                saveData();
                await sleep(delay);
            }
        });
    };

    const startBackgroundTask = async () => {
        await BackgroundService.start(veryIntensiveTask, options);
    }

    const saveData = () => {
        const reference = database().ref(`users/${uniqueId}`);

        if (deviceName != "" && lat != "" && long != "" && time != "" && uniqueId != "") {
            const data = {
                deviceName,
                lat,
                long,
                time,
            }
            reference.set(data);
        } else {
            console.debug("no data for save");
        }
    }


    useEffect(() => {
        DeviceInfo.getUniqueId().then((uniqueId) => {
            setUniqueId(uniqueId);
        })
        DeviceInfo.getDeviceName().then((deviceName) => {
            setDeviceName(deviceName);
        });
        saveData();

    }, []);

    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
    }).then(location => {
        // console.log(location);
        setLat(location.latitude);
        setLong(location.longitude);
        setTime(location.time);
        saveData();
    }).catch(error => {
        const { code, message } = error;
        // console.warn(code, message);
    })

    startBackgroundTask();
    return (
        <></>
    )
}

export default Location