import React, { useState, useEffect, createContext } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native'
import { CollisionProvider } from './util/context/collisions'

import Bird from './components/Bird'
import Obstacles from './components/Obstacles';
import { GameLoopProvider } from './util/context/gameLoop';


export default function App() {


  const [touch, setTouch] = useState(false)

  const handlePress = () => {
    setTouch(true)
  }

  return (

    <View style={styles.container}>
      <GameLoopProvider>
        <CollisionProvider>
          <TouchableWithoutFeedback onPress={handlePress}>
            <Game>
              <Bird touch={touch} setTouch={setTouch} />
              <Obstacles />
              <Obstacles offset={1 / 2} />
            </Game>
          </TouchableWithoutFeedback>
        </CollisionProvider>
      </GameLoopProvider>
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

const Game = styled.View`
  
  width:100%;
  height:100%;

`
