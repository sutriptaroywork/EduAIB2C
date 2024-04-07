import { useLottie } from 'lottie-react';
import loaderImg from "../../public/321.json"
import React from 'react'

const QuizStartLoader = () => {
    const options = {
        animationData: loaderImg,
        loop: false
    };
    const { View } = useLottie(options);
    return (
        <div className='fixed !z-[200] inset-0 bg-purple-200 bg-opacity-75 flex items-center justify-center'>
            <div className='h-[300px] w-[300px] border-b-4 border-r-2 border-l-2 rounded-lg border-t-1 bg-white border-orange-500 shadow-md grid place-items-center'>
                <div className="h-[200px] w-[200px] flex m-auto">
                    {View}
                </div>
            </div>
        </div>
    )
}

export default QuizStartLoader;