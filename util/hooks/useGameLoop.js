import { useEffect, useContext } from 'react'
import { GameLoopContext } from '../context/gameLoop'

export default function useGameLoop(callback, dependencyArray) {

    const context = useContext(GameLoopContext)

    const { gameLoop } = context
    let timerId

    useEffect(() => {
        if (gameLoop && callback)
            timerId = setInterval(() => {
                callback()
            }, 33)

        return () => {
            clearInterval(timerId)
        }
    }, dependencyArray)

    return context
}