import React from 'react'

const SummeryPreview = ({ resumeInfo }) => {
    return (
        <div>
            <p className='text-xs'>
                {resumeInfo?.summery}
            </p>
        </div>
    )
}

export default SummeryPreview
