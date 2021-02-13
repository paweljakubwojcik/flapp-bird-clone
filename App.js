import React, { useState, useEffect, createContext } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { CollisionProvider } from './util/collisions'

import Bird from './components/Bird'
import Obstacles from './components/Obstacles';
import { GameLoopProvider } from './util/constext/gameLoop';


export default function App() {


  const [touch, setTouch] = useState(false)

  const handlePress = () => {
    setTouch(true)
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <GameLoopProvider>
          <CollisionProvider>
            <Bird touch={touch} setTouch={setTouch} />
            <Obstacles />
            <Obstacles offset={1 / 2} />
          </CollisionProvider>
        </GameLoopProvider>
      </View>
    </TouchableWithoutFeedback>
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
