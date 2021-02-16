import React, { useState } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import Game from './components/Game'
import HomeView from './components/HomeView'
import GameOverView from './components/GameOverView'

export default function App() {

  const [state, setState] = useState('Home')
  const [index, setIndex] = useState(0)

  return (

    <View style={styles.container}>
      {(state === 'Game' || state === 'GameOver') && <Game onGameOver={() => setState('GameOver')} key={index} />}
      {state === 'Home' && <HomeView start={() => setState('Game')} />}
      {state === 'GameOver' && <GameOverView start={() => { setState('Game'); setIndex(prev => prev += 1) }} />}
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


