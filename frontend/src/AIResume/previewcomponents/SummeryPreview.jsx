import React from 'react'

const SummeryPreview = ({ resumeInfo }) => {
    return (
        <div>
            <p className='text-xs text-black' style={{ fontFamily: resumeInfo?.fontStyle }}>
                {resumeInfo?.summary}
            </p>
        </div>
    )
}

export default SummeryPreview
