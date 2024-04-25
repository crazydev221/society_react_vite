import React, { useEffect, useState } from 'react';

import { getUserPapers, savePaper } from '../services/apiService';
import NoResult from '../components/NoResult';

function SavedResearch() {

    const [token] = useState(JSON.parse(localStorage.getItem("token")) || "");
    const [userpapers, setUserPapers] = useState([]);
    const [searchtext, setSearchText] = useState('');
    const [page, setPage] = useState(0);

    const user_id = JSON.parse(localStorage.getItem('user')).id;
    const w_style = 'xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px]';

    useEffect(() => {
        if (token === "") {
            navigate("/login");
            toast.warn("Please login first to access dashboard");
        } else {
            getUserPaper(user_id);
        }
    }, [token]);

    const getUserPaper = (userId) => {
        console.log('getUserPaper', userId);
        getUserPapers(userId)
            .then(data => {
                console.log(data);
                setUserPapers(data);
            })
            .catch(err => {
                console.error('Error getting user papers', err);
                setUserPapers([]);
            });
    }

    const changePage = (isNext) => {
        console.log('changePage', isNext);
        const total = Math.ceil(filterData.length / 10);
        if ((page === 0 && !isNext) || (page === total - 1 && isNext)) return;
        let page_num = isNext ? page + 1 : page - 1
        setPage(page_num);
    }

    const handleInputChanged = (event) => {
        setSearchText(event.target.value);
        setPage(0);
    }

    const handleRemove = (event) => {
        console.log('handleRemove');
        const is_save = 1;
        const paper_id = event.target.attributes.getNamedItem("data-paperid").value;
        const title = event.target.attributes.getNamedItem("data-title").value;
        const author = event.target.attributes.getNamedItem("data-author").value;
        const year = event.target.attributes.getNamedItem("data-year").value;
        const citation_count = event.target.attributes.getNamedItem("data-citationcount").value;

        savePaper(user_id, is_save, paper_id, title, author, year, citation_count)
            .then(data => {
                console.log('removePaper', data);
                getUserPaper(user_id);
            })
            .catch(err => {
                console.error('Erro removePaper:', err);
            });
    }

    const filterData = userpapers.filter(paper => paper.title.toLowerCase().includes(searchtext.toLowerCase()));

    return (
        <div className='w-full min-h-[70vh] pb-8 mx-auto'>
            <div className='flex flex-col items-center justify-center pt-12 pb-8 bg-gray-100'>
                <div className={`flex w-full ${w_style} gap-4 px-3 py-2 mt-6 align-middle bg-white border border-gray-300 rounded-lg`}>
                    <input
                        type="text"
                        value={searchtext}
                        onChange={handleInputChanged}
                        className="w-full p-0 bg-transparent border-none outline-none"
                        placeholder="Start Your Search Here"
                    />
                    <button>
                        <img src="images/icon/arrow-double-right.svg" alt="" />
                    </button>
                </div>
                <p className='mt-3 text-sm text-gray-700'>
                    Search your saved research.
                </p>
            </div>
            {filterData.length !== 0 ?
                <div className={`w-full ${w_style} mx-auto flex justify-center p-8`}>
                    <div className='w-[68%] px-6 h-full flex flex-col gap-6 justify-center items-center'>
                        <div className='flex items-center justify-between w-full'>
                            <p className='flex gap-2 text-lg font-semibold'>
                                <img
                                    src='images/icon/check.svg'
                                    alt=''
                                />
                                <span>
                                    Your Saved Research
                                </span>
                            </p>

                        </div>
                        <table className="w-full text-sm border border-collapse border-slate-400">
                            <thead>
                                <tr>
                                    <th className="w-[60%] p-3 bg-gray-100 border border-slate-300"> Title </th>
                                    <th className="w-[25%] p-3 bg-gray-100 border border-slate-300"> Author(s) </th>
                                    <th className="w-[15%] p-3 bg-gray-100 border border-slate-300"> Pub Date </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterData.slice(page * 10, (page + 1) * 10).map((paper, i) => {
                                        return (
                                            <tr className='hover:bg-gray-200' key={i}>
                                                <td className="h-full p-3 border border-slate-300 hover:font-semibold">
                                                    <div className='flex gap-3'>
                                                        <img
                                                            data-citationcount={paper.citation_count}
                                                            data-paperid={paper.paper_id}
                                                            data-title={paper.title}
                                                            data-author={paper.authors}
                                                            data-year={paper.year}
                                                            onClick={handleRemove}
                                                            src='images/icon/check.svg'
                                                            alt=""
                                                            className='cursor-pointer'
                                                        />
                                                        <p
                                                            className='cursor-pointer'
                                                            onClick={() => navigate('/researchquestion?paper=' + paper.paperId)}
                                                        >
                                                            {paper.title}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="p-3 border border-slate-300">
                                                    {paper.authors}
                                                </td>
                                                <td className="p-3 border border-slate-300">
                                                    {paper.year}
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                        <div className='flex justify-between w-full p-6 border border-collapse border-slate-400'>
                            <p>
                                Page {page + 1} of {Math.ceil(filterData.length / 10)} (total: {filterData.length})
                            </p>
                            <div className='flex gap-6'>
                                <button
                                    className='p-3 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md'
                                    onClick={() => changePage(false)}
                                >
                                    Previous
                                </button>
                                <button
                                    className='p-3 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md'
                                    onClick={() => changePage(true)}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='w-[32%] h-full p-6 flex flex-col justify-center items-center border border-t-0 border-b-0 border-r-0 border-l-gray-400'>
                        <div className='w-full p-6 text-sm border border-gray-300 rounded-md'>
                            <div className='flex justify-between mb-3'>
                                <p className='font-semibold'>What is “Saved”?</p>
                                <img src='images/icon/check.svg' alt='' />
                            </div>
                            <p>
                                When a user stars research or drug information
                                on our platform, it means that they <b>have saved
                                    that content to a secure private list for easy
                                    access later</b>. By starring research or drug information,
                                users can create their own personalized feed,
                                which can be especially useful for those who are
                                looking for a way to quickly access research to
                                share with their medical teams. Starring research
                                will also organize their search experience which
                                helps our deep learning algorithm. As research is
                                Saved, Purple Ai gathers, analyzes, and logs those
                                stars, this makes the entire platform smarter for
                                future users.The more research that gets saved,
                                the smarted the entire platform becomes.
                            </p>
                            <b>Your saved research is helping others!</b>
                        </div>

                        <div className='flex flex-col w-full gap-5 p-6 text-sm border border-gray-300 rounded-md'>
                            <div className='flex justify-between'>
                                <p className='text-lg font-semibold'>Purple Help</p>
                                <p className='text-sm font-semibold text-purple-600 w-[50%]'>We Fund Our Work 100% By Donation</p>
                            </div>
                            <div>
                                <p className='text-6xl font-semibold'>$20 <span className='text-sm font-medium'>per month</span> </p>
                                <p>Purple Help Support</p>
                            </div>
                            <button className='py-3 text-lg font-semibold text-white bg-purple-600 rounded-md px-9'>
                                Donate Today!
                            </button>
                        </div>
                    </div>
                </div> :
                <div className={`flex w-full ${w_style} gap-4 px-3 py-2 mt-6 mx-auto`}>
                    <NoResult />
                </div>
            }
        </div>
    )
}

export default SavedResearch;
