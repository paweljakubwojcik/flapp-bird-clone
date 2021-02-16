import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import useCollisions from '../util/hooks/useCollisions'
import useGameLoop from '../util/hooks/useGameLoop.js'

const deviceDimensions = Dimensions.get('screen')
const obstacleDimensions = {
    width: 50,
    height: deviceDimensions.height,
    gap: 200,
}
const initialPosition = deviceDimensions.width * 1.3

const getRandomGapHeight = () => {
    const value = Math.floor((Math.random() * 0.5 + 0.25) * deviceDimensions.height)
    console.log('next gap height : ' + value)
    return value
}

const initialGapHeight = getRandomGapHeight()

export default function Obstacles({ offset = 0 }) {

    const [obstacleRef] = useCollisions()
    const [obstacleRef2] = useCollisions()
    const [gapRef] = useCollisions(null, { key: 'gap', mode: 'start' })

    const { width, height, gap } = obstacleDimensions

    const calculatedOffset = offset * initialPosition + width / 2
    const [obstacleLeft, setObstacleLeft] = useState(initialPosition + calculatedOffset)

    const [gapHeight, setGapHeight] = useState(initialGapHeight)

    useGameLoop(() => {
        if (obstacleLeft > - width) {
            setObstacleLeft(obstacleLeft => obstacleLeft - 4)
        } else {
            setObstacleLeft(initialPosition)
            setGapHeight(getRandomGapHeight())
        }
    }, [obstacleLeft])

    return (
        <Container style={{
            left: obstacleLeft,
            width
        }}>
            <Obstacle
                style={{
                    height: gapHeight,
                }}
                ref={obstacleRef}
            />
            <Gap
                style={{
                    height: gap
                }}
                ref={gapRef}
            />
            <Obstacle
                style={{
                    height: '100px',
                }}
                ref={obstacleRef2}
            />
        </Container>
    )
}

const Container = styled.View`
    position:absolute;
    bottom: 0;
    height: 100%;

    display:flex;
    flex-direction: column-reverse;
    justify-content: stretch;

`

const Obstacle = styled.View`
    background-color: #111;
    width: 100%;
    flex-grow: 1;
`

const Gap = styled.View`
    background-color: transparent;
    width: 100%;
`
