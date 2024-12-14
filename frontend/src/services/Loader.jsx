import React from 'react'
import Lottie from "lottie-react";
import loader from "../assets/loader.json";

const Loader = () => {
    return (
        <div>
            <div className="flex min-h-[80vh] items-center justify-center">
                <Lottie
                    className="w-40 sm:w-52 md:w-64 lg:w-80 xl:w-[340px]"
                    animationData={loader}
                    loop={true}
                />
            </div>
        </div>
    )
}

export default Loader
