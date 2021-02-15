import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import { CollisionProvider } from '../util/context/collisions'
import { GameLoopProvider } from '../util/context/gameLoop';
import Bird from './Bird'
import Obstacles from './Obstacles';


export default function Game() {

    const [touch, setTouch] = useState(false)

    const handlePress = () => {
        setTouch(true)
    }

    return (
        <GameLoopProvider>
            <CollisionProvider>
                <TouchableWithoutFeedback onPress={handlePress}>
                    <Container>
                        <Bird touch={touch} setTouch={setTouch} />
                        <Obstacles />
                        <Obstacles offset={1 / 2} />
                    </Container>
                </TouchableWithoutFeedback>
            </CollisionProvider>
        </GameLoopProvider>
    )
}

const Game = styled.View`
  
  width:100%;
  height:100%;

`