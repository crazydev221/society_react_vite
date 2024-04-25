import React from 'react';
import { useNavigate } from 'react-router-dom';

import Donate from '../components/Donate';

function Principle() {

    const navigate = useNavigate();

    const w_style = 'xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px]';

    return (
        <div className='w-full'>
            <div className={`w-full ${w_style} mx-auto py-12 px-6 flex flex-col gap-6 text-center`}>
                <p className="text-purple-600 font-semibold">
                    We Are Just Different Then Other Charities
                </p>
                <div className="flex flex-col lg:flex-row justify-center gap-3 lg:relative">
                    <h1 className='text-4xl font-semibold'>
                        Our Principle Beliefs
                    </h1>
                    <button
                        className="rounded-md bg-purple-600 text-white font-semibold p-3 text-base lg:absolute lg:right-0"
                        onClick={() => navigate('/leadership')}
                    >
                        Meet The Leadership Team
                    </button>
                </div>
            </div>
            <div className="bg-gray-100 py-12">
                <div className={`w-full ${w_style} mx-auto p-6 flex md:flex-row flex-col gap-9 justify-between`}>
                    <div className="w-full text-lg text-gray-500 flex flex-col gap-3">
                        <p>
                            At our childhood cancer charity, we believe that every child is a precious and unique individual,
                            deserving of love and compassion. No child should have to endure the pain and suffering of cancer,
                            and it is our mission to do everything in our power to support and care for these brave and resilient
                            young individuals.
                        </p>
                        <p>
                            We understand that childhood cancer is a heartbreaking and difficult journey, not just for the child,
                            but for the entire family. That is why we are dedicated to providing not only medical care,
                            but also emotional support and financial assistance to help families cope with the challenges of
                            cancer treatment.
                        </p>
                        <p>
                            We believe that no family should have to face the burden of cancer alone,
                            and it is our goal to be a constant source of love, hope, and support
                            for children and families affected by this devastating disease.
                        </p>
                        <p>
                            We are committed to bringing light and healing to the lives of those we serve,
                            and to spreading love and compassion to all those affected by childhood cancer.
                        </p>
                        <img src="images/volunteer/2.jpg" alt="" />
                    </div>
                    <div className="w-full text-lg text-gray-500 flex flex-col gap-3">
                        <h2 className='font-semibold'>
                            We are hyper-focused on the following:
                        </h2>
                        <ul className='text-purple-600 text-lg list-decimal list-outside pl-6'>
                            <li>
                                Increase funding for childhood cancer research: One of the 
                                biggest challenges in the fight against childhood cancer is 
                                the lack of funding and resources dedicated to research. 
                                By increasing funding, we can accelerate the pace of progress 
                                and bring us closer to finding more effective treatments and a cure.
                            </li>
                            <li>
                                Improve access to quality care: Not all children have access to 
                                the best possible cancer care, and this can significantly impact 
                                their chances of survival. We aim to improve access to high-quality 
                                care for all children with cancer, regardless of their location or 
                                financial circumstances.
                            </li>
                            <li>
                                Develop more targeted and personalized treatments: Many current cancer 
                                treatments are toxic and can have serious side effects. We aim to 
                                develop more targeted and personalized treatments that are less toxic 
                                and more effective at killing cancer cells while minimizing harm to 
                                healthy cells.
                            </li>
                            <li>
                                Support families through the cancer journey: Cancer affects the entire family,
                                not just the child with the disease. We aim to provide a range of supportive 
                                services to help families cope with the emotional and practical challenges 
                                of cancer treatment.
                            </li>
                            <li>
                                Promote awareness and understanding of childhood cancer: Childhood cancer is 
                                often misunderstood, and we aim to increase awareness and understanding of 
                                the disease among the general public.
                            </li>
                            <li>
                                Improve survival rates: Despite progress in recent years, the survival rates for 
                                some types of childhood cancer are still unacceptably low. We aim to improve 
                                survival rates for all types of childhood cancer.
                            </li>
                            <li>
                                Reduce the long-term effects of cancer treatment: Many cancer treatments can have 
                                long-term effects on a child's physical and emotional well-being. We aim to 
                                reduce these effects by developing less toxic treatments and providing support to 
                                children and families during and after treatment.
                            </li>
                            <li>
                                Support children and families through end-of-life care: For some children with cancer,
                                a cure may not be possible. We aim to provide compassionate and supportive end-of-life
                                care to children and their families.
                            </li>
                            <li>
                                Advocate for children with cancer: We aim to be a powerful voice for children with cancer
                                 and their families, advocating for their rights and needs at the local, national, 
                                 and international level.
                            </li>
                            <li>
                                Work towards a world without childhood cancer: Our ultimate goal is to find a cure 
                                for childhood cancer and create a world where no child has to suffer from this 
                                devastating disease.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Donate />
        </div>
    )
}

export default Principle;