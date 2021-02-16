import React, { useEffect, useState, useContext, forwardRef } from 'react'
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

export default ({ touch, setTouch, incrementScore }) => {

    const [birdRef, checkCollision] = useCollisions({
        gap: () => incrementScore(),
        default: () => stop()
    }, {
        mode: 'start'
    })

    const birdLeft = deviceDimensions.width / 2
    const [birdBottom, setBirdBottom] = useState(deviceDimensions.height / 1.7)
    const [velocity, setVelocity] = useState(0)

    const { stop, start } = useGameLoop(() => {
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
        <Bird
            style={{
                bottom: birdBottom,
                left: birdLeft - birdDimensions.width / 2,
                ...birdDimensions,
                transform: `rotateZ(${(velocity / maxVelocity) * 40}deg)`
            }}
            ref={birdRef}
        />
    )
}

const Bird = forwardRef(({ ...rest }, ref) => {

    const [up, setUp] = useState(false)
    let intervalId

    useEffect(() => {
        intervalId = setInterval(() => {
            setUp(prev => !prev)
        }, 500)
        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <StyledBird
            ref={ref}
            {...rest}>

            <Eye style={{
                transform: 'translate(30%, -20%)'
            }} >
                <EyeBall />
            </Eye>
            <Eye >
                <EyeBall />
            </Eye>
            <Wing up={up} />
            <Mouth />
        </StyledBird>
    )

})

const StyledBird = styled.View`
    position:absolute;
    background-color: #000;
    transition: transform .2s;
    transform-origin: center center;
`

const Wing = styled.View`

    position:absolute;

    left: 20%;
    top:${props => props.up ? '30%' : '50%'};

    width: 30%;
    height: 30%;
    border-radius: 40%;

    background-color: transparent;
    
    border: 2px solid #fff;
    border-top-color:transparent; 

    ${props => props.up ? 'transform: rotate(180deg);' : ''}

`

const Eye = styled.View`

    position:absolute;

    right: 15%;
    top:20%;

    width: 30%;
    height: 40%;
    border-radius: 50%;

    background-color: #000;
    
    border: 2px solid #fff;

`

const EyeBall = styled.View`

    position:absolute;

    right: 15%;
    top:20%;

    width: 20%;
    height: 20%;
    border-radius: 50%;

    background-color: #fff;
`

const Mouth = styled.View`

    position:absolute;

    right: 20%;
    top:60%;

    width: 15%;
    height: 15%;
    border-radius: 50%;

    background-color: transparent;
    
    border: 2px solid #fff;
    border-top-color: transparent;
`


