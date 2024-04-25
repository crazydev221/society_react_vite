import React, { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";

import jsPDF from 'jspdf'
import "jspdf-autotable";

import { getPaperById, getUserPapers, savePaper } from '../services/apiService';
import '../styles/ResearchQuestion.css';

const getAbstractSummary = (paper) => {
    var abstract_summary = "";
    if (paper.tldr && paper.tldr.text !== '') {
        abstract_summary = paper.tldr.text;
    } else {
        abstract_summary = paper.abstract;
    }
    return abstract_summary;
}

const checkUserPaper = (user_papers, val) => {
    const index = user_papers.findIndex((item) => item.paper_id === val);
    if (index >= 0) return 1;
    else return 0;
}

const getCsvFileName = () => {
    var date = Date().split(" ");
    var dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    var csv_file_name = `Purple Research Paper_${dateStr}.csv`;
    return csv_file_name;
}

const parseTableData = (data) => {
    const tableRows = [];

    var authors = "";
    year = "";

    if (data.authors) {
        var authors = data.authors.map(function (v) {
            return v.name;
        }).join(', ');
    }


    if (data.publicationDate) {
        var nameArr = data.publicationDate.split('-');
        var year = nameArr[0] + " | ";
    } else {
        year = "";
    }

    var url = 'javascript:void(0);';
    if (data.isOpenAccess && data.openAccessPdf) {
        url = data.openAccessPdf.url;
    }

    var obj = '';
    if (data.tldr) {
        obj = data.tldr.text;
    }

    var ticketData = [
        "Title",
        data.title,
    ];
    tableRows.push(ticketData);

    var ticketData = [
        "Authors",
        authors,
    ];
    tableRows.push(ticketData);


    var ticketData = [
        "Pub Date",
        year,
    ];
    tableRows.push(ticketData);


    var ticketData = [
        "Abstract",
        data.abstract,
    ];
    tableRows.push(ticketData);


    var ticketData = [
        "Object",
        obj,
    ];
    tableRows.push(ticketData);

    return tableRows;
}

const parseExportData = (data) => {
    const tableRows = [];

    var authors = "";
    year = "";

    if (data.authors) {
        var authors = data.authors.map((author) => {
            return author.name;
        }).join(', ');
    }

    if (data.publicationDate) {
        var nameArr = data.publicationDate.split('-');
        var year = nameArr[0] + " | ";
    } else {
        year = "";
    }

    var obj = '';
    if (data.tldr) {
        obj = data.tldr.text;
    }

    const tableColumn = ["Title", "Authors", "Pub Date", "Abstract", "Object"];

    tableRows.push(tableColumn);

    const ticketData = [
        data.title,
        authors,
        year,
        data.abstract,
        obj
    ];
    
    // push each tickcet's info into a row
    tableRows.push(ticketData);
    console.log('tableRows', tableRows);
    return tableRows;
}

function ResearchQuestion() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const text = params.get('paper');
    const user_id = JSON.parse(localStorage.getItem('user')).id;

    const token = JSON.parse(localStorage.getItem("token")) || "";
    const [searchtext, setSearchText] = useState('');
    const [userpapers, setUserPapers] = useState([]);
    const [paperId] = useState(text);
    const [data, setData] = useState([]);
    const [citations, setCitations] = useState([]);
    const [showBtnDisable, setShowBtnDisable] = useState(false);
    const [exportData, setExportedData] = useState([]);

    var citation_start = 0;
    var citation_end = 5;


    useEffect(() => {
        if (token === "") {
            navigate("/login");
            toast.warn("Please login first to access dashboard");
        } else {
            fetchData();
            getUserPaper(user_id);
        }
    }, [token]);

    const getUserPaper = (userId) => {
        getUserPapers(userId)
            .then(data => {
                setUserPapers(data);
            })
            .catch(err => {
                console.error('Error getting user papers', err);
                setUserPapers([]);
            });
    }

    const fetchData = () => {
        getPaperById(
            paperId,
            'title,authors,abstract,journal,citations,publicationDate,venue,isOpenAccess,openAccessPdf,citationCount,tldr'
        ).then(data => {
            setData(data);
            console.log('data:', data);
            setExportedData(parseExportData(data));
            addCitations(data, citation_start, citation_end);
        }).catch(err => {
            console.error('Error in fetch data', err);
        })
    }

    const addCitations = async (data, start, end) => {
        var end_num = Math.min(end, data.citationCount);
        console.log('addCitations', start, end_num);

        var temp = [];

        for (let i = start; i < end_num; i++) {
            const cit = await getPaperById(
                data.citations[i].paperId,
                'title,authors,abstract,journal,citations,publicationDate,venue,isOpenAccess,openAccessPdf,citationCount,tldr'
            );
            console.log('cit', cit);
            temp.push(cit);
        }
        setCitations([...citations, ...temp]);
    }

    const nextCitations = async () => {
        setShowBtnDisable(true);
        if (citation_start + 5 >= data.citationCount) return;
        citation_start += 5;
        citation_end = Math.min(citation_end + 5, data.citationCount);
        await addCitations(data, citation_start, citation_end);
        setShowBtnDisable(false);
    }

    const handleSave = (event) => {
        const is_save = event.target.attributes.getNamedItem("data-check").value;
        const paper_id = event.target.attributes.getNamedItem("data-paperid").value;
        const title = event.target.attributes.getNamedItem("data-title").value;
        const author = event.target.attributes.getNamedItem("data-author").value;
        const year = event.target.attributes.getNamedItem("data-year").value;
        const citation_count = event.target.attributes.getNamedItem("data-citationcount").value;

        if (checkUserPaper(userpapers, paper_id) != is_save) return;

        savePaper(user_id, is_save, paper_id, title, author, year, citation_count)
            .then(data => {
                console.log('savePaper', data);
                getUserPaper(user_id);
            })
            .catch(err => {
                console.error('Erro savePaper:', err);
            });
    }

    const generatePdf = () => {
        const doc = new jsPDF();

        const tableColumn = ["Title", "Description"];
        const tableRows = parseTableData(data);

        // Load the logo image
        const logoImg = new Image();
        logoImg.src = '/images/logo2.jpg';

        // Wait for the image to load
        logoImg.onload = () => {
            const pageWidth = doc.internal.pageSize.getWidth();
            const logoWidth = 50; // Adjust the logo width as needed
            const logoHeight = (logoImg.height * logoWidth) / logoImg.width;
            const logoX = (pageWidth - logoWidth) / 2;

            // Add the logo to the PDF


            // Convert the image to a data URL
            const canvas = document.createElement('canvas');
            canvas.width = logoImg.width;
            canvas.height = logoImg.height;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.drawImage(logoImg, 0, 0);

            // Add the logo to the PDF
            doc.addImage(logoImg, 'JPEG', logoX, 10, logoWidth, logoHeight);

            // Add title and description list
            doc.setFontSize(18);
            //doc.text('PDF Title', 10, logoHeight + 30); // Adjust the position as needed

            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: logoHeight + 20,
                headStyles: { fillColor: '#7f56d9' },
            });
            const date = Date().split(" ");
            const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
            doc.save(`Purple Research Paper_${dateStr}.pdf`);
        };
    }

    const w_style = 'xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px]';

    var year = data.publicationDate?.slice(0, 4);
    var authors = data.authors?.map((author) => (author.name)).join(', ');

    var checked = checkUserPaper(userpapers, paperId);
    var image_path = checked ? 'images/icon/check.svg' : 'images/icon/check-empty.svg';
    var url = data.isOpenAccess ? data.openAccessPdf.url : '/404';

    return (
        <div className='w-full min-h-[70vh] pb-8 mx-auto'>
            <div className='flex flex-col justify-center pt-12 pb-8 bg-gray-100'>
                <div className={`w-full ${w_style} mx-auto`}>
                    <p className='text-lg text-gray-700'>
                        Have any questions on this paper?
                    </p>
                    <div className={`flex gap-4 px-3 py-2 mt-6 align-middle bg-white border border-gray-300 rounded-lg`}>
                        <input
                            type="text"
                            value={searchtext}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full p-0 bg-transparent border-none outline-none"
                            placeholder="Ask your question here"
                        />
                        <button>
                            <img src="images/icon/arrow-double-right.svg" alt="" />
                        </button>
                    </div>
                    <p className='mt-3 text-sm text-gray-700'>
                        Purple Ai can explore deeper answers to any questions you have on your selected research.
                    </p>
                </div>
            </div>
            <div className={`w-full ${w_style} mx-auto flex justify-center px-3 py-12`}>
                <div className='w-[68%] pl-3 pr-6 h-full flex flex-col gap-6 justify-center items-center'>
                    <div className='flex flex-col gap-6'>
                        <h1 className='text-3xl font-semibold'>
                            {data.title}
                        </h1>

                        <div className='flex justify-between w-full align-middle'>
                            <span className='flex items-center gap-2 text-xs text-gray-600'>
                                {year} {data.citationCount} Citations | {authors}
                                <img
                                    data-check={checked}
                                    data-citationcount={data.citationCount}
                                    data-paperid={data.paperId}
                                    data-title={data.title}
                                    data-author={authors}
                                    data-year={year}
                                    onClick={handleSave}
                                    src={image_path}
                                    className='h-4 cursor-pointer'
                                    alt=""
                                />
                            </span>
                            <a
                                href={url}
                                className='p-3 text-base font-semibold text-gray-600 border border-gray-300 rounded-md' target="_blank"
                            >
                                Read source
                            </a>
                        </div>

                        <div className='flex flex-col gap-3 text-gray-600'>
                            <h5 className='underline'>Object</h5>
                            <p className='text-sm'>
                                {getAbstractSummary(data)}
                            </p>
                        </div>

                        <p className='text-purple-600 underline'>
                            {data.citationCount} Citations
                        </p>

                        <div className='flex flex-col w-full gap-3 text-gray-600'>
                            {citations.map((data, index) => {
                                var abs = data.abstract ? data.abstract : '';
                                if (!abs) {
                                    abs = getAbstractSummary(data);
                                }

                                return (
                                    <div className='flex flex-col gap-2' key={index}>
                                        <p>
                                            <strong className='py-3 text-sm'>
                                                {data.title}
                                            </strong>
                                        </p>
                                        <p className='text-xs'>
                                            {abs}
                                        </p>
                                        <hr />
                                    </div>
                                );
                            })}
                        </div>


                        <button
                            disabled={showBtnDisable}
                            onClick={() => nextCitations()}
                            className='p-3 font-semibold border border-gray-200 rounded-md hover:bg-gray-400 disabled:bg-gray-400 disabled:text-white'
                        >
                            See More
                        </button>

                    </div>
                </div>
                <div className='w-[32%] h-full pl-6 pr-3 flex flex-col justify-center items-center border border-t-0 border-b-0 border-r-0 border-l-gray-400'>
                    <div className='flex items-center justify-between w-full p-3'>
                        <h1 className='text-lg font-semibold'>
                            Abstract Summary
                        </h1>
                        <div className="dropdown">
                            <button className="p-3 font-semibold border border-gray-300 rounded-md dropdown-toggle">
                                Export As
                            </button>
                            <div className="dropdown-menu">
                                <p
                                    onClick={() => generatePdf()}
                                    className='border dropdown-item border-b-gray-300'
                                >
                                    <img src="images/icon/pdf.svg" alt="" />
                                    PDF
                                </p>
                                <p className='border dropdown-item border-b-gray-300'>
                                    <img src="images/icon/csv.svg" alt="" />
                                    <CSVLink
                                        filename={getCsvFileName()}
                                        data={exportData}
                                    >
                                        CSV
                                    </CSVLink>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full p-6 text-sm text-gray-600 border border-gray-500 rounded-md'>
                        <p className='mb-3 text-base font-medium text-gray-800 underline'>
                            Abstract Summary
                        </p>
                        {data.abstract}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ResearchQuestion;
