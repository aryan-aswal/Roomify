import React from 'react'
import Wrapper from '../common/Wrapper'
import HeroBannerImage from '../../assets/HeroBanner.png'
import { Link } from 'react-router-dom'

const HeroBanner = () => {
    return (
        <Wrapper>
            {/* HeroBanner Section */}
            <div className='flex flex-col md:flex-row justify-between gap-8 md:gap-4 mb-6 md:mb-10 px-4 md:px-0'>
                {/* Text Content */}
                <div className='w-full md:w-3/6 flex flex-col items-center md:items-start text-center md:text-left'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 md:mb-5 leading-[1.3]'>
                        Supercharge your <span className='text-[#1657FF]'>meetings</span> and make it effective
                    </h1>
                    <p className='text-sm text-gray-500 mb-4 md:mb-5 max-w-[90%] md:max-w-none'>
                        Experience the future of virtual communication today. 
                        <br className='hidden md:block' /> 
                        Say Hello to a whole new way of connecting!
                    </p>
                    <Link to={'/meeting'}>
                        <button className='bg-[#1657FF] rounded-full py-2.5 sm:py-3 px-5 sm:px-6 text-white hover:bg-blue-500 hover:scale-95 transform transition duration-300 font-semibold tracking-wider text-sm sm:text-base'>
                            Start meeting now
                        </button>
                    </Link>
                </div>

                {/* Image */}
                <div className='w-full md:w-3/6 mt-4 md:mt-0'>
                    <img 
                        src={HeroBannerImage} 
                        alt="Hero Banner"
                        className='h-full w-full aspect-video object-contain' 
                    />
                </div>
            </div>
        </Wrapper>
    )
}

export default HeroBanner