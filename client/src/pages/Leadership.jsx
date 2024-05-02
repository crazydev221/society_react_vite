import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

import { getLeadershipTeamList, getLeadershipTestimonalList, getPublicContent } from '../services/baseService';
import { URLS } from '../constants/consts';
import { Carousel } from 'react-responsive-carousel';
import Donate from '../components/Donate';

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
];

function Leadership() {

    const [content, setContent] = useState('');
    const [leaderTeams, setLeaderTeams] = useState([]);
    const [leaderTestimonalTeams, setLeaderTestimonalTeams] = useState([]);

    useEffect(() => {
        getPublicContent().then(response => {
            setContent(response.data);
            console.log(response.data);
        }).catch(err => {
            toast.error('Connecting server Error!');
            console.error('Error connect server', err);
        });

        getLeadershipTeamList(1).then((response) => {
            setLeaderTeams(response.data.leadershipteams);
            console.log(response.data.leadershipteams);
        }).catch(err => {
            toast.error('Connecting Server Error!');
            console.error('Error get leadership teams', err);
        });

        getLeadershipTestimonalList(1).then(response => {
            setLeaderTestimonalTeams(response.data.leadershiptestimonials);
            console.log('setLeaderTestimonalTeams', response.data.leadershiptestimonials);
        }).catch(err => {
            toast.error('Connecting Server Error!');
            console.error('Error get leadership testimonal teams', err);
        });
    }, []);

    const w_style = 'xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px]';

    return (
        <div className={`w-full ${w_style} mx-auto text-center py-12 flex flex-col gap-9`}>
            <div className='flex flex-col gap-6 mt-6'>
                <p className='font-semibold text-purple-600'>
                    Our team
                </p>
                <h1 className='text-5xl font-semibold'>
                    Leadership team
                </h1>
                <p className='text-gray-500'>
                    One Person CAN Make A Difference!
                </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
                {
                    leaderTeams.map((leader, index) => (
                        <div
                            className="flex flex-col items-center justify-center w-full h-full gap-3 p-3 rounded-md shadow-md"
                            key={index}
                        >
                            <img
                                className='object-cover w-[100px] h-[100px] rounded-full'
                                src={URLS.imageURL + '/uploads/leadershipteams/' + leader.picture}
                                alt={leader.picture}
                            />
                            <h5 className='text-lg font-semibold'>
                                {leader.name}
                            </h5>
                            <p className='text-purple-600'>
                                {leader.designation}
                            </p>
                            <p className='py-3 text-gray-600'>
                                {leader.description}
                            </p>
                            <div className="flex items-center justify-center gap-3">
                                <a href={leader.twitter}>
                                    <img src="images/icon/team-social/twitter.svg" alt="" />
                                </a>
                                <a href={leader.facebook}>
                                    <img src="images/icon/team-social/facebook.svg" alt="" />
                                </a>
                                <a href={leader.instagram}>
                                    <img src="images/icon/team-social/instagram.svg" alt="" />
                                </a>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="flex flex-col items-center justify-center gap-3 my-9">
                <p className='font-semibold text-purple-600'>
                    Your Support Matters
                </p>
                <h2 className='text-3xl font-semibold'>
                    Donations that fit your heart & budget
                </h2>
            </div>

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

            <Carousel
                interval="4000" transitionTime="1000"
                showIndicators={false} thumbWidth="95px"
                infiniteLoop
            >
                {
                    leaderTestimonalTeams.map((testimonal, index) => (
                        <div
                            className='flex justify-between h-full gap-3 text-white bg-purple-600 rounded-lg p-9'
                            key={index}
                        >
                            <div className='flex flex-col w-[60%] justify-center text-start gap-3'>
                                <h2 className='text-xl font-semibold'>
                                    {testimonal.description}
                                </h2>
                                <h5>— {testimonal.name}</h5>
                                <p className='text-lg font-semibold text-gray-300'>
                                    {testimonal.note}
                                </p>
                            </div>
                            <div className='flex flex-col justify-center items-center w-[40%]'>
                                <div dangerouslySetInnerHTML={{ __html: testimonal.content }} />
                            </div>
                        </div>
                    ))
                }
            </Carousel>

            <Donate />
        </div>
    )
}

export default Leadership;
