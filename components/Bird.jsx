import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import useCollisions from '../util/hooks/useCollisions'
import useGameLoop from '../util/hooks/useGameLoop.js'

const birdDimensions = {
    width: 50,
    height: 50
}
const deviceDimensions = Dimensions.get('screen')
const gravity = 1
const maxVelocity = 10
const jumpForce = 12

export default function Bird({ touch, setTouch }) {

    const [birdRef, checkCollision] = useCollisions(() => {
        stopCallback()
    })

    const birdLeft = deviceDimensions.width / 2
    const [birdBottom, setBirdBottom] = useState(deviceDimensions.height / 2)
    const [velocity, setVelocity] = useState(0)

    const { stop } = useGameLoop(() => {
        if (birdBottom > 0) {
            setBirdBottom(birdBottom => birdBottom - velocity)
            setVelocity(velocity => velocity < maxVelocity ? velocity + gravity : maxVelocity)
        }
        checkCollision()
    }, [birdBottom, velocity])

    function stopCallback() {
        stop()
    }

    useEffect(() => {
        if (touch) {
            setVelocity(-jumpForce)
            setTouch(false)
        }
    }, [touch])

    return (
        <StyledBird style={{
            bottom: birdBottom,
            left: birdLeft - birdDimensions.width / 2,
            ...birdDimensions,
            transform: `rotateZ(${(velocity / maxVelocity) * 40}deg)`
        }}
            ref={birdRef}
        />
    )
}

const StyledBird = styled.View`

    position:absolute;
    background-color: #000;
    transition: transform .1s;
    transform-origin: center center
`
