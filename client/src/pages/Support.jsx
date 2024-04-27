import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

import Donate from '../components/Donate';
import { getPubicPageById } from '../services/baseService';

import '../styles/Support.css';
import { URLS } from '../constants/consts';

const supports = [
    {
        image: 'images/support/1.jpg',
        description: "“We’ve really been blessed to work with the Purple Society. Without them I don't know if my son would still be here”",
        name: 'R. Wilson',
        disability: 'Brain Cancer',
        location: 'Philadelphia, PA'
    },
    {
        image: 'images/support/2.jpg',
        description: " “We’ve really been blessed to work with the Purple Society. Without them I don't know if my son would still be here”",
        name: 'R. Wilson',
        disability: 'Brain Cancer',
        location: 'Philadelphia, PA'
    },
    {
        image: 'images/support/3.jpg',
        description: "“We’ve really been blessed to work with the Purple Society. Without them I don't know if my son would still be here”",
        name: 'R. Wilson',
        disability: 'Brain Cancer',
        location: 'Philadelphia, PA'
    }
];

const donations = [
    {
        title: 'Purple Love',
        badge: false,
        content: '$10',
        period: 'per month',
        subtitle: 'Purple Love Support'
    },
    {
        title: 'Purple Help',
        badge: true,
        badgeName: 'Popular',
        content: '$20',
        period: 'per month',
        subtitle: 'Purple Help Support'
    },
    {
        title: 'Purple Heart',
        badge: false,
        content: '$40',
        period: 'per month',
        subtitle: 'Purple Heart Support'
    },
    {
        title: 'Purple Army',
        badge: false,
        content: '$50',
        period: 'per month',
        subtitle: 'Purple Army Support'
    },
    {
        title: 'Purple Warrior',
        badge: false,
        content: '$100',
        period: 'per month',
        subtitle: 'Purple Warrior Support'
    },
    {
        title: 'Give What You Can',
        badge: false,
        content: 'Custom',
        period: '',
        subtitle: 'One Time Donation'
    },
]

function Support() {
    const [support1, setSupport1] = useState('');
    const [support2, setSupport2] = useState('');
    const [support3, setSupport3] = useState('');

    useEffect(() => {
        getPubicPageById('6465fd48da621430f87af451').then(res => {
            setSupport1(res.data.content);
        }).catch(err => {
            toast.error('Errot get page', err);
            console.error('Error get support 1', err);
        });
        getPubicPageById('6465fd7ada621430f87af454').then(res => {
            setSupport2(res.data.content);
            console.log(res.data.content);
        }).catch(err => {
            toast.error('Errot get page', err);
            console.error('Error get support 2', err);
        });
        getPubicPageById('6465fdbada621430f87af457').then(res => {
            setSupport3(res.data.content);
            console.log(res.data.content);
        }).catch(err => {
            toast.error('Errot get page', err);
            console.error('Error get support 3', err);
        });
    }, []);

    const w_style = 'xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px]';

    return (
        <div className={`w-full ${w_style} mx-auto flex flex-col gap-6 px-6 py-12`}>
            <div className="flex items-center justify-between gap-6">
                <div className='support1 w-[55%]'>
                    <div dangerouslySetInnerHTML={{ __html: support1 }} />
                </div>
                <div className='flex flex-col gap-3 w-[45%] max-w-[300px]'>
                    <img src="images/logo2.png" alt="" />
                    <a href="#" className='p-3 font-semibold text-center text-white bg-purple-600 rounded-md'>
                        Read How Purple Ai Is Helping Families
                    </a>
                </div>
            </div>

            <div className="flex gap-3 overflow-x-auto">
                {
                    supports.map((support, index) => (
                        <div key={index} className="min-w-[450px] support-slider relative flex flex-col gap-3">
                            <img className='w-full h-full' src={support.image} alt='3' />
                            <div className="absolute p-3 bg-gray-400 overlay left-3 bottom-3 right-3 bg-opacity-70">
                                <p className='font-semibold text-purple-600'>
                                    {support.description}
                                </p>
                                <p className="my-3 text-xl font-semibold text-white">
                                    {support.name}
                                </p>
                                <p className='font-semibold text-white'>
                                    {support.disability}
                                </p>
                                <p className='font-semibold text-white'>
                                    {support.location}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div
                className='text-center support1 max-w-[760px] mx-auto my-6'
                dangerouslySetInnerHTML={{ __html: support2 }}
            />

            <div className='flex flex-col items-center justify-center gap-3 support1'>
                <span className='text-sm font-semibold'>Your Support Matters</span>
                <h2>Donations that fit your heart & budget</h2>
                <div className="grid w-full grid-cols-3 gap-6">
                    {
                        donations.map((donation, index) => (
                            <div key={index} className="flex flex-col gap-3 p-6 border rounded-lg shadow-lg text-start">
                                <p className='text-lg font-semibold text-gray-600'>
                                    {donation.title}
                                </p>
                                <h3 className="text-6xl font-semibold">
                                    {donation.content} 
                                    <span className='text-sm font-semibold text-gray-600'>
                                        {donation.period}
                                    </span>
                                </h3>
                                <p className='mb-4 text-gray-600'>
                                    {donation.subtitle}
                                </p>
                                <a href={URLS.donateURL}>
                                    <button className="w-full p-3 font-semibold text-white bg-purple-600 rounded-md">
                                        Sign Me Up!
                                    </button>
                                </a>
                            </div>
                        ))
                    }
                </div>
            </div>
            
            <div className='my-3 text-center support1'
                dangerouslySetInnerHTML={{__html: support3}}
            />
            <Donate />
        </div >
    )
}

export default Support;
