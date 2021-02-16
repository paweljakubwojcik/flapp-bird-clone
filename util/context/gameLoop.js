import React, { createContext, useState, useEffect } from 'react'

const GameLoopContext = createContext({
    timerIds: [],
    addTimerId: () => { },
    stop: () => { },
    start: () => { },
    gameLoop: false
})

function GameLoopProvider({ children }) {


    const [timerIds, setTimerIds] = useState([])
    const addTimerId = (element) => {
        setTimerIds(prev => [...prev, element])
    }

    const [gameLoop, setGameLoop] = useState(true)

    const stop = () => {
        setGameLoop(false)
    }

    const start = () => {
        setGameLoop(true)
    }

    return (
        <GameLoopContext.Provider value={
            {
                timerIds,
                addTimerId,
                stop,
                start,
                gameLoop
            }
        }>
            {children}
        </GameLoopContext.Provider>
    )
}

export { GameLoopContext, GameLoopProvider }
