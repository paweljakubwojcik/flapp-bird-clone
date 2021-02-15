import React from 'react'
import { StyleSheet, View, } from 'react-native';


export default function App() {


  return (

    <View style={styles.container}>
      <Game />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
})


