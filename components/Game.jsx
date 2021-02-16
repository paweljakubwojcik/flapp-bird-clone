import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import { CollisionProvider } from '../util/context/collisions'
import { GameLoopProvider } from '../util/context/gameLoop';
import Bird from './Bird'
import Obstacles from './Obstacles';
import Score from './Score';


export default function Game() {

    const [touch, setTouch] = useState(false)

    const handlePress = () => {
        setTouch(true)
    }

    const [score, setScore] = useState(0)
    const incrementScore = () => {
        setScore(prev => prev += 1)
    }

    return (
        <GameLoopProvider>
            <CollisionProvider>
                <TouchableWithoutFeedback onPress={handlePress}>
                    <Container>
                        <Bird touch={touch} setTouch={setTouch} incrementScore={incrementScore} />
                        <Obstacles />
                        <Obstacles offset={1 / 2} />
                        <Score score={score} />
                    </Container>
                </TouchableWithoutFeedback>
            </CollisionProvider>
        </GameLoopProvider>
    )
}

const Container = styled.View`
  
  width:100%;
  height:100%;
  position:absolute;

`