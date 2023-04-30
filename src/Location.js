import React, { useState, useEffect } from 'react'
import { Text } from 'react-native';
import GetLocation from 'react-native-get-location'
import DeviceInfo from 'react-native-device-info';
import { gyroscope } from "react-native-sensors";

const Location = () => {
    const [uniqueId, setUniqueId] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [time, setTime] = useState("");

    const subscription = gyroscope.subscribe(({ x, y, z, timestamp }) =>
        console.log({ x, y, z, timestamp })
    );
    useEffect(() => {
        DeviceInfo.getUniqueId().then((uniqueId) => {
            setUniqueId(uniqueId);
        })

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        }).then(location => {
            // console.log(location);
            setLat(location.latitude);
            setLong(location.longitude);

            let timestamp = location.time; // Unix timestamp for 4:00 AM on May 3, 2021
            let date = new Date(timestamp);
            let timeString = date.toLocaleString();
            setTime(timeString);
        }).catch(error => {
            const { code, message } = error;
            // console.warn(code, message);
        })
    }, []);


    return (
        <>
            <Text style={{ color: 'black' }}>Latitude : {lat}</Text>
            <Text style={{ color: 'black' }}>Longitude : {long}</Text>
            <Text style={{ color: 'black' }}>Time : {time}</Text>
            <Text style={{ color: 'black' }}>DeviceInfo : {uniqueId}</Text>
        </>
    )
}

export default Location