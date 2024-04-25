import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../styles/Header.css';
import { LOGIN_FAILURE, LOGIN_SUCCESS } from '../redux/types/types';

const Header = () => {

  const [menuDisplay, setMenuDisplay] = useState(false);
  const [dropdownDisplay, setDropdownDisplay] = useState(false);
  const dispatch = useDispatch();

  var isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    const user = localStorage.getItem('user') || '';
    if (token !== '' && user !== '') {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, user }
      });
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: "Login failed!"
      });
    }
    console.log('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    menuDisplay ? (<div className='fixed z-10 w-full h-screen bg-white'>
      <button onClick={() => { setMenuDisplay(false) }} className='fixed z-10 right-3 top-3'>
        <img src="images/icon/close.svg" alt='close' />
      </button>

      <a href="/about-us" className='flex items-center justify-start w-full h-10 gap-3 px-3 py-6 border border-b-gray-300'>
        <img src="images/icon/about.svg" alt="" /> About Us
      </a>

      <a href="/drug" className='flex items-center justify-start w-full h-10 gap-3 px-3 py-6 border border-b-gray-300'>
        <img src="images/icon/guide.svg" alt="" /> Purple Drug Guide
      </a>

      <a href="/contact" className='flex items-center justify-start w-full h-10 gap-3 px-3 py-6 border border-b-gray-300'>
        <img src="images/icon/phone.svg" alt="" /> Contact
      </a>

      <div className='w-full'>
        <button onClick={() => setDropdownDisplay(!dropdownDisplay)} className='flex items-center justify-start w-full h-10 gap-3 px-3 py-6 border border-b-gray-300'>
          <img src="images/icon/support.svg" alt="" /> Support our Cause
        </button>
        {
          dropdownDisplay && (<>
            <a className="flex items-center justify-start w-full h-10 gap-3 py-4 pl-8 text-sm border border-b-gray-300" href="/support">
              <img src="images/icon/support3.svg" alt="" /> Support Our Work
            </a>
            <a className="flex items-center justify-start w-full h-10 gap-3 py-4 pl-8 text-sm border border-b-gray-300" href="/whyai">
              <img src="images/icon/support2.svg" alt="" /> Support Ai Research
            </a>
            <a className="flex items-center justify-start w-full h-10 gap-3 py-4 pl-8 text-sm border border-b-gray-300" href="/nitaliablanket">
              <img src="images/icon/nitalia.svg" alt="" /> Nitalia’s Blankets
            </a>
            <a className="flex items-center justify-start w-full h-10 gap-3 py-4 pl-8 text-sm border border-b-gray-300" href="/purpleaparments">
              <img src="images/icon/purple-apartments.svg" alt="" /> The Purple Apartments
            </a>
            <a className="flex items-center justify-start w-full h-10 gap-3 py-4 pl-8 text-sm border border-b-gray-300" href="/juniorpurplesociety">
              <img src="images/icon/jr-purple-society.svg" alt="" /> The Jr. Purple Society
            </a>
            <a className="flex items-center justify-start w-full h-10 gap-3 py-4 pl-8 text-sm border border-b-gray-300" href="/volunteer">
              <img src="images/icon/time.svg" alt="" /> Volunteer Your Time
            </a>
            <a className="flex items-center justify-start w-full h-10 gap-3 py-4 pl-8 text-sm border border-b-gray-300" href="/charitabletaxdeduction">
              Charitable Tax Deductions
            </a>
          </>)
        }
      </div>

      {isAuthenticated ? (
        <div className='w-full'>
          <a href="/savedresearch" className="flex items-center justify-start w-full h-10 gap-3 px-3 py-6 border border-b-gray-300">
            <img src="images/icon/check.svg" alt="" />
            Saved
          </a>
          <a href="/profile" className='flex items-center justify-start w-full h-10 gap-3 px-3 py-6 border border-b-gray-300'>
            My Account
          </a>
          <a href="/logout" className='flex items-center justify-start w-full h-10 gap-3 px-3 py-6 border border-b-gray-300'>
            Logout
          </a>
        </div>
      ) : (
        <div className='w-full'>
          <a href="/login" className='flex items-center justify-start w-full h-10 gap-3 px-3 py-6 border border-b-gray-300'>
            Login
          </a>
          <a href="/login" className='flex items-center justify-start w-full h-10 gap-3 px-3 py-6 border border-b-gray-300'>
            Sing Up
          </a>
        </div>
      )}

    </div>) :
      (<header className="flex py-4 shadow-md">
        <div className='flex w-full xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px] mx-auto items-center justify-between px-3'>
          <a href='/'>
            <img className="pr-8" src='images/logo2.png' alt='logo' />
          </a>
          <div className="items-center hidden lg:flex">
            <div className="flex gap-8 menu-items">
              <a className="text-gray-600 hover:text-purple-700 hover:font-medium" href="/about-us">
                About Us
              </a>
              <a className="text-gray-600 hover:text-purple-700 hover:font-medium" href="/drug">
                Purple Drug Guide
              </a>
              <a className="text-gray-600 hover:text-purple-700 hover:font-medium" href="/contact">
                Contact
              </a>
              <div className="relative inline-block dropdown">
                <p className="text-gray-600 cursor-pointer hover:text-purple-700 hover:font-medium">
                  Support our Cause
                </p>
                <div className="absolute hidden w-64 py-2 bg-white shadow-md dropdown-content">
                  <a href="/support" className="flex items-center px-4 py-2 hover:bg-gray-100">
                    <img src="images/icon/support3.svg" alt="support3" className="mr-2" />
                    <span> Support Our Work </span>
                  </a>
                  <a href="/whyai" className="flex items-center px-4 py-2 hover:bg-gray-100">
                    <img src="images/icon/support2.svg" alt="support2" className="mr-2" />
                    <span> Support Ai Research </span>
                  </a>
                  <a href="/nitaliablanket" className="flex items-center px-4 py-2 hover:bg-gray-100">
                    <img src="images/icon/nitalia.svg" alt="nitalia" className="mr-2" />
                    <span> Nitalia’s Blankets </span>
                  </a>
                  <a href="/purpleaparments" className="flex items-center px-4 py-2 hover:bg-gray-100">
                    <img src="images/icon/purple-apartments.svg" alt="purple-apartment" className="mr-2" />
                    <span> The Purple Apartments </span>
                  </a>
                  <a href="/juniorpurplesociety" className="flex items-center px-4 py-2 hover:bg-gray-100">
                    <img src="images/icon/jr-purple-society.svg" alt="jr-purple-society" className="mr-2" />
                    <span> The Jr. Purple Society </span>
                  </a>
                  <a href="/volunteer" className="flex items-center px-4 py-2 hover:bg-gray-100">
                    <img src="images/icon/time.svg" alt="time" className="mr-2" />
                    <span> Volunteer Your Time </span>
                  </a>
                  <a href="/charitabletaxdeduction" className="flex items-center px-4 py-2 hover:bg-gray-100">
                    <span> Charitable Tax Deductions </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className='hidden gap-6 lg:flex'>
            {
              !isAuthenticated ?
                (<>
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                  <a className="nav-link" href="/register">
                    Sign Up
                  </a>
                </>) : (
                  <>
                    <a href="/savedresearch" className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100">
                      <img src="images/icon/check.svg" alt="" />
                      Saved
                    </a>
                    <a href='/profile' className="flex items-center px-2 py-2 hover:bg-gray-100">
                      My Account
                    </a>
                    <a href='/logout' className="flex items-center px-2 py-2 hover:bg-gray-100">
                      Logout
                    </a>
                  </>
                )
            }
          </div>

          <div className='inline lg:hidden'>
            <button onClick={() => setMenuDisplay(true)}>
              <img src="images/icon/menu.svg" alt="" />
            </button>
          </div>
        </div>
      </header>)
  );
}

export default Header;