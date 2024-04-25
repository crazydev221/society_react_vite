import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import NoResult from '../components/NoResult';
import DropdownMenu from '../components/commons/DropdownMenu';
import Donate from '../components/Donate';
import { searchDrug, suggestDrug } from '../services/apiService';

const splitFood = (food_interactions) => {
    var split1 = food_interactions.split('food-interaction');

    var str = '<ul class="disk-list">';

    for (var i = 1; i < split1.length; i++) {
        var split2 = split1[i].split(':"');

        if (split2[1] !== undefined) {
            var split3 = split2[1].split('.";}');

            str += '<li>' + split3[0] + ".</li>";
        }
    }
    str += '</ul>';
    return str;
}

const splitManu = (manufacturers) => {
    var split1 = manufacturers.split(':"');
    var manu = '';
    if (split1[2] !== undefined) {
        var splt = split1[2].split('";');
        manu = splt[0];
    }
    return manu;
}

const splitPrice = (price) => {
    var descriptions = [];
    var prices = [];
    var split1 = price.split('"description"');

    for (var i = 1; i < split1.length; i++) {

        var split2 = split1[i].split(':"cost"');
        var split3 = split2[0].split(':"');
        var split4 = split3[1].split('";');

        descriptions.push(split4[0]);

        var split3 = split2[1].split(':"');
        var split4 = split3[1].split('";');

        prices.push(split4[0]);
    }
    return { descriptions, prices };
}

