import React, { useEffect, useState } from 'react'
import { getNitaliaBlanketList, getPubicPageById } from '../services/baseService';
import { toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';
import { URLS } from '../constants/consts';
import '../styles/NitaliaBlanket.css';
import Donate from '../components/Donate';

function NitaliaBlanket() {
    const [nitalia, setNitalia] = useState('');
    const [nitaliablankets, setNitaliaBlankets] = useState([]);
    
    useEffect(() => {
        getPubicPageById('646618edda621430f87af4af').then(res => {
            setNitalia(res.data.content);
        }).catch(err => {
            toast.error('Error Connecting Server!');
            console.error('Error get Nitalia:', err);
        });

        getNitaliaBlanketList(1).then(res => {
            setNitaliaBlankets(res.data.nitaliablankets);
        }).catch(err => {
            toast.error('Error Connecting Server!');
            console.error('Error get Nitalia Blanket:', err);
        });
    }, []);

    const w_style = 'xl:w-[1250px] py-6 lg:w-[1000px] md:w-[750px] sm:w-[640px]';

    return (
        <div className={`w-full ${w_style} mx-auto flex flex-col gap-9`}>
            <Carousel
                className='p-2 sm:p-6 md:p-12'
                interval="4000" transitionTime="1000" id="big-slider"
                showIndicators={false} thumbWidth="95px"
                infiniteLoop autoPlay
            >
                {
                    nitaliablankets.map((nitaliablanket, index) => (
                        <div key={index} className='relative'>
                            <img
                                src={URLS.imageURL + '/uploads/nitaliablankets/' + nitaliablanket.picture}
                                alt=''
                            />
                            <h4 className='absolute bottom-0 text-white bg-black w-full p-3 bg-opacity-50'>
                                {nitaliablanket.title}
                            </h4>
                        </div>
                    ))
                }
            </Carousel>
            <div className="flex flex-col gap-6 w-full max-w-[1000px] px-3 sm:px-6 md:px-18 mx-auto">
                <img
                    src="images/our-work/ptrn2.png"
                    className='px-3 sm:px-6 md:px-12'
                    alt=""
                />
                <div
                    class="heading-one text-center"
                    dangerouslySetInnerHTML={{__html: nitalia}}
                />
            </div>
            <Donate />
        </div>
    )
}

export default NitaliaBlanket;
