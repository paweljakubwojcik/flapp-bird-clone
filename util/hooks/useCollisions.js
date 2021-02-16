
import { useContext, useEffect, useState } from 'react'
import { CollisionContext } from '../context/collisions'


const checkIntersection = (el1, el2) => {

    const rect1 = el1.getBoundingClientRect()
    const rect2 = el2.getBoundingClientRect()

    const checkHorizontal = (rect1, rect2) =>
        (rect1.left >= rect2.left && rect1.left <= rect2.right) || (rect1.right <= rect2.right && rect1.right >= rect2.left)

    const checkVertical = (rect1, rect2) =>
        (rect1.bottom <= rect2.bottom && rect1.bottom >= rect2.top) || (rect1.top >= rect2.top && rect1.top <= rect2.bottom)

    return (
        (checkHorizontal(rect1, rect2) || checkHorizontal(rect2, rect1))
        &&
        (checkVertical(rect1, rect2) || checkVertical(rect2, rect1))
    )

}

const statesEnum = {
    INITIAL: 'INITIAL',
    BEGIN_COLLIDING: 'BEGIN_COLLIDING',
    COLLIDING: 'COLLIDING',
    END_COLLIDING: 'END_COLLIDING'
}

/**
 * @param {Function | {[key]:Function, default: Function}} collisionCallback - a single callback to call every time there is a collision with object,
 *  or an object where every key represents a callback for diffrent object marked with key
 * @example 
 *  collisionCallback = {
 *      foo: () => callbackForFoo(),
 *      default: () => callbackForEverythingElse()
 * }
 *  
 * @param {{key: ?string , mode: 'continuous'|'start'|'end' }} options 
 */
export default function useCollisions(
    collisionCallback = () => { },
    options = {}
) {

    const { key, mode = 'continuous' } = options
    const { collisionArray, addToCollisionsArray } = useContext(CollisionContext)
    const [ref, setRef] = useState()

    useEffect(() => {
        if (ref)
            addToCollisionsArray({ key, el: ref, state: statesEnum.INITIAL })
    }, [ref])

    const checkCollisions = () => {
        const arrayToCheck = collisionArray.filter(({ el }) => el !== ref)
        arrayToCheck.forEach((obj) => {
            if (checkIntersection(ref, obj.el)) {
                switch (obj.state) {
                    case statesEnum.INITIAL:
                        obj.state = statesEnum.BEGIN_COLLIDING
                        break;
                    case statesEnum.BEGIN_COLLIDING:
                        obj.state = statesEnum.COLLIDING
                        break;
                    default:
                        break;
                }
            } else {
                switch (obj.state) {
                    case statesEnum.COLLIDING:
                        obj.state = statesEnum.END_COLLIDING
                        break;
                    case statesEnum.END_COLLIDING:
                        obj.state = statesEnum.INITIAL
                        break;
                    default:
                        break;
                }
            }

            if ((obj.state === statesEnum.BEGIN_COLLIDING && mode === 'start') ||
                (obj.state === statesEnum.COLLIDING && mode === 'continuous') ||
                (obj.state === statesEnum.END_COLLIDING && mode === 'end')) {
                if (typeof collisionCallback === 'function')
                    collisionCallback()
                if (typeof collisionCallback === 'object')
                    if (obj.key)
                        collisionCallback[obj.key]()
                    else if (collisionCallback['default'])
                        collisionCallback['default']()
            }
        })
    }

    return [setRef, checkCollisions]
}