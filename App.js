import React, { useState, useEffect, createContext } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { CollisionProvider } from './util/collisions'

import Bird from './components/Bird'
import Obstacles from './components/Obstacles';


export default function App() {


  return (
    <View style={styles.container}>
      <CollisionProvider>
        <Bird />
        <Obstacles />
        <Obstacles offset={1 / 2} />
      </CollisionProvider>
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
