import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv';

import jsPDF from "jspdf";
import "jspdf-autotable";

import { getUserPapers, savePaper, searchPaper } from '../services/apiService';
import NoResult from '../components/NoResult';
import "../styles/AIResearch.css";

const getAbstractSummary = (paper) => {
  var abstract_summary = "";
  if (paper.tldr !== undefined && paper.tldr !== null && paper.tldr.text !== '') {
    abstract_summary = paper.tldr.text;
  } else {
    abstract_summary = paper.abstract;
  }
  return abstract_summary;
}

const parseTableData = (papers) => {
  const tableRows = [];
  papers.map((data, index) => {
    var str = data.authors
      .map(function (author) {
        return author.name;
      })
      .join(", ");

    if (data.publicationDate !== null) {
      var nameArr = data.publicationDate.split("-");
      var year = nameArr[0];
    } else {
      year = "-";
    }

    var abstract_summary = getAbstractSummary(data);

    if (
      data.title !== null &&
      data.title !== "[null]." &&
      abstract_summary !== null &&
      abstract_summary !== ""
    ) {
      const ticketData = [data.title, str, year, abstract_summary];
      // push each tickcet's info into a row
      tableRows.push(ticketData);
    }
  });
  return tableRows;
}

const checkUserPaper = (user_papers, val) => {
  const index = user_papers.findIndex((item) => item.paper_id === val);
  if (index >= 0) return 1;
  else return 0;
}

const AIResearch = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const text = params.get('search') || "";
  const user_id = JSON.parse(localStorage.getItem('user')).id;

  const navigate = useNavigate();

  const [token] = useState(JSON.parse(localStorage.getItem("token")) || "");
  const [searchtext, setSearchText] = useState(text);
  const [papers, setPapers] = useState([]);
  const [summary, setSummary] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [userpapers, setUserPapers] = useState([]);
  const [csvData, setCsvData] = useState([]);

  var page_num = 0;

  const w_style = 'xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px]';

  useEffect(() => {
    if (token === "") {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    } else {
      fetchData();
      getUserPaper(user_id);
    }
  }, [token]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate('/airesearch?search=' + searchtext);
      fetchData();
    }
  }

  const handleAbstract = (event) => {
    setSummary(event.target.attributes.getNamedItem('abs')?.value)
  }

  const handleSave = (event) => {
    console.log('handleSave');
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

  const getUserPaper = (userId) => {
    console.log('getUserPaper', userId);
    getUserPapers(userId)
      .then(data => {
        setUserPapers(data);
      })
      .catch(err => {
        console.error('Error getting user papers', err);
        setUserPapers([]);
      });
  }

  const changePage = (isNext) => {
    if ((page === 0 && !isNext) || (page === total - 1 && isNext)) return;
    page_num = isNext ? page + 1 : page - 1
    setPage(page_num);
    fetchData();
  }

  const fetchData = () => {
    console.log('fetch Data', page_num);
    searchPaper(
      searchtext || 'cancer',
      page_num * 10,
      10,
      true,
      'title,abstract,authors,publicationDate,citationCount,tldr'
    )
      .then((data) => {
        console.log(data);
        setPapers(data.data);
        let total_page = Math.ceil(data.total / 10);
        setTotal(total_page);
        generateCsv(data.data);
        setSummary(getAbstractSummary(data.data[0]));
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }

  const generatePdf = () => {
    console.log('generatePdf');
    const doc = new jsPDF();

    const tableColumn = ["Title", "Authors", "Pub Date", "Abstract Summary"];
    const tableRows = parseTableData(papers);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.save(`paper_${dateStr}.pdf`);
  }

  const generateCsv = (paper_data) => {
    console.log('generateCsv', paper_data);

    const ticketData = ["Title", "Authors", "Pub Date", "Abstract Summary"];

    const tableRows = [ticketData, ...parseTableData(paper_data)];
    setCsvData(tableRows);
  }

  return (
    <div className='w-full min-h-[70vh] pb-8 mx-auto'>
      <div className='flex flex-col items-center justify-center pt-12 pb-8 bg-gray-100'>
        <div className={`flex w-full ${w_style} gap-4 px-3 py-2 mt-6 align-middle bg-white border border-gray-300 rounded-lg`}>
          <input
            type="text"
            value={searchtext}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-0 bg-transparent border-none outline-none"
            placeholder="Start Your Search Here"
          />
          <button>
            <img src="images/icon/arrow-double-right.svg" alt="" />
          </button>
        </div>
        <p className='mt-3 text-sm text-gray-700'>
          Ask a question or enter a search term.
        </p>
      </div>
      {
        papers ?
          <div className={`w-full ${w_style} mx-auto flex justify-center p-8`}>
            <div className='w-[68%] px-6 h-full flex flex-col gap-6 justify-center items-center'>
              <div className='flex items-center justify-between w-full'>
                <p className='text-lg font-semibold'>
                  I’ve found these results
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
                    papers.map((paper, i) => {
                      var abstract_summary = getAbstractSummary(paper);
                      var checked = checkUserPaper(userpapers, paper.paperId);
                      var image_path = checked ? 'images/icon/check.svg' : 'images/icon/check-empty.svg';
                      const authors = paper.authors.map(author => author.name).join(', ');

                      return (
                        <tr className='hover:bg-gray-200' key={i} onMouseEnter={handleAbstract}>
                          <td className="h-full p-3 border border-slate-300 hover:font-semibold" abs={abstract_summary}>
                            <div className='flex gap-3'>
                              <img
                                data-check={checked}
                                data-citationcount={paper.citationCount}
                                data-paperid={paper.paperId}
                                data-title={paper.title}
                                data-author={authors}
                                data-year={paper.publicationDate?.split('-')[0]}
                                onClick={handleSave}
                                src={image_path}
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
                          <td className="p-3 border border-slate-300" abs={abstract_summary} >
                            {authors}
                          </td>
                          <td className="p-3 border border-slate-300" abs={abstract_summary}>{paper.publicationDate}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
              <div className='flex justify-between w-full p-6 border border-collapse border-slate-400'>
                <p>
                  Page {page + 1} of {total}
                </p>
                <div className='flex gap-6'>
                  <button
                    onClick={() => changePage(false)}
                    className='p-3 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md'
                  >
                    Previous
                  </button>
                  <button 
                    onClick={() => changePage(true)}
                    className='p-3 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md'
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            <div className='w-[32%] h-full p-6 flex flex-col justify-center items-center border border-t-0 border-b-0 border-r-0 border-l-gray-400'>
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
                    <p
                      className='dropdown-item'
                    >
                      <img src="images/icon/csv.svg" alt="" />
                      <span>
                        <CSVLink data={csvData}> CSV </CSVLink>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className='w-full p-6 text-sm font-semibold text-purple-800 border border-gray-500 rounded-md'>
                {summary}
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

export default AIResearch;
