import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import { ReactCountryDropdown } from 'react-country-dropdown';
import { toast } from 'react-toastify';

import AuthService from '../services/authService';
import { inviteUsers } from '../services/baseService';

function Profile() {
    const [token] = useState(JSON.parse(localStorage.getItem("token")) || "");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [states, setStates] = useState('');
    const [postcode, setPostCode] = useState('');
    const [country, setCountry] = useState('');
    const [countrycode, setCountryCode] = useState('');

    const [mysite, setMySite] = useState('');
    const [facebook, setFaceBook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [gofund, setGoFund] = useState('');
    const [description, setDescription] = useState('');

    const myinfo = JSON.parse(localStorage.getItem('user'));

    const [inviteEmails, setInviteEmails] = useState(['', '']);
    const [inviteNames, setInviteNames] = useState(['', '']);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (token === "") {
            navigate("/login");
            toast.warn("Please login first to access dashboard");
        } else {
            getUser();
        }
    }, [token]);

    const getUser = () => {
        AuthService.getUserInfo(myinfo.id)
            .then(data => {
                console.log('getUser', data);
                setFirstName(data[0].first_name);
                setLastName(data[0].last_name);
                setUserName(data[0].username);
                setEmail(data[0].email);
                setPhoneNumber(data[0].phone);
                setAddress(data[0].address);
                setCity(data[0].city);
                setStates(data[0].state);
                setPostCode(data[0].postcode);
                setCountry(data[0].country);
                setCountryCode(data[0].country_code);
                setChecked(data[0].is_volunteer === 'true');
                setMySite(data[0].website);
                setFaceBook(data[0].facebook);
                setInstagram(data[0].instagram);
                setTwitter(data[0].twitter);
                setGoFund(data[0].gofundme);
                setDescription(data[0].description);
            })
            .catch(err => {
                console.error('Error get User', err);
            })
    }

    const handleChangeCountry = (e) => {
        setCountry(e.name);
        setCountry(e.code);
    }
    
    const handleAddInvite = () => {
        setInviteNames([...inviteNames, '']);
        setInviteEmails([...inviteEmails, '']);
    }

    const handleInviteClose = () => {
        setInviteNames(['', '']);
        setInviteEmails(['', '']);
    }

    const handleUpdate = () => {
        if(!firstName || !lastName || !email || !phoneNumber || !userName) return;
        const formData = new FormData();
        formData.append('id', myinfo.id);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('phone', phoneNumber);
        formData.append('username', userName);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('state', states);
        formData.append('postcode', postcode);
        formData.append('country', country);
        formData.append('country_code', countrycode);
        console.log('handleUpdate', formData);
        
        AuthService.updateUser(formData)
            .then(response => {
                if(response.status === 200) {
                    toast.success('Your Information Updated successfully!');
                } else {
                    toast.warn('Cannot update your information, try again later')
                }
            })
            .catch(err => {
                toast.error('Your Information Updated successfully!');
                console.error('Error update info:', err);
            });
    }

    const handleSocialUpdate = () => {
        const social_data = {
            id: myinfo.id,
            is_volunteer: checked,
            website: mysite,
            description,
            facebook,
            instagram,
            twitter,
            gofundme: gofund
        };
        AuthService.updateUserInfo(social_data)
            .then(response => {
                if(response.status === 200) {
                    toast.success('Updated Succes');
                } else {
                    toast.warn('Something went wrong');
                }
            })
            .catch(err => {
                toast.error('Error updating user info');
                console.error('Error update user info', err);
            })
    }

    const handleInvite = () => {
        var name_array = [];
        var email_array = [];
        inviteEmails.map((_invite_email, index) => {
            const name_value = document.getElementById(`invite_name_${index}`);
            const email_value = document.getElementById(`invite_email_${index}`);
            if(name_value !== '' && email_value !== '') {
                name_array.push(nameElement.value);
                email_array.push(emailElement.value);
            }
        });
        const info = {
            id: myinfo.id,
            first_name: firstName,
            last_name: lastName,
            email,
            name_string: name_array.join(','),
            email_string: email_array.join(','),
        };
        inviteUsers(info).then(response => {
            if(response.status === 200) {
                toast.success('Friends invited Successfully!');
            } else {
                toast.warn('Something went wrong');
            }
        }).catch(err => {
            toast.error("Can't invite friends");
            console.error('Error invite user', err);
        });
    }

    return (
        <div className='flex flex-col gap-6 p-3 w-full md:max-w-[768px] sm:w-[640px] mx-auto'>
            <div className='mt-6'>
                <p className='font-semibold text-md'>
                    Personal info
                </p>
                <p className='text-gray-600 text-md'>
                    Update your photo and personal details here.
                </p>
            </div>

            <div className='flex flex-col gap-3 p-6 border border-gray-200 rounded-md shadow-md'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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
                    <div className='w-full md:col-span-2'>
                        <label>Username</label>
                        <input
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded-md'
                            placeholder='UserName'
                            name='username'
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
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded-md'
                            placeholder='Phone Number'
                            name='phonenumber'
                        />
                    </div>

                    <hr className='w-full md:col-span-2' />

                    <div className='w-full md:col-span-2'>
                        <label>Street Address</label>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded-md'
                            placeholder='Street Address'
                            name='streetaddress'
                        />
                    </div>

                    <div className='w-full md:col-span-2'>
                        <label>City</label>
                        <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded-md'
                            placeholder='City'
                            name='city'
                        />
                    </div>

                    <div className='w-full'>
                        <label>State / Province</label>
                        <input
                            value={states}
                            onChange={(e) => setStates(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded-md'
                            placeholder='State'
                            name='state'
                        />
                    </div>
                    <div className='w-full'>
                        <label>Postcode</label>
                        <input
                            value={postcode}
                            onChange={(e) => setPostCode(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded-md'
                            placeholder='postcode'
                            name='postcode'
                        />
                    </div>

                    <div className='w-full md:col-span-2'>
                        <label>Country</label>
                        <input
                            value={country}
                            readOnly
                            className='w-full p-3 border border-gray-300 rounded-md'
                            placeholder='Country'
                            name='country'
                        />
                    </div>

                    <div className='w-full md:col-span-2'>
                        <label>Country</label>
                        {
                            countrycode &&
                            <ReactCountryDropdown
                                countryCode={countrycode}
                                onSelect={handleChangeCountry}
                            />
                        }
                    </div>

                    <hr className='w-full md:col-span-2' />

                    <div className='flex justify-end w-full col-start-1 gap-3 md:col-start-2'>
                        <button
                            onClick={() => handleUpdate()}
                            className='p-2 font-semibold text-white bg-purple-500 border border-purple-600 rounded-md'
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={getUser}
                            className='p-2 font-semibold border border-gray-300 rounded-md'
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </div>

            <div className='flex flex-col justify-center gap-3 py-6 text-center border border-gray-200 rounded-md shadow-md'>
                <div className='px-6 pb-6 border border-t-0 border-l-0 border-r-0 border-b-gray-300'>
                    <img src='images/icon/users-plus.svg' alt='user-plus' />
                </div>
                <p className='text-lg font-semibold'>Invite Friends & Family</p>
                <p className='text-sm text-gray-600'>
                    You can invite friends and family to be part of our &nbsp;
                    <b>The Living Ai Cancer Research Platform (PurpleAi)</b>.
                    It’s ALWAYS 100% Free!
                </p>
                <div
                    className='grid grid-cols-1 gap-3 p-6 text-sm text-start md:grid-cols-2'
                >
                    {
                        inviteEmails.map((item, index) => {
                            return (
                                <div key={index} className='flex col-span-2 gap-3'>
                                    <div className='w-[50%] my-2'>
                                        <label>Name</label>
                                        <input
                                            // value={inviteNames[index]}
                                            // onChange={(e) => handleNameChange(e, index)}
                                            id={`invite_name_${index}`}
                                            className='w-full p-3 border border-gray-300 rounded-md'
                                            placeholder='Name'
                                            name='friendname'
                                        />
                                    </div>
                                    <div className='w-[50%] my-2'>
                                        <label>Email address</label>
                                        <input
                                            // value={item}
                                            // onChange={(e) => handleEmailChange(e, index)}
                                            id={`invite_email_${index}`}
                                            className='w-full p-3 border border-gray-300 rounded-md'
                                            placeholder='Email address'
                                            name='friendemail'
                                        />
                                    </div>
                                </div>
                            );
                        })
                    }
                    <p
                        className='cursor-pointer w-full col-span-1 text-lg font-semibold text-purple-600 md:col-span-2'
                        onClick={handleAddInvite}
                    >
                        + Add more
                    </p>

                    <button
                        onClick={() => handleInvite()}
                        className='p-3 font-semibold text-white bg-purple-500 border border-purple-600 rounded-md'
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={handleInviteClose}
                        className='p-3 font-semibold border border-gray-300 rounded-md'
                    >
                        Cancel
                    </button>

                    <div className='flex items-center justify-center col-span-1 px-6 md:col-span-2'>
                        <img className='h-[200px]' src='images/qr-code.png' alt='' />
                    </div>

                    <p className='col-span-1 md:col-span-2'>
                        Share link
                    </p>
                    <div className='flex justify-start w-full col-span-1 gap-3 md:col-span-2'>
                        <input
                            value='https://werpurple.org'
                            readOnly
                            className='w-full p-3 border border-gray-300 rounded-md'
                            placeholder='Public Website'
                            name='publicwebsite'
                        />
                        <img
                            src='images/icon/copy-icon.svg'
                            className='cursor-pointer'
                            alt=''
                        />
                    </div>

                </div>
            </div>

            <div>
                <p className='text-lg font-semibold'>
                    A Bit About You
                </p>
                <p className='text-sm text-gray-600'>
                    Let us know a bit about you!
                </p>
            </div>

            <div className='flex flex-col justify-center gap-3 py-6 border border-gray-200 rounded-md shadow-md'>
                <div className='flex flex-col gap-4 px-6'>
                    <div className='flex items-center gap-3'>
                        <Switch
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                            onColor='#7F56D9'
                            uncheckedIcon={false}
                            checkedIcon={false}
                            height={20}
                            width={36}
                            boxShadow='none'
                            className='react-switch'
                        />
                        <p className='text-sm'>
                            <b className='text-sm'>Available For Volunteer</b>
                            <br /> I’m open and available for volunteer work.
                        </p>
                    </div>
                    <div className='w-full'>
                        <label>My Website</label>
                        <div className='flex items-center overflow-hidden border border-gray-300 rounded-md'>
                            <span className='p-3 border border-r-gray-400'>http://</span>
                            <input
                                value={mysite}
                                onChange={(e) => setMySite(e.target.value)}
                                className='w-full px-3 m-0 outline-none'
                                placeholder='Site URL'
                                name='mysite'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label>Description</label>
                        <textarea
                            value={description}
                            rows="5"
                            onChange={e => setDescription(e.target.value)}
                            className="px-3 py-2 text-sm text-gray-600 border border-gray-400 rounded-md outline-none"
                            name="description"
                            placeholder="Leave us a description..."
                        >
                        </textarea>
                    </div>

                    <div className='flex flex-col w-full gap-3'>
                        <label>Social Profiles</label>
                        <div className='flex items-center overflow-hidden border border-gray-300 rounded-md'>
                            <span className='p-3 border border-r-gray-400'>Facebook</span>
                            <input
                                value={facebook}
                                onChange={(e) => setFaceBook(e.target.value)}
                                className='w-full px-3 m-0 outline-none'
                                placeholder='facebook.com/username'
                                name='facebook'
                            />
                        </div>
                        <div className='flex items-center overflow-hidden border border-gray-300 rounded-md'>
                            <span className='p-3 border border-r-gray-400'>Instagram</span>
                            <input
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                                className='w-full px-3 m-0 outline-none'
                                placeholder='Instagram.com/username'
                                name='instagram'
                            />
                        </div>
                        <div className='flex items-center overflow-hidden border border-gray-300 rounded-md'>
                            <span className='p-3 border border-r-gray-400'>Twitter</span>
                            <input
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                                className='w-full px-3 m-0 outline-none'
                                placeholder='Twitter.com/username'
                                name='twitter'
                            />
                        </div>
                        <div className='flex items-center overflow-hidden border border-gray-300 rounded-md'>
                            <span className='p-3 border border-r-gray-400'>GoFundMe</span>
                            <input
                                value={gofund}
                                onChange={(e) => setGoFund(e.target.value)}
                                className='w-full px-3 m-0 outline-none'
                                placeholder='GoFoundMe.com/username'
                                name='gofund'
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-center w-full gap-4'>
                        <button
                            onClick={handleSocialUpdate}
                            className='p-3 font-semibold text-white bg-purple-500 border border-purple-600 rounded-md'
                        >
                            Save Changes
                        </button>
                        <button
                            className='p-3 font-semibold border border-gray-300 rounded-md'
                        > 
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile;
