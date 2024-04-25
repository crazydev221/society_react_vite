import React, { useEffect, useState } from 'react';
import { getOurWorkList, getPubicPageById, getPublicContent } from '../services/baseService';
import { toast } from 'react-toastify';
import {Carousel} from "react-responsive-carousel";

import Donate from '../components/Donate';
import { URLS } from '../constants/consts';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../styles/OurWork.css";

function OurWork() {

    const w_style = 'xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px]';

    const [content, setContent] = useState('');
    const [ourwork1, setOurWork1] = useState('');
    const [ourwork2, setOurWork2] = useState('');
    const [ourworks, setOurWorks] = useState([]);

    useEffect(() => {
        getPublicContent().then(response => {
            setContent(response.data);
            console.log(content);
        }).catch(err => {
            console.error('Error get public content', err);
            toast.error('Connecting server Error!');
        });
        
        getPubicPageById('6465f8fdda621430f87af425').then(response => {
            setOurWork1(response.data.content);
        }).catch(err => {
            console.error('Error get public page 1', err);
            toast.error('Connecting server Error!');
        });

        getPubicPageById('6465f929da621430f87af428').then(response => {
            setOurWork2(response.data.content);
        }).catch(err => {
            console.error('Error get public page 2', err);
            toast.error('Connecting server Error!');
        });

        getOurWorkList(1).then((response) => {
            setOurWorks(response.data.ourworks);
        })
    }, []);

    return (
        <div className={`ourwork flex flex-col ${w_style} mx-auto items-center justify-center gap-3 px-6 py-12`}>            
            <div
                className='max-w-[768px] text-center'
                dangerouslySetInnerHTML={{__html: ourwork1}} 
            />
            <Carousel
                className='w-full p-6'
                interval="4000" transitionTime="1000"
                id="big-slider" showIndicators={false}
                thumbWidth="95px" infiniteLoop autoPlay
            >
                {
                    ourworks?.map((ourwork, index) => 
                    <div key={index} className='relative'>
                        <img
                            src={URLS.imageURL + '/uploads/ourworks/' + ourwork.picture}
                            alt=""/>
                        <h4 className='font-semibold text-purple-600'>{ourwork.title}</h4>
                    </div>)
                }
            </Carousel>
            <div className='p-6 text-lg text-center max-w-[768px]'>
                <div dangerouslySetInnerHTML={{__html: ourwork2}}/>
            </div>
            <Donate />
        </div>
    )
}

export default OurWork;
