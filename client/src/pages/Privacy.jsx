import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { getPubicPageById } from '../services/baseService';
import Donate from '../components/Donate';

import '../styles/Privacy.css';

function Privacy() {
    const [privacy, setPrivacy] = useState('');

    useEffect(() => {
        getPubicPageById('646d0e2e0a5a263e48d16ff6').then(res => {
            setPrivacy(res.data.content);
        }).catch(err => {
            console.error('Error get privacy page', err);
            toast.error('Connecting Server Error!');
        });
    }, []);

    return (
        <div className={`w-full mx-auto p-9`}>
            <div class="flex flex-col text-center gap-2" dangerouslySetInnerHTML={{__html: privacy}} />
            <Donate />
        </div>
    )
}

export default Privacy;
