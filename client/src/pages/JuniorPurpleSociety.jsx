import React, { useEffect, useState } from 'react';
import { getJuniorPurpleSocietyList, getPubicPageById, saveJuniorPurpleSociety } from '../services/baseService';
import { toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';
import { URLS } from '../constants/consts';
import Donate from '../components/Donate';

function JuniorPurpleSociety() {
    const [junior, setJunior] = useState('');
    const [juniorPurpleSocieties, setJuniorPurpleSocieties] = useState([]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [agree, setAgree] = useState(false);

    useEffect(() => {
        getPubicPageById('646d0d2b0a5a263e48d16ff1').then(res => {
            setJunior(res.data.content);
        }).catch(err => {
            toast.error('Connecting Server Error');
            console.error('Error get junior', err);
        });

        getJuniorPurpleSocietyList(1).then(res => {
            setJuniorPurpleSocieties(res.data.juniorpurplesocieties);
        })
    }, []);

    const handleChanged = () => {
        setAgree(!agree);
    }

    const handleContact = () => {
        if (!agree || !firstName || !lastName || !email || !phoneNumber || !message) {
            toast.warn('Fill out the all information!');
            return;
        }
        const info = {
            first_name: firstName,
            last_name: lastName,
            email,
            phone: phoneNumber,
            message,
        };
        saveJuniorPurpleSociety(info).then(res => {
            if (res.status === 200) {
                toast.success('Your message is sent');
            } else {
                toast.warn('Something went wrong!');
            }
        }).catch(err => {
            console.error('Error contact', err);
            toast.error('Connecting Server Error!');
        });
    }

    const w_style = 'xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px]';

    return (
        <div className={`w-full ${w_style} mx-auto flex flex-col gap-6 py-9`}>
            <Carousel
                className='px-2 sm:px-6 md:px-12'
                interval="4000" transitionTime="1000" id="big-slider"
                showIndicators={false} thumbWidth="95px"
                infiniteLoop autoPlay
            >
                {
                    juniorPurpleSocieties.map((junior_purple, index) => (
                        <div key={index} className='relative'>
                            <img
                                src={URLS.imageURL + '/uploads/juniorpurplesocieties/' + junior_purple.picture}
                                alt=''
                            />
                            <h4 className='absolute bottom-0 w-full p-3 text-white bg-black bg-opacity-50'>
                                {junior_purple.title}
                            </h4>
                        </div>
                    ))
                }
            </Carousel>
            <div className="flex flex-col gap-6 w-full max-w-[1000px] px-3 sm:px-6 md:px-18 mx-auto">
                <img
                    className='px-3 sm:px-6 md:px-12'
                    src="images/our-work/ptrn3.png"
                    alt=""
                />
                <div
                    className="text-center heading-one"
                    dangerouslySetInnerHTML={{ __html: junior }}
                />
            </div>
            <div className="flex flex-col gap-6 text-center">
                <p className="font-semibold text-purple-600">
                    Start Your Own Junior Purple Society at Your School of College!
                </p>
                <h2 className='text-3xl font-semibold'>
                    It’s Easy To Get Started
                </h2>
                <p className="text-lg text-gray-600">
                    We’d love to have you as part of the Purple Family.
                    Please fill out this form and one of our Jr.
                    Purple People will get in touch to get you setup.
                </p>
            </div>

            <div className="flex flex-col gap-6 max-w-[480px] mx-auto pt-20">
                <div
                    className='grid w-full grid-cols-1 gap-6 md:grid-cols-2'
                >
                    <div className='w-full'>
                        <label>First Name</label>
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded-md'
                            placeholder='First Name'
                            name='firstname'
                        />
                    </div>
                    <div className='w-full'>
                        <label>Last Name</label>
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded-md'
                            placeholder='Last Name'
                            name='lastname'
                        />
                    </div>
                </div>
                <div className='w-full'>
                    <label>Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-3 border border-gray-300 rounded-md'
                        placeholder='Email'
                        name='email'
                    />
                </div>
                <div className='w-full'>
                    <label>Phone number</label>
                    <input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className='w-full p-3 border border-gray-300 rounded-md'
                        placeholder='Phone Number'
                        name='phonenumber'
                    />
                </div>

                <div className='flex flex-col w-full'>
                    <label>
                        <p>
                            Tell us a bit about your school/college and 
                            why you would like to start a Jr. Purple Society:
                        </p>
                    </label>
                    <textarea
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        rows="5"
                        className="w-full px-3 py-2 text-sm text-gray-600 border border-gray-400 rounded-md outline-none"
                        name="message"
                        placeholder="Leave us a message..."
                    >
                    </textarea>
                </div>

                <div className="flex items-center w-full gap-1">
                    <input
                        checked={agree}
                        onChange={handleChanged}
                        type="checkbox"
                        className='w-4 h-4'
                    />
                    <label htmlFor="remember-checkbox">
                        You agree to our 
                        friendly <a href='/privacy' className='underline'>privacy policy</a> .
                    </label>
                </div>

                <button
                    className="w-full p-3 font-semibold text-white bg-purple-600 rounded-lg"
                    onClick={() => handleContact()}
                >
                    Get Started!
                </button>
            </div>

            <Donate />
        </div>
    )
}

export default JuniorPurpleSociety;