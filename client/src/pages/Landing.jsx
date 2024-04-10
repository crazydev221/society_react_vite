import React from 'react'
import "../styles/Landing.css";
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='w-full xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px] mx-auto py-8'>
      <div className='flex flex-col-reverse w-full gap-4 mx-auto md:flex-row'>
        <div className='flex flex-col gap-3 md:max-w-[50%] w-full align-middle text-center md:text-start px-2'>
          <span className='mt-8 text-2xl font-semibold text-purple-700 md:text-6xl'>
            Welcome to the Living Ai Cancer Research Platform (PurpleAi)
          </span>
          <p className='mt-4 text-xl leading-8 text-gray-600'>
            We are pleased to introduce <span className='text-purple-700'> Purple Ai </span>, a revolutionary Ai platform to help you make better decisions about your child's cancer treatment.
          </p>

          <div className='relative flex w-full gap-4 px-3 py-4 mt-6 align-middle border border-gray-300 rounded-lg'>
            <button>
              <img src="images/icon/search.svg" alt="btnsearch" />
            </button>
            <input
              type="text"
              className="w-full p-0 bg-transparent border-none outline-none"
              placeholder="Start Your Search Here"
            />
            <button>
              <img src="images/icon/arrow-double-right.svg" alt="" />
            </button>
          </div>

          <p className='px-8 text-[13px] text-gray-700'>
            Enter a question, phrase, cancer type, drug name, or other question you may have. <br /> We care about your data in our <span className='underline'>privacy policy</span>.
          </p>

        </div>
        <div className='flex flex-col md:max-w-[50%] w-full px-2 text-center align-middle'>
          <img src="images/home/1.jpg" alt="" />
        </div>
      </div>
      <div className='mt-10 text-center'>
        <p className='font-semibold text-purple-700'>Artificial Intelligence (Ai) has the Potential to Revolutionize Medical Research and Improve Healthcare Outcomes</p>
        <h2 className='mt-6 text-4xl font-semibold'>Knowledge is Power</h2>
        <p className='mt-8 text-xl leading-8 text-gray-600'>
          <span className='font-semibold text-purple-700'>&nbsp; The Purple Society &nbsp;</span>
          has focused the last five years on designing 
          and developing advanced Ai tools for use in pediatric cancer research.
          With our 
          <span className='font-semibold text-purple-700'>&nbsp; Purple Ai &nbsp;</span>
          platform, we’re giving families and physicians 
          the power of knowledge, and we all know: 
          <span className='font-semibold'> knowledge is power! </span>
          This innovative technology provides deep analysis of vast amounts of 
          pediatric cancer research and drug data, giving families the information 
          they need to make informed decisions about their child's treatment. 
          <span className='font-semibold text-purple-700'>&nbsp; Purple Ai &nbsp;</span>
          identifies trends and patterns that would have otherwise gone 
          unnoticed by families without these powerful tools. 
          Additionally, 
          <span className='font-semibold text-purple-700'>&nbsp; Purple Ai &nbsp;</span>
          can be used to help identify potential drug targets 
          for pediatric cancer and to help develop new treatments and therapies, 
          which could ultimately lead to more personalized and effective treatments 
          for our children.
        </p>
        <p className='mt-8 text-xl leading-8 text-gray-600'>
          The Purple Ai platform is like a living, breathing brain, constantly learning from the latest,
          most trusted sources of information in the world of pediatric cancer research.
          It's designed to help you find answers faster, whether you're seeking information about your child's treatment plan,
          drug interactions, or looking to support other families facing the same challenges.
        </p>

        <h2 className='mt-8 text-4xl font-semibold'>As ALWAYS, Our Services Are 100% FREE!</h2>
        <img className='w-full mt-8' src="images/home/2.jpg" alt="" />
        <p className='mt-8 text-lg font-semibold text-purple-700'>We Will Not Let Them Fight Alone.</p>
        <p className='mt-8 text-4xl font-semibold'>We’re here every step of the way</p>
        <p className='w-[60%] mx-auto leading-8 mt-8 text-xl text-gray-600'>
          According to the American Cancer Society, cancer is the second leading cause of death in children 
          under the age of 15 in the United States.
          An estimated 15,270 new cases are expected to be diagnosed in children
          under the age of 15 in the United States in 2023.
          About 1,050 American children under the age of 15 died from cancer in 2022.
        </p>
        <p className='w-[60%] text-gray-700 mx-auto mt-8 mb-4 text-xl font-semibold'>
          To put that into perspective, that is eight 727 planes filled with children crashing
          with no survivors. Do you think the world would take notice if that tragedy was 
          happening each year?
        </p>
        <i className='text-4xl text-gray-700'>
          Well, It is. <br />
        </i>

        <button className='px-8 py-3 font-semibold text-white bg-purple-700 rounded-md mt-28'>
          Donate Now
        </button>
      </div>
    </div>
  )
}

export default Landing