function DrugResearch() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const text = params.get('search') || "";

    const navigate = useNavigate();

    const [token] = useState(JSON.parse(localStorage.getItem("token")) || "");
    const [searchtext, setSearchText] = useState(text);
    const [filterDrug, setFilterDrug] = useState([]);
    const [drug, setDrug] = useState([]);

    const w_style = 'xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px]';

    useEffect(() => {
        if (token === "") {
            navigate("/login");
            toast.warn("Please login first to access dashboard");
        } else {
            searchDrugName(searchtext);
            getDrugDetails(searchtext);
        }
    }, [token]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate('/drugresearch?search=' + searchtext);
            searchDrugName(searchtext);
            getDrugDetails(searchtext);
        }
    }

    const handleChange = (event) => {
        setSearchText(event.target.value);
        searchDrugName(event.target.value);
    }

    const handleDrugClicked = (drug_name) => {
        navigate('/drugresearch?search=' + drug_name);
        setSearchText(drug_name);
        searchDrugName(drug_name);
    }

    const searchDrugName = (search_text) => {
        if (!search_text) return;
        suggestDrug(search_text)
            .then(data => {
                console.log('searchDrugName', data);
                setFilterDrug(data);
            })
            .catch(err => {
                console.error('Drug Search Error:', err);
                setFilterDrug([]);
            });
    }

    const getDrugDetails = (search_text) => {
        searchDrug(search_text)
            .then(data => {
                console.log('getDrugDetails', data);
                setDrug(data);
            })
            .catch(err => {
                console.error('Drug Search Error:', err);
                setDrug([]);
            });
    }

    return (
        <div className='w-full min-h-[70vh] pb-8 mx-auto'>
            <div className='flex flex-col items-center justify-center pt-12 pb-8 bg-gray-100'>
                <div className='mt-6'>
                    <p className='text-base text-gray-700'>
                        Have additional questions about this drug?
                    </p>
                    <div className={`flex w-full ${w_style} gap-4 px-3 mt-3 align-middle border border-gray-300 rounded-lg`}>
                        <input
                            type="text"
                            value={searchtext}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            className="w-full p-3 bg-transparent border-none outline-none"
                            placeholder="Enter a drug name to search"
                        />
                        <img src="images/icon/question.svg" alt="" />
                        <button
                            className='p-3 pl-6 border border-t-0 border-b-0 border-r-0 border-l-gray-300'
                            onClick={() => navigate('/drugresearch?search=' + searchtext)}
                        >
                            Ask
                        </button>
                    </div>
                    {filterDrug.map((data, index) => {
                        var drug_name = data.names;
                        return (
                            <div key={index}>
                                <div
                                    className=' cursor-pointer text-start, border border-t-0 border-l-0 border-r-0 border-b-gray-600'
                                    onClick={() => handleDrugClicked(drug_name)}
                                >
                                    {drug_name}
                                </div>
                            </div>
                        )
                    })}
                    <p className='mt-3 text-sm text-gray-700'>
                        Purple Ai can explore deeper questions you may have on the drug you have selected.
                    </p>
                </div>
            </div>
            {
                drug.length !== 0 ? drug.map((data, index) => {
                    var str = splitFood(data.food_interactions);
                    var manu = splitManu(data.manufacturers);
                    var { descriptions, prices } = splitPrice(data.prices);

                    return <div key={index} className={`flex flex-col w-full ${w_style} mx-auto gap-4 px-3 mt-3 align-middle`}>
                        <p className='text-lg font-semibold'>
                            I’ve found these results
                        </p>
                        <div className='flex flex-col gap-3'>
                            <div className="grid grid-cols-3 gap-6 text-gray-600">
                                <div className='col-start-2 overflow-hidden border border-gray-300 rounded-lg shadow-md'>
                                    <div className='flex align-middle bg-gray-100 border border-b-gray-300'>
                                        <p className='w-[45%] p-3 text-sm font-normal bg-gray-200 text-start'>Name</p>
                                        <p className='w-[55%] p-3 text-sm font-normal bg-gray-200 text-start'>Accession Number</p>
                                    </div>
                                    <div className='flex align-middle'>
                                        <div className='w-[45%] p-3'>
                                            <div className='flex gap-3 '>
                                                <img className='cursor-pointer' src='images/icon/check-empty.svg' alt="" />
                                                <p className='font-medium text-black'>{data.names}</p>
                                            </div>
                                            <small>Type: {data.type}</small>
                                        </div>
                                        <p className='w-[55%] p-3'>{data.drugbank_id}</p>
                                    </div>
                                </div>

                                <div>
                                    <DropdownMenu options={[
                                        { value: 'pdf', label: 'PDF' },
                                        { value: 'csv', label: 'CSV' },]}
                                    />
                                </div>

                                <div>
                                    <h1 className='mb-4 text-3xl font-semibold text-purple-900'>Description</h1>
                                    <p>
                                        {data.description !== null && data.description !== '' ? data.description : "No data available"}
                                    </p>
                                </div>

                                <div className='flex flex-col gap-6'>
                                    <div>
                                        <h6 className='mb-3 text-xl font-semibold text-black'>Indication:</h6>
                                        <p>
                                            {data.indication !== null && data.indication !== '' ? data.indication : "No data available"}
                                        </p>
                                    </div>
                                    <div>
                                        <h6 className='mb-3 text-xl font-semibold text-black'>Mechanism of action:</h6>
                                        <p>
                                            {data.mechanism_of_action !== null && data.mechanism_of_action !== '' ? data.mechanism_of_action : "No data available"}
                                        </p>
                                    </div>
                                    <div>
                                        <h6 className='mb-3 text-xl font-semibold text-black'>Absorption:</h6>
                                        <p>
                                            {data.absorption !== null && data.absorption !== '' ? data.absorption : "No data available"}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-6'>
                                    <div>
                                        <h6 className='mb-3 text-xl font-semibold text-black'>Elimination:</h6>
                                        <p>
                                            {data.route_of_elimination !== null && data.route_of_elimination !== '' ? data.route_of_elimination : "No data available"}
                                        </p>
                                    </div>
                                    <div>
                                        <h6 className='mb-3 text-xl font-semibold text-black'>Toxicity:</h6>
                                        {data.toxicity !== null && data.toxicity !== '' ? <div dangerouslySetInnerHTML={{ __html: data.toxicity }} /> : "No data available"}
                                    </div>
                                    <div>
                                        <h6>Food Interactions:</h6>
                                        {str !== null && str !== '' && str !== '<ul class="disk-list"></ul>' ? <div dangerouslySetInnerHTML={{ __html: str }} /> : "No data available"}
                                    </div>
                                    <div>
                                        <h6 className='mb-3 text-xl font-semibold text-purple-900'>Pharmacoeconomics:</h6>
                                        <div>
                                            Manufacturers: {manu} <br />
                                            {descriptions && descriptions.length && (
                                                <>
                                                    <br />
                                                    Prices: <br />
                                                    {descriptions.map((price_data, index) => (
                                                        <div key={index}>
                                                            {<div dangerouslySetInnerHTML={{ __html: price_data + ": $" + prices[index] + "</br>" }} />}
                                                        </div>))
                                                    };
                                                    <small>
                                                        *Prices may vary. Always check with your medical team.
                                                    </small>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <small className='w-full text-center mt-9'>
                            <b>General Reference:</b>
                            <div dangerouslySetInnerHTML={{ __html: data.general_references }} />
                        </small>
                    </div>
                }) : <NoResult />
            }
            <Donate />
        </div>
    );
}

export default DrugResearch;
