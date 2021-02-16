import React from 'react'

import styled from 'styled-components/native'

export default ({ score }) => {
    return (
        <Score>
            Score : {score}
        </Score>
    )
}

const Score = styled.Text`
    position: absolute;
    top: 0;
    right:0;
    font-size: 32px;
    
`
