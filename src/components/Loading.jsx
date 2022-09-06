import React from 'react'
import { MagnifyingGlass } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='flex justify-center items-center min-h-screen -mt-5'>
      <MagnifyingGlass
        height='100'
        width='100'
        color='#00000'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
        outerCircleColor=''
        innerCircleColor=''
        barColor=''
        ariaLabel='circles-with-bar-loading'
      />
    </div>
  )
}

export default Loading
