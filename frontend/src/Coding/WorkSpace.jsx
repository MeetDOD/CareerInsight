import React from 'react'
import Split from "react-split"
import ProblemDescription from './ProblemDescription'
import PlayGround from './PlayGround'

const WorkSpace = () => {
    return (
        <Split className='split' minSize={300}>
            <ProblemDescription />
            <PlayGround />
        </Split>
    )
}

export default WorkSpace
