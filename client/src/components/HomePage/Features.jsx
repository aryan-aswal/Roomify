import React, { useState } from 'react';
import Wrapper from '../common/Wrapper';
import featuresImage from '../../assets/Features.png';

const Features = () => {
    const features = ["Virtual Meetings", "Live Chat", "AI Companion", "Screen Sharing", "Recording"];
    const [isActive, setIsActive] = useState("AI Companion");

    return (
        <Wrapper>
            <div className='flex flex-col md:flex-row gap-8 md:gap-4 px-4 md:px-0'>
                {/* Text and Features Section */}
                <div className='w-full md:w-1/2'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 sm:mb-8 md:mb-10 text-center md:text-left'>
                        Flexible solutions for all your needs
                    </h1>
                    <div className='flex relative max-w-[400px] mx-auto md:mx-0'>
                        {/* Vertical Line */}
                        <div className='absolute top-0 bottom-0 w-[5px] bg-gray-200 rounded-full'></div>

                        {/* Features List */}
                        <div className='flex flex-col gap-4 sm:gap-5 relative w-full'>
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-3 pl-2 relative cursor-pointer transition-all duration-500 ease-in-out ${isActive === feature ? 'z-10' : ''}`}
                                    onClick={() => setIsActive(feature)}
                                >
                                    {isActive === feature && (
                                        <div className='absolute left-0 h-full w-[5px] bg-[#1657FF] rounded-full transition-all duration-300 ease-in-out'></div>
                                    )}
                                    <p
                                        className={`text-lg sm:text-xl md:text-2xl ml-5 transition-colors duration-300 ease-in-out ${
                                            isActive === feature ? 'text-black font-semibold' : 'text-gray-500'
                                        }`}
                                    >
                                        {feature}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className='w-full md:w-1/2 flex items-center justify-center'>
                    <img 
                        src={featuresImage} 
                        alt="Features" 
                        className='w-full max-w-[500px] md:max-w-none object-contain'
                    />
                </div>
            </div>
        </Wrapper>
    );
};

export default Features;
