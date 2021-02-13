import React, { createContext, useState } from 'react'

const CollisionContext = createContext({
    collisionArray: [],
    addToCollisionsArray: () => { }
})

export default function useCollisions(collisionCallback, options) {

    const checkCollisions = () => {
        
        if (collisionCallback)
            collisionCallback()
    }

    function CollisionProvider({ children }) {

        const [collisionArray, setCollisionsArray] = useState([])

        const addToCollisionsArray = (element) => {
            console.log(element)
            setCollisionsArray(prev => [...prev, element])
            console.log(collisionArray)
        }

        return (
            <CollisionContext.Provider value={
                collisionArray,
                addToCollisionsArray
            }>
                {children}
            </CollisionContext.Provider>
        )
    }

    return {
        CollisionProvider,
        CollisionContext,
        checkCollisions
    }
}