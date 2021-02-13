import React, { createContext, useState, useEffect } from 'react'


const CollisionContext = createContext({
    collisionArray: [],
    addToCollisionsArray: () => { },
})


function CollisionProvider({ children }) {

    const [collisionArray, setCollisionsArray] = useState([])

    const addToCollisionsArray = (element) => {
        setCollisionsArray(prev => [...prev, element])
    }

    return (
        <CollisionContext.Provider value={
            {
                collisionArray,
                addToCollisionsArray
            }
        }>
            {children}
        </CollisionContext.Provider>
    )
}

export { CollisionContext, CollisionProvider }
