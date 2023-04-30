import React from 'react'
import { Text, View, Dimensions } from 'react-native'
import Location from './src/Location';

const windowHeight = Dimensions.get('window').height;

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: windowHeight }}>
      <Text style={{ color: 'black' }}>Loading..</Text>
      <Location />
    </View>
  )
}

export default App