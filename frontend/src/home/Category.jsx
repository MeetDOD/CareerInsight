import React, { Fragment } from 'react'
import categorylist from '@/data/categorylist';
import { motion } from 'framer-motion';

const Category = () => {
    return (
        <section className='pb-20 pt-10 overflow-x-clip'>
            <div className='container'>
                <h3 className='text-center text-gray-500 text-2xl font-semibold'>Our courses categories and domains to explore</h3>
                <div className='flex overflow-hidden mt-12 [mask-image:linear-gradient(to_right,transparent,black_30%,black_90%,transparent)]'>
                    <motion.div
                        animate={{
                            x: "-50%"
                        }}
                        transition={{
                            duration: 25,
                            ease: "linear",
                            repeat: Infinity
                        }}
                        className='flex flex-none gap-24 pr-24'>
                        {Array.from({ length: 2 }).map((_, index) => (
                            <Fragment key={index}>
                                {categorylist.map((item) => (
                                    <div key={item.id} className='flex flex-row gap-3 items-center justify-center text-center'>
                                        <div>{item.icon}</div>
                                        <div className='text-xl font-medium'>{item.name}</div>
                                    </div>
                                ))}
                            </Fragment>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Category
