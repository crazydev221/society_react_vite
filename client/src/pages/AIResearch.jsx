import React, { useEffect, useState } from 'react'
import "../styles/AIResearch.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AIResearch = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const text = params.get('search') || "";

  const navigate = useNavigate();
  const [ token ] = useState(JSON.parse(localStorage.getItem("token")) || "");
  const [ searchtext, setSearchText ] = useState(text);

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      navigate('/airesearch?search=' + searchtext);
    }
  }

  useEffect(() => {
    if(token === "") {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }
  }, [token]);

  const w_style = 'xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px]';

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
            placeholder="Start Your Search Here"
          />
          <button>
            <img src="images/icon/arrow-double-right.svg" alt="" />
          </button>
        </div>
        <p className='mt-3 text-sm text-gray-700'>Ask a question or enter a search term.</p>
      </div>
      <div className={`w-full ${w_style} mx-auto flex p-8`}>
        <div className='w-[65%] h-full flex flex-col gap-4 justify-center items-center'>
          <p>a</p>
          <p>b</p>
        </div>
        <div className='w-[35%] h-full flex flex-col justify-center items-center border border-0 border-l-2  border-l-gray-400'>b</div>
      </div>
    </div>
  )
}

export default AIResearch;
