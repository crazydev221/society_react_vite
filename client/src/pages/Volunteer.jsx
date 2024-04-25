import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Donate from '../components/Donate';
import { saveVolunteer } from '../services/baseService';

function Volunteer() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [agree, setAgree] = useState(false);

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

        saveVolunteer(info).then(res => {
            if(res.status === 200) {
                toast.success('You are saved as a Volunteer!');
            } else {
                toast.warn('Something went wrong!');
            }
        }).catch(err => {
            console.error('Error saving Volunteer', err);
            toast.error('Connecting Server Error!');
        });
    }

    const w_style = 'xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px]';

    return (
        <div className="w-full">
            <div className={`w-full ${w_style} mx-auto flex flex-col gap-6 py-12`}>
                <div className="flex flex-col gap-6 text-center max-w-[730px] mx-auto py-6">
                    <p className="text-purple-600 font-semibold">
                        It’s Your Time To Give Back
                    </p>
                    <h2 className='text-5xl font-semibold'>
                        Volunteer Today
                    </h2>
                    <p className="text-xl text-gray-600">
                        We’d love to have you as part of the {' '}
                        <span className='text-purple-600'>Purple Family</span>.
                        Please fill out this form and one of our
                        <span className='text-purple-600'>Purple People</span> {' '}
                        will get in touch to get you setup.
                    </p>
                </div>

                <div className="flex flex-col gap-6 max-w-[480px] mx-auto pt-16">
                    <div
                        className='grid grid-cols-1 gap-6 md:grid-cols-2 w-full'
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
                            <p>Message</p>
                        </label>
                        <textarea
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            rows="5"
                            className="px-3 py-2 text-sm text-gray-600 border border-gray-400 rounded-md outline-none w-full"
                            name="message"
                            placeholder="Leave us a message..."
                        >
                        </textarea>
                    </div>

                    <div className="flex gap-1 w-full items-center">
                        <input
                            checked={agree}
                            onChange={handleChanged}
                            type="checkbox"
                            className='w-4 h-4'
                        />
                        <label htmlFor="remember-checkbox">
                            You agree to our friendly <a href='/privacy' className='underline'>privacy policy</a>.
                        </label>
                    </div>

                    <button
                        className="w-full rounded-lg bg-purple-600 text-white font-semibold p-3"
                        onClick={() => handleContact()}
                    >
                        Sign Me Up!
                    </button>
                </div>
            </div>

            <div className='w-full bg-gray-100 py-6'>
                <div className={`w-full max-w-[768px] mx-auto flex flex-wrap gap-6 justify-between items-center p-6`}>
                    <div className="flex flex-col gap-3 justify-center">
                        <p className='text-purple-600'>Contact Us</p>
                        <h1 className='text-3xl font-semibold'>
                            Chat to our friendly team
                        </h1>
                        <p className='text-xl text-gray-600'>
                            We’d love to hear from you! Please get in touch.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-start gap-3">
                        <div className="flex gap-2">
                            <img src="images/icon/map-marker.svg" alt="" />
                            <h5 className='text-xl font-semibold'>Arizona</h5>
                        </div>
                        <p className='text-md text-gray-600'>
                            Scottsdale, Arizona <br />
                            help(at)werpurple.org <br />
                            602.326.7723
                        </p>
                    </div>
                </div>
            </div>

            <img className='w-full' src='images/volunteer/1.jpg' alt='volunteer1' />

            <Donate />
        </div>
    )
}

export default Volunteer;
