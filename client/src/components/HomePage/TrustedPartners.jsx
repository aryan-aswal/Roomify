import React from 'react'
import Wrapper from '../common/Wrapper'
import { logos } from '../../utils/CompanyLogo'
import Stats from './Stats'

const TrustedPartners = () => {
    return (
        <div className='flex justify-center bg-gray-50 sm:py-12 md:py-16'>
            <Wrapper flexDirection={'flex-col'}>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 sm:mb-8 md:mb-10 text-center px-4 md:px-0'>
                    Used by professionals in
                </h1>
                
                {/* Logo grid container */}
                <div className='grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-10 px-4 md:px-0'>
                    {logos.map((logo, index) => (
                        <div key={index} className='flex justify-center items-center'>
                            <img 
                                src={logo.logo} 
                                alt={logo.name} 
                                className='h-8 sm:h-9 md:h-10 w-24 sm:w-26 md:w-28 object-contain'
                            />
                        </div>
                    ))}
                </div>
                <Stats />
            </Wrapper>
        </div>
    )
}

export default TrustedPartners