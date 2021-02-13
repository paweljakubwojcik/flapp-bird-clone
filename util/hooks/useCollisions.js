
import { useContext, useEffect, useState } from 'react'
import { CollisionContext } from '../context/collisions'


const checkIntersection = (el1, el2) => {

    const rect1 = el1.getBoundingClientRect()
    const rect2 = el2.getBoundingClientRect()

    if (((rect1.left >= rect2.left && rect1.left <= rect2.right) || (rect1.right <= rect2.right && rect1.right >= rect2.left))
        &&
        ((rect1.bottom <= rect2.bottom && rect1.bottom >= rect2.top) || (rect1.top >= rect2.top && rect1.top <= rect2.bottom))
    )
        return true

    return false

}

export default function useCollisions(collisionCallback) {
    const { collisionArray, addToCollisionsArray } = useContext(CollisionContext)
    const [ref, setRef] = useState()

    useEffect(() => {
        if (ref)
            addToCollisionsArray(ref)
    }, [ref])

    const checkCollisions = () => {
        const arrayToCheck = collisionArray.filter(el => el !== ref)
        arrayToCheck.forEach(el => {
            if (checkIntersection(ref, el))
                collisionCallback()
        })

    }

    return [setRef, checkCollisions]
}