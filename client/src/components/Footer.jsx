import React from 'react'

function Footer() {
  return (
    <div className='w-full py-10 bg-gray-300'>
        <div className='flex lg:flex-nowrap flex-wrap justify-center items-center gap-4 w-full xl:w-[1250px] lg:w-[1000px] md:w-[750px] sm:w-[640px] mx-auto'>
            <div>
                <p className='text-sm text-gray-600'>
                    © The Purple Society, A Registered 501(c)3 Charity 2022-2023 | #273785281
                </p>
                <small className='mt-2 leading-5 text-gray-600 text-[12px]'>
                    The Purple Society website is designed for educational purposes only and is not engaged in rendering medical advice or professional services. <br />
                    The information provided through this site should not be used for diagnosing or treating a health problem or a disease. It is not a substitute for professional care. <br />
                    If you have or suspect you may have a health problem, you should consult your health care provider.
                </small>
            </div>
            <img className='w-[75px] h-[75px]' src="images/qr.jpg" alt="" />
            <div className='flex flex-col items-center justify-center'>
                <ul className="flex gap-4">
                    <li>
                        <a href="#"></a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/ThePurpleSociety">
                            <img src="images/icon/facebook.svg" alt="" />
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/werpurpletweets">
                            <img src="images/icon/twitter.svg" alt="" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/thepurplesociety/">
                            <img src="images/icon/instagram.svg" alt="" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/company/the-purple-society-inc/">
                            <img src="images/icon/linkedin.svg" alt="" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.google.com/search?q=the+purple+society">
                            <img src="images/icon/google.svg" alt="" />
                        </a>
                    </li>
                </ul>
                <a href="mailto-:help@werpurple.org" className='flex gap-1 mt-4 text-sm'>
                    <img src="images/icon/envelope.svg" alt="" /> 
                    <span>help@werpurple.org</span>
                </a>
            </div>
        </div>
    </div>
  )
}

export default Footer;
