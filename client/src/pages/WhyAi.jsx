import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

import Donate from '../components/Donate';
import { getPubicPageById } from '../services/baseService';

import '../styles/WhyAi.css';

function WhyAi() {
    const [whyai, setWhyAi] = useState('');

    useEffect(() => {
        getPubicPageById('646601b6da621430f87af49c').then(res => {
            setWhyAi(res.data.content);
        }).catch(err => {
            toast.error('Connecting Server Error!');
            console.error('Error get page', err);
        })
    }, []);

    const w_style = 'xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px]';

    return (
        <div className={`w-full ${w_style} my-6 mx-auto text-center flex flex-col gap-6 items-center`}>
            <div dangerouslySetInnerHTML={{__html: whyai}} />
            <Donate />
        </div>
    )
}

export default WhyAi;
