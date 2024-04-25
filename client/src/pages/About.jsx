import React from 'react'
import Donate from '../components/Donate';
import { useNavigate } from 'react-router-dom';
import { URLS } from '../constants/consts';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col items-center mx-auto w-full xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px] py-8 px-3 gap-9'>
            <div className='flex flex-col w-full gap-4'>
                <img src='images/about/1.png' alt='about1' />
                <div className='flex flex-col gap-4'>
                    <span className='font-semibold text-purple-700'>
                        No Borders. We Help Every Child Diagnosed with Pediatric Cancer
                    </span>
                    <div className='flex flex-col items-center justify-between gap-3 md:flex-row'>
                        <h1 className='text-2xl font-semibold md:text-4xl'>
                            We Just Do Things Different
                        </h1>
                        <div className='flex flex-wrap justify-center gap-6'>
                            <button 
                                onClick={() => navigate('/ourwork')}
                                className='p-4 font-semibold text-white bg-purple-500 rounded-md'
                            >
                                View Our Work
                            </button>
                            <button 
                                onClick={() => navigate('/leadership')}
                                className='p-3 font-semibold text-white bg-purple-500 rounded-md'
                            >
                                Meet The Leardership Team
                            </button>
                        </div>
                    </div>
                    <p className='w-[70%] text-[20px] text-gray-600'>
                        We’ve already helped thousands of families research and stay together during treatment.
                        Remarkable results, better outcomes, and the strength of family.
                    </p>
                </div>
            </div>
            <div className='flex flex-col w-full py-6 text-lg text-gray-500 sm:flex-row'>
                <div className='w-full sm:w-[50%] flex flex-col gap-6 px-3'>
                    <p>
                        Welcome to the Purple Society! We hope you will find the advanced platform we have put 
                        together here an important asset for your fight against childhood cancer. Take some time 
                        and explore our Purple Ai. Use this powerful new platform to research and educate yourself 
                        to better face the battle at hand.
                    </p>
                    <p>
                        Every day, countless families, scientists, caregivers, donors and volunteers contribute 
                        funds, time, energy and passion to our mission to add hope and support for those children 
                        battling childhood cancers. Please take some time to give and support our lifesaving mission.
                    </p>
                    <p>
                        We have achieved remarkable progress in our work to provide resources for the childhood
                        cancer community, but the lives of children with cancer are still being cut short.
                        We urgently need the public’s continued support. We will not rest until we find a cure.
                    </p>
                    <p>
                        It’s easy to take action. In just a few minutes, you can refer a child, family, or friend, 
                        you can volunteer at a Purple Event, 
                        <a href={URLS.donateURL}>
                            <span className='text-purple-700'>make an online donation</span>
                        </a>
                        , become a Purple Partner, find a Childhood Cancer Clinical Trial, or advocate for 
                        public policy changes benefiting those with childhood cancer.
                    </p>
                </div>
                <div className='w-full sm:w-[50%] flex flex-col gap-6 px-3'>
                    <p>
                        We’re proud to have our website be ranked as one of the best non-profits websites in America 
                        by the International Academy of the Visual Arts and to have been voted The Most influential 
                        Non-Profit In Arizona by Arizona Foothills magazine.
                    </p>
                    <p>
                        You can be a part of our Purple world by following us on Twitter, view the latest videos 
                        on our YouTube and Vimeo channels, and join the conversation on our Facebook and Instagram pages.
                        We look forward to working with you. The Purple Society proposes to participate in the 
                        conquest of childhood cancer by supporting collaborative research to identify appropriate targets, 
                        discover ways to hit these targets, and carry out clinical trials using the infrastructure 
                        of the national cooperative group.
                    </p>
                    <p className='text-lg font-semibold text-purple-600 '>
                        Remember, One Person CAN Make A Difference!
                    </p>
                </div>
            </div>
            <div className='flex flex-col w-full gap-6 py-6 text-lg md:flex-row'>
                <div className='w-full md:w-[50%] flex flex-col justify-center gap-3 px-3'>
                    <p className='font-semibold text-purple-700 text-md'>
                        You Can Be Part of the Cure!
                    </p>
                    <h2 className='text-4xl font-semibold'>
                        We’re just getting started
                    </h2>
                    <p className='py-6 text-xl text-gray-600'>
                        Our philosophy is simple — One Person CAN Make A Difference!
                    </p>
                    <div className='flex flex-wrap justify-center gap-6 text-md'>
                        <button 
                            onClick={() => navigate('/principles')} 
                            className='p-2 text-[16px] font-semibold bg-white border border-gray-300 rounded-md text-md'
                        >
                            Read Our Principles
                        </button>
                        <button 
                            onClick={() => navigate('/volunteer')} 
                            className='p-2 text-[16px] font-semibold text-white bg-purple-500 rounded-md'
                        >
                            Volunteer
                        </button>
                    </div>
                </div>
                <div className='w-full md:w-[50%] flex flex-col gap-3 px-3'>
                    <img src='images/about/2.png' alt='about2' />
                </div>
            </div>
            <div className='flex flex-col w-full py-6 text-lg text-gray-500 sm:flex-row'>
                <div className='w-full sm:w-[50%] flex flex-col gap-6 px-3'>
                    <p>
                        Once upon a time, in a world where childhood cancer rates were
                        alarmingly high, a family fighting pediatric cancer came together
                        to form a charity dedicated to finding a cure.
                        This charity, known as the " <span className='font-semibold text-purple-600'>The Purple Society</span> ,"
                        was driven by a single mission: <b>to end the suffering of children and their families affected by cancer.</b>
                    </p>
                    <p>
                        Nitalia Conti, the 12-year-old visionary founder, saw the disparity in resources
                        available to children and took action. She understood the importance of family
                        and wanted to ensure that no one ever had to make these tough decisions alone.
                        Nitalia’s sisters and her parents, who were determined to support her vision,
                        sprung into action and setup the 501(c)3 Foundation that would connect families
                        with the information they needed to make informed decisions about their child's
                        treatment options. And that was just the beginning!
                    </p>
                    <p>
                        Nitalia and her family brought together a team of scientists, doctors, and advocates
                        who had all been personally impacted by cancer. Nitalia recognized the need for better
                        access to cutting-edge research technology, as well as the power of community support
                        and hope in times of struggle.
                    </p>
                    <p>
                        By offering both, <span className='font-semibold text-purple-600'>The Purple Society</span>
                        is setting the stage for a brighter future for ALL families facing childhood cancer.
                    </p>
                </div>
                <div className='w-full sm:w-[50%] flex flex-col gap-6 px-3'>
                    <p>
                        The organization's commitment to staying at the forefront of research and providing
                        a supportive network for families speaks to a higher purpose, one that transcends the
                        limitations of the present and reaches towards a better tomorrow.
                    </p>
                    <p>
                        After working for over a decade, it became a ray of hope for families affected by cancer.
                        Every step forward in their research was a step closer to Nitalia's dream of a world free of
                        childhood cancer. Despite Nitalia's passing in 2011, the organization continues to carry
                        on her legacy, working tirelessly to fulfill her vision of a world where no child has to
                        suffer the devastating effects of cancer.
                    </p>
                    <p>
                        Nitalia's story serves as a reminder that each one of us has the power to bring about
                        positive change in the world, regardless of age. She always said
                        “<b>One Person CAN Make A Difference</b>”!
                    </p>
                    <p>
                        Though she may have left us, her spirit lives on in the ongoing efforts of
                        <span className='font-semibold text-purple-600'>The Purple Society</span> .
                        Let us follow in Nitalia's footsteps and work towards creating a world where
                        every child has the opportunity to live a healthy and fulfilling life.
                    </p>
                    <i className='font-semibold text-purple-600'>
                        Please Help Us Fulfill Nitalia’s Dream!
                    </i>
                </div>
            </div>
            <Donate />
        </div>
    )
}

export default About;