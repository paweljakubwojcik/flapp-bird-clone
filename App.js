import React, { useState } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import Game from './components/Game'
import HomeView from './components/HomeView'

export default function App() {

  const [state, setState] = useState('Home')

  return (

    <View style={styles.container}>
      {state === 'Game' && <Game />}
      {state === 'Home' && <HomeView start={() => setState('Game')} />}
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


