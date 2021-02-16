import React from 'react'
import { Button } from 'react-native'
import Bird from './Bird'

export default function HomeView({ start }) {
    return (
        <>
            <Bird />
            <Button
                title='play'
                onPress={start}
            />
        </>
    )
}
