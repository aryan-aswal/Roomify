import React from 'react'
import StatMetrics from '../../utils/StatMetrics.json'

const Stats = () => {
  return (
    <div className='flex flex-wrap justify-center mt-10 gap-8 md:gap-12 lg:gap-20 px-4'>
      {
        StatMetrics.map((stat, index) => (
          <div key={index} className='flex justify-center items-center'>
            <div className='flex flex-col items-center text-center'>
              <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold'>{stat.number}</h1>
              <p className='text-gray-500 text-sm md:text-base'>{stat.description}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Stats