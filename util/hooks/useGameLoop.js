import { useEffect, useContext } from 'react'
import { GameLoopContext } from '../constext/gameLoop'

export default function useGameLoop(callback, dependencyArray) {

    const context = useContext(GameLoopContext)

    const { gameLoop } = context
    let timerId

    useEffect(() => {
        if (gameLoop)
            timerId = setInterval(() => {
                callback()
            }, 30)

        return () => {
            clearInterval(timerId)
        }
    }, dependencyArray)

    return context
}