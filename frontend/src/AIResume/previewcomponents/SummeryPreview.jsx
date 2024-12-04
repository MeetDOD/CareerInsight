import React from 'react'

const SummeryPreview = ({ resumeInfo }) => {
    return (
        <div>
            <p className='text-xs text-black'>
                {resumeInfo?.summery}
            </p>
        </div>
    )
}

export default SummeryPreview
