import React, { useEffect, useState } from 'react';
import { getPubicPageById, getPurpleAaprtmentList } from '../services/baseService';
import { toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';

import { URLS } from '../constants/consts';
import Donate from '../components/Donate';

import '../styles/NitaliaBlanket.css';

function PurpleAparment() {

  const [apartment, setApartment] = useState('');
  const [purpleapartments, setPurpleApartments] = useState([]);

  useEffect(() => {
    getPubicPageById('646d09810a5a263e48d16fec').then(res => {
      setApartment(res.data.content);
    }).catch(err => {
      toast.error('Connecting Server Error!');
      console.error('Error get aparment page', err);
    });

    getPurpleAaprtmentList(1).then(res => {
      setPurpleApartments(res.data.purpleapartments);
    })
  }, []);

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
          purpleapartments.map((purpleapartment, index) => (
            <div key={index} className='relative'>
              <img
                src={URLS.imageURL + '/uploads/purpleapartments/' + purpleapartment.picture}
                alt=''
              />
              <h4 className='absolute bottom-0 text-white bg-black w-full p-3 bg-opacity-50'>
                {purpleapartment.title}
              </h4>
            </div>
          ))
        }
      </Carousel>
      <div className="flex flex-col gap-6 w-full max-w-[1000px] px-3 sm:px-6 md:px-18 mx-auto">
        <img
          className='px-3 sm:px-6 md:px-12'
          src="images/our-work/ptrn1.png"
          alt=""
        />
        <div
          className="heading-one text-center"
          dangerouslySetInnerHTML={{ __html: apartment }}
        />
      </div>
      <Donate />
    </div>
  );
}

export default PurpleAparment;
