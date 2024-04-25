import React from 'react';

function NoResult() {
  return (
    <div className='flex flex-col items-center justify-center w-full gap-6 px-12 text-center'>
        <img src='images/no-search.png' alt='nosearch' />
        <h1 className='text-xl font-semibold'>No Research Found</h1>
        <p>
            We apologize that your search did not yield any results.
            Purple AI has logged the search term and notified our research team.
            We understand that finding the information you need, especially
            when it comes to your child’s health, is the most important thing.
        </p>
        <p>
            There could be a number of reasons why your search didn’t return any results.
            It’s possible that the information you are looking for is not yet available 
            on our website or not included in our database.
        </p>
        <p>
            We want to ensure that you have access to the most up-to-date and 
            accurate information about childhood cancer, so please do not hesitate 
            to reach out to us directly for more information or support.
            Our team is here to help and will be more than happy to assist you 
            in any way we can.
        </p>
    </div>
  )
}

export default NoResult;
