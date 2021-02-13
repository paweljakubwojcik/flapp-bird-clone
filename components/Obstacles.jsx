import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { CollisionContext } from '../util/collisions.js'

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

    const { addToCollisionsArray, useCollisions } = useContext(CollisionContext)
    const [obstacleRef] = useCollisions()
    const [obstacleRef2] = useCollisions()

    let timerId

    const { width, height, gap } = obstacleDimensions

    const calculatedOffset = offset * initialPosition + width / 2
    const [obstacleLeft, setObstacleLeft] = useState(initialPosition + calculatedOffset)

    const [gapHeight, setGapHeight] = useState(initialGapHeight)

    useEffect(() => {
        if (obstacleLeft > - width) {
            timerId = setInterval(() => {
                setObstacleLeft(obstacleLeft => obstacleLeft - 4)
            }, 30)

        } else {
            timerId = setInterval(() => {
                setObstacleLeft(initialPosition)
                setGapHeight(getRandomGapHeight())
            }, 30)
        }
        return () => {
            clearInterval(timerId)
        }
    }, [obstacleLeft])


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
