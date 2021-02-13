import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { CollisionContext } from '../util/collisions.js'

const birdDimensions = {
    width: 50,
    height: 50
}
const deviceDimensions = Dimensions.get('screen')
const gravity = 3

export default function Bird() {

    const { useCollisions } = useContext(CollisionContext)
    const [birdRef, checkCollision] = useCollisions(() => {
        console.log('collision')
    })

    let timerId

    const birdLeft = deviceDimensions.width / 2
    const [birdBottom, setBirdBottom] = useState(deviceDimensions.height / 2)

    useEffect(() => {

        timerId = setInterval(() => {
            if (birdBottom > 0)
                setBirdBottom(birdBottom => {
                    console.log(birdBottom)
                    return birdBottom - gravity
                })
            checkCollision()
        }, 30)

        return () => {
            clearInterval(timerId)
        }
    }, [birdBottom])

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
