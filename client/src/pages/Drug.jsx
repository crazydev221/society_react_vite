import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Donate from '../components/Donate';

function Drug() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const text = params.get('search') || "";
  
    const navigate = useNavigate();
  
    const [token] = useState(JSON.parse(localStorage.getItem("token")) || "");
    const [searchtext, setSearchText] = useState(text);
  
    const w_style = 'xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px]';
  
    useEffect(() => {
      if (token === "") {
        navigate("/login");
        toast.warn("Please login first to access dashboard");
      }
    }, [token]);

    useEffect(() => {
        handleIncrease();
    }, []);
  
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        navigate('/drugresearch?search=' + searchtext);
      }
    }

    const handleIncrease = () => {
        const countElements = document.querySelectorAll('.count');
        countElements.forEach(countElement => {
            const maxNum = parseInt(countElement.getAttribute('maxnum'), 10);
            const timeInSeconds = parseFloat(countElement.getAttribute('time'));
            const increment = maxNum / (timeInSeconds * 1000 / 20); // Increment value

            let currentNum = 0;
            const interval = setInterval(() => {
            currentNum += increment;
            
            // Check if currentNum exceeds maxNum
            if (currentNum >= maxNum) {
                currentNum = maxNum;
                clearInterval(interval); // Stop the interval
            }

            // Update the displayed number
            countElement.textContent = Math.floor(currentNum);
            }, 20);
        });
    }
  
    return (
      <div className='w-full min-h-[70vh] pb-8 mx-auto'>
        <div className='flex flex-col items-center justify-center pt-12 pb-8 bg-gray-100'>
          <div className={`flex w-full ${w_style} gap-4 px-3 py-2 mt-6 align-middle bg-white border border-gray-300 rounded-lg`}>
            <input
              type="text"
              value={searchtext}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-0 bg-transparent border-none outline-none"
              placeholder="Enter a drug name to search"
            />
            <button onClick={() => navigate('/drugresearch?search=' + searchtext)}>
              <img src="images/icon/arrow-double-right.svg" alt="" />
            </button>
          </div>
          <p className='mt-3 text-sm text-gray-700'>
            Enter a drug name.
          </p>
        </div>
        <div className={`flex w-full ${w_style} mx-auto gap-6 px-3 py-2 mt-9`}>
            <div className='w-[47%] px-3'>
                <img src='images/guide/1.jpg' alt='guide1' />
            </div>
            <div className='w-[53%] flex flex-col px-3 gap-6'>
                <p className='text-lg font-semibold text-purple-700'>
                    The Purple Drug Guide is a unique drug research tool that combines detailed 
                    drug data with comprehensive drug target information. No other system is as 
                    dynamic, built from the ground up to make it easy to quickly find, learn and 
                    understand complex medications, their pricing, and their interactions.
                </p>
                <p className='text-5xl font-semibold'>
                    We’re only just getting started!
                </p>
                <div className='flex justify-between px-12 mt-9'>
                    <p className='text-6xl font-semibold text-purple-700'>
                        <span className="count" maxnum="1000" time="3">0</span> +
                        <p className="text-lg text-gray-600 fz-18">Drug Entries</p>
                    </p>
                    <p className='text-6xl font-semibold text-purple-700'>
                        <span className="count" maxnum="3000" time="3">0</span> +
                        <p className="text-lg text-gray-600 fz-18">DFDA Approved Drugs</p>
                    </p>
                </div>

                <div className='flex justify-between px-12 mt-9'>
                    <p className='text-6xl font-semibold text-purple-700'>
                        <span className="count" maxnum="8000" time="3">0</span> +
                        <p className="text-lg text-gray-600 fz-18">Experimental Drugs</p>
                    </p>
                    <p className='text-6xl font-semibold text-purple-700'>
                        <span className="count" maxnum="200" time="3">0</span> +
                        <p className="text-lg text-gray-600 fz-18">Experimental Drugs</p>
                    </p>
                </div>                
            </div>
        </div>
        <Donate />
      </div>
    );
}

export default Drug;
