import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { CollisionContext } from '../util/collisions.js'
import useGameLoop from '../util/hooks/useGameLoop.js'

const birdDimensions = {
    width: 50,
    height: 50
}
const deviceDimensions = Dimensions.get('screen')
const gravity = 3
const jump = 30

export default function Bird({ touch, setTouch }) {

    const { useCollisions } = useContext(CollisionContext)
    const [birdRef, checkCollision] = useCollisions(() => {
        stopCallback()
    })

    const birdLeft = deviceDimensions.width / 2
    const [birdBottom, setBirdBottom] = useState(deviceDimensions.height / 2)

    const { stop } = useGameLoop(() => {
        if (birdBottom > 0)
            setBirdBottom(birdBottom => {
                return birdBottom - gravity
            })
        checkCollision()
    }, [birdBottom])

    function stopCallback() {
        console.log('collision')
        stop()
    }

    useEffect(() => {
        if (touch) {
            setBirdBottom(birdBottom => {
                return birdBottom + jump
            })
            setTouch(false)
        }
    }, [touch])

    return (
        <StyledBird style={{
            bottom: birdBottom,
            left: birdLeft - birdDimensions.width / 2,
            ...birdDimensions
        }}
            ref={birdRef}
        />
    )
}

const StyledBird = styled.View`

    position:absolute;
    background-color: #000;
`
