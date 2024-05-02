import React, { useState } from 'react'
import Donate from '../components/Donate';
import { contactTeam } from '../services/baseService';
import { toast } from 'react-toastify';

var topic_list = [
    'New Diagnosis',
    'Start a Purple in Your Area',
    'Research Request',
    'Junior Purple Society',
    'Support',
    'Other'
];

function Contact() {

    const [firstName, setFitstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [topic, setTopic] = useState('');

    const handleChange = (topic_str) => {
        const topics = topic.split(',');
        if(topics.includes(topic_str)) {
            var index = topics.indexOf(topic_str);
            topics.splice(index, 1);
            setTopic(topics.join(','));
        } else {
            if(topic === '') {
                setTopic(topic_str);
            } else {
                setTopic(topic + ',' + topic_str);
            }
        }
    }

    const handleContact = () => {
        const sendData = {
            first_name: firstName,
            last_name: lastName,
            email,
            phone: phoneNumber,
            message,
            topic,
        };
        contactTeam(sendData).then(resposne => {
            toast.success('Your message was sent successfully!');
        }).catch(err => {
            toast.error("Couldn't send your message, try again");
            console.error('Error sending contact', err);
        });
    }

    const w_style = 'xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px]';

    return (
        <div className={`w-full ${w_style} mx-auto px-3 pt-12 pb-6`}>
            <div className='flex flex-col gap-6'>
                <p className='font-semibold text-purple-600'>
                    Contact Us
                </p>
                <h1 className='text-4xl font-semibold'>
                    We’d love to hear from you
                </h1>
                <p className='text-xl text-gray-600'>
                    Our dedicated team is always here to help 24/7.
                </p>
            </div>

            <div className='grid grid-cols-4 gap-6 px-6 py-12'>
                <div className='flex flex-col items-start justify-center w-full h-full gap-6 p-4 bg-gray-100 rounded-lg'>
                    <img src='images/icon/contact1.svg' alt='contact1' />
                    <p className='text-lg font-semibold'>
                        Chat to research
                    </p>
                    <p className='text-gray-500'>
                        Speack to our friendly team.
                    </p>
                    <p className='font-semibold text-purple-600'>
                        research@werpurple.com
                    </p>
                </div>
                <div className='flex flex-col items-start justify-center w-full h-full gap-6 p-4 bg-gray-100 rounded-lg'>
                    <img src='images/icon/contact1.svg' alt='contact1' />
                    <p className='text-lg font-semibold'>
                        Chat to support
                    </p>
                    <p className='text-gray-500'>
                        We're here to help    
                    </p>
                    <p className='font-semibold text-purple-600'>
                        support@werpurple.com
                    </p>
                </div>
                <div className='flex flex-col items-start justify-center w-full h-full gap-6 p-4 bg-gray-100 rounded-lg'>
                    <img src='images/icon/contact1.svg' alt='contact1' />
                    <p className='text-lg font-semibold'>
                        Mail donations to
                    </p>
                    <p className='text-gray-500'>
                        Our office HQ.
                    </p>
                    <p className='font-semibold text-purple-600'>
                        6140 E.Clinton St.
                    </p>
                    <p className='font-semibold text-purple-600'>
                        Scottsdale, AZ, 85254
                    </p>
                </div>
                <div className='flex flex-col items-start justify-center w-full h-full gap-6 p-4 bg-gray-100 rounded-lg'>
                    <img src='images/icon/contact1.svg' alt='contact1' />
                    <p className='text-lg font-semibold'>
                        Call Us
                    </p>
                    <p className='text-gray-500'>
                        Mon-Sun from 8am to 5pm.
                    </p>
                    <p className='font-semibold text-purple-600'>
                        +1 (602) 326-7723
                    </p>
                </div>
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div>
                    <h2 className='py-6 text-2xl font-semibold'>
                        Let’s fight childhood cancer, together
                    </h2>
                    <p className='py-6'>
                        Send us a message and we will get right back to you!
                    </p>
                    <div
                        className='grid grid-cols-1 gap-4 p-3 md:grid-cols-2'
                    >
                        <div className='w-full'>
                            <label>First Name</label>
                            <input
                                value={firstName}
                                onChange={e => setFitstName(e.target.value)}
                                className='w-full p-3 border border-gray-300 rounded-md'
                                placeholder='First Name'
                                name='firstname'
                            />
                        </div>
                        <div className='w-full'>
                            <label>Last Name</label>
                            <input
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                className='w-full p-3 border border-gray-300 rounded-md'
                                placeholder='Last Name'
                                name='lastname'
                            />
                        </div>
                        <div className='w-full md:col-span-2'>
                            <label>Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full p-3 border border-gray-300 rounded-md'
                                placeholder='Email'
                                name='email'
                            />
                        </div>
                        <div className='w-full md:col-span-2'>
                            <label>Phone number</label>
                            <input
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                className='w-full p-3 border border-gray-300 rounded-md'
                                placeholder='Phone Number'
                                name='phonenumber'
                            />
                        </div>

                        <div className='w-full md:col-span-2'>
                            <label>Message</label>
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
                    </div>
                    <div className='flex flex-col w-full gap-2 p-3 text-gray-600'>
                        <label>Topic</label>
                        <div className='w-full'>
                            <input 
                                checked={topic.includes(topic_list[0])}
                                onChange={e => handleChange(topic_list[0])}
                                type='checkbox'
                                className='w-4 h-4 mr-1'
                            /> {topic_list[0]}
                        </div>
                        <div className='w-full'>
                            <input 
                                checked={topic.includes(topic_list[1])}
                                onChange={e => handleChange(topic_list[1])}
                                type='checkbox'
                                className='w-4 h-4 mr-1'
                            /> {topic_list[1]}
                        </div>
                        <div className='w-full'>
                            <input 
                                checked={topic.includes(topic_list[2])}
                                onChange={e => handleChange(topic_list[2])}
                                type='checkbox'
                                className='w-4 h-4 mr-1'
                            /> {topic_list[2]}
                        </div>
                        <div className='w-full'>
                            <input 
                                checked={topic.includes(topic_list[3])}
                                onChange={e => handleChange(topic_list[3])}
                                type='checkbox'
                                className='w-4 h-4 mr-1'
                            /> {topic_list[3]}
                        </div>
                        <div className='w-full'>
                            <input 
                                checked={topic.includes(topic_list[4])}
                                onChange={e => handleChange(topic_list[4])}
                                type='checkbox'
                                className='w-4 h-4 mr-1'
                            /> {topic_list[4]}
                        </div>
                        <div className='w-full'>
                            <input 
                                checked={topic.includes(topic_list[5])}
                                onChange={e => handleChange(topic_list[5])}
                                type='checkbox'
                                className='w-4 h-4 mr-1'
                            /> {topic_list[5]}
                        </div>
                    </div>

                    <button
                        onClick={handleContact}
                        className='w-full py-3 font-semibold text-white bg-purple-600 border-purple-800 rounded-md'
                    >
                        Send
                    </button>
                </div>
                <img src='images/contact/1.jpg' alt='contact1' />
            </div>

            <Donate />

        </div>
    )
}

export default Contact;
