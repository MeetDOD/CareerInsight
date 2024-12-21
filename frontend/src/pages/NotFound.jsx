import React from 'react'
import notFound from '../assets/notFound.png'

const NotFound = () => {
    return (
        <div className='flex flex-col items-center text-center space-y-2'>
            <div>
                <img src={notFound} width={400} alt='NOT FOUND' />
            </div>
            <h1 className='tracking-tight font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>
                <span className='text-red-500 font-bold'>404</span><br />
                Page Not Found
            </h1>
        </div>
    )
}

export default NotFound