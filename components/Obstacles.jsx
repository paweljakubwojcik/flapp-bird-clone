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
    console.log('random')
    return (Math.random() * 0.5 + 0.25) * deviceDimensions.height
}

const initialGapHeight = getRandomGapHeight()

export default function Obstacles({ offset }) {

    const [obstacleRef] = useCollisions()
    const [obstacleRef2] = useCollisions()

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
    })

    return (
        <>
            <Obstacle
                style={{
                    bottom: 0,
                    left: obstacleLeft,
                    height: gapHeight,
                    width
                }}
                ref={obstacleRef}
            />
            <Obstacle
                style={{
                    top: 0,
                    left: obstacleLeft,
                    height: height - gapHeight - gap,
                    width
                }}
                ref={obstacleRef2}
            />
        </>
    )
}

const Obstacle = styled.View`
    position:absolute;
    background-color: #111;
`
