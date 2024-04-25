import React from 'react'
import { URLS } from '../constants/consts';

function Donate() {
  return (
    <a href={URLS.donateURL} className='flex items-center justify-center'>
        <button className='px-8 py-3 mt-24 mb-12 font-semibold text-white bg-purple-600 rounded-md'>
            Donate Now
        </button>
    </a>
  )
}

export default Donate;