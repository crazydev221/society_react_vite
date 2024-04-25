import React, { useState } from 'react';
import Donate from '../components/Donate';
import { addEmailNewsletter, checkEmailSubscriber } from '../services/baseService';
import { toast } from 'react-toastify';

function CharitableTaxDeduction() {
    const [email, setEmail] = useState('');

    const saveNewsletter = () => {
        checkEmailSubscriber(email).then(res => {
            if(res.data.email) {
                toast.warn('Your Email is already subscribed!');
            } else {
                addEmailNewsletter(email).then(res => {
                    toast.success('Newsletter subscribed successfully!');
                }).catch(err => {
                    console.error('Error add email', err);
                    toast.error("Couldn't add email as newsletter");
                });
            }
        }).catch(err => {
            console.error('Error check email', err);
            toast.error('Connecting Server Error!');
        });
    }

    return (
        <div className="w-full">
            <div className="w-full bg-purple-950">
                <div className='w-full max-w-[768px] mx-auto py-20 text-white text-center flex flex-col gap-9'>
                    <h1 className='text-4xl font-extralight'>
                        7 charitable tax deduction questions answered
                    </h1>
                    <p className='text-xl font-normal'>
                        A basic guide to the potential tax implications (and advantages) of donating to The Purple Society
                    </p>
                </div>
            </div>
            <div className="w-full max-w-[768px] mx-auto py-9 px-3 flex flex-col gap-9">
                <p className='text-lg text-gray-600'>
                    Your contributions to a reputable charitable organization such as The Purple Society carry much more than financial benefits;
                    they become a beacon of hope and an instrument of change in the world. In addition to having a profound positive impact on those in need,
                    your generous donations are also recognized by the IRS, allowing you to benefit from income tax charitable deductions.
                </p>
                <div className="w-full flex flex-col gap-3">
                    <h8 className='text-xl font-semibold'>
                        1. How much should I donate to charity to influence my taxes?
                    </h8>
                    <p className='text-gray-600'>
                        Contributions to IRS-qualified 501(c)(3) charitable organizations like The Purple Society have the potential 
                        to reduce your tax bill when you itemize your deductions. You generally itemize when your deductions—including 
                        charitable contributions—exceed the standard deduction.
                    </p>

                    <h9 className='text-xl text-gray-800 font-semibold text-center my-3'>
                        2023 standard tax deductions
                    </h9>

                    <table className="w-full text-sm border border-collapse border-slate-400 mb-6 text-center">
                        <thead>
                            <tr>
                                <th className="w-[50%] p-3 bg-gray-100 border border-slate-300">Filing as</th>
                                <th className="w-[50%] p-3 bg-gray-100 border border-slate-300">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="h-full p-3 border border-slate-300 font-semibold">Single</td>
                                <td className="h-full p-3 border border-slate-300 bg-gray-50">$13,850</td>
                            </tr>
                            <tr>
                                <td className="h-full p-3 border border-slate-300 font-semibold">Married filing jointly</td>
                                <td className="h-full p-3 border border-slate-300 bg-gray-50">$27,700</td>
                            </tr>
                            <tr>
                                <td className="h-full p-3 border border-slate-300 font-semibold">Head of household</td>
                                <td className="h-full p-3 border border-slate-300 bg-gray-50">$20,800</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className='text-gray-500'>
                        Keep track of your charitable contributions throughout the year, and consider any additional applicable deductions.
                        Generally taxpayers use the larger deduction, standard or itemized, when it's time to file taxes.
                    </p>

                    <hr />
                </div>
                <div className="w-full flex flex-col gap-3">
                    <h8 className='text-xl font-semibold'>
                        2. What can I include in tax deductions?
                    </h8>
                    <p className='text-gray-500'>
                        To qualify for a tax deduction through charitable giving, you will have to itemize your deductions,
                        meaning your total deductions should ideally exceed the standard deduction.
                        The expenses commonly recognized include:
                    </p>

                    <ul className='list-disc list-outside pl-6 text-gray-500'>
                        <li>Mortgage interest</li>
                        <li>State and local tax</li>
                        <li>Charitable contributions</li>
                        <li>Medical and dental expenses</li>
                    </ul>
                    <hr />
                    <div className="flex">
                        <img
                            className='p-3 w-32 border border-t-0 border-b-0 border-l-0 border-r-gray-300'
                            src='images/icon/tax2.png'
                            alt='tax2'
                        />
                        <div className="flex flex-col justify-center gap-3 pl-6 text-gray-500">
                            <p className="text-lg font-semibold">
                                Looking for a tax-efficient way to give to your favorite charities?
                            </p>
                            <p>
                                When you contribute cash, securities or other assets to an IRS-qualified 501(c)(3) public charity,
                                like The Purple Society, you are generally eligible to take an immediate tax deduction.
                            </p>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="w-full flex flex-col gap-3">
                    <h8 className='text-xl font-semibold'>
                        3. What is the maximum charitable tax deduction I can claim?
                    </h8>
                    <p className="text-gray-500">
                        When donating cash to a charity such as The Purple Society, you can typically deduct up to
                        60% of your adjusted gross income. Assets held for over a year, like stocks or property, are generally
                        deductible at their fair market value, up to 30% of your adjusted gross income.
                        By diversifying the types of assets you donate, you can optimize the amount you can claim as a tax deduction.
                    </p>
                </div>
                <hr />

                <div className="w-full flex flex-col gap-3">
                    <h8 className='text-xl font-semibold'>
                        4. What are the steps to claim a charitable contribution deduction?
                    </h8>
                    <p className="text-gray-500">
                        If you've chosen to extend a hand of kindness to those in need through a charitable organization,
                        follow these steps to claim your charitable deduction:
                    </p>
                    <ul className='list-disc list-outside pl-6 text-gray-500'>
                        <li>
                            Confirm that your chosen organization is an IRS-qualified 501(c)(3) public charity or private foundation.
                            The Purple Society is one of those charities.
                        </li>
                        <li>
                            Maintain a record of your contribution, typically the tax receipt provided by the charity.
                        </li>
                        <li>
                            If donating non-cash items, in certain situations, you may need a qualified appraisal
                            to confirm the value of the deduction.
                        </li>
                        <li>
                            With your documents organized, itemize your deductions and submit your tax return.
                        </li>
                    </ul>
                </div>
                <hr />

                <div className="w-full flex flex-col gap-3">
                    <h8 className='text-xl font-semibold'>
                        5. How does my tax bracket influence my deductions?
                    </h8>
                    <p className="text-gray-500">
                        Tax brackets are determined by your taxable income and filing status. This tiered system means
                        that different portions of your income are taxed at varying rates. The marginal tax rate—the percentage of
                        tax applied to your next dollar of taxable income above a certain threshold—reflects your top tax rate.
                    </p>
                </div>
                <hr />

                <h9 className='text-xl text-gray-800 font-semibold text-center my-3'>
                    2023 standard tax deductions
                </h9>

                <table className="w-full text-sm border border-collapse border-slate-400 mb-6 text-center">
                    <thead>
                        <tr>
                            <th className="p-3 bg-gray-100 border border-slate-300"> Rate </th>
                            <th className="p-3 bg-gray-100 border border-slate-300"> For Unmarried Individuals, Taxable Income Over </th>
                            <th className="p-3 bg-gray-100 border border-slate-300"> For Married Individuals Filing Joint Returns, Taxable Income Over </th>
                            <th className="p-3 bg-gray-100 border border-slate-300"> For Heads of Households, Taxable Income Over </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="h-full p-3 border border-slate-300">10%</td>
                            <td className="h-full p-3 border border-slate-300">$0</td>
                            <td className="h-full p-3 border border-slate-300">$0</td>
                            <td className="h-full p-3 border border-slate-300">$0</td>
                        </tr>
                        <tr>
                            <td className="h-full p-3 border border-slate-300">12%</td>
                            <td className="h-full p-3 border border-slate-300">$11,000</td>
                            <td className="h-full p-3 border border-slate-300">$22,000</td>
                            <td className="h-full p-3 border border-slate-300">$15,700</td>
                        </tr>
                        <tr>
                            <td className="h-full p-3 border border-slate-300">22%</td>
                            <td className="h-full p-3 border border-slate-300">$44,725</td>
                            <td className="h-full p-3 border border-slate-300">$89,450</td>
                            <td className="h-full p-3 border border-slate-300">$59,850</td>
                        </tr>
                        <tr>
                            <td className="h-full p-3 border border-slate-300">24%</td>
                            <td className="h-full p-3 border border-slate-300">$95,375</td>
                            <td className="h-full p-3 border border-slate-300">$190,750</td>
                            <td className="h-full p-3 border border-slate-300">$95,350</td>
                        </tr>
                        <tr>
                            <td className="h-full p-3 border border-slate-300">32%</td>
                            <td className="h-full p-3 border border-slate-300">$182,100</td>
                            <td className="h-full p-3 border border-slate-300">$364,200</td>
                            <td className="h-full p-3 border border-slate-300">$182,100</td>
                        </tr>
                        <tr>
                            <td className="h-full p-3 border border-slate-300">35%</td>
                            <td className="h-full p-3 border border-slate-300">$231,250</td>
                            <td className="h-full p-3 border border-slate-300">$462,500</td>
                            <td className="h-full p-3 border border-slate-300">$231,250</td>
                        </tr>
                        <tr>
                            <td className="h-full p-3 border border-slate-300">37%</td>
                            <td className="h-full p-3 border border-slate-300">$578,125</td>
                            <td className="h-full p-3 border border-slate-300">$693,750</td>
                            <td className="h-full p-3 border border-slate-300">$578,100</td>
                        </tr>
                    </tbody>
                </table>
                <hr />
                
                <div className="flex flex-col gap-3">
                    <h9 className='text-xl font-semibold'>
                        Stay in the loop for all of the ways you can help children fighting cancer!
                    </h9>
                    <p className="text-gray-500">
                        Sign up to receive occasional news, information, and tips that support smarter philanthropic impact for families fighting childhood cancer.
                    </p>
                    <div className="flex flex-col">
                        <label>Email</label>
                        <div className="flex gap-3">
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='p-3 border border-gray-300 rounded-md'
                                placeholder='Email'
                                name='email'
                            />
                            <button
                                onClick={() => saveNewsletter()}
                                className="p-3 rounded-md bg-purple-600 text-white font-semibold"
                            >
                                Sing Up
                            </button>
                        </div>
                    </div>
                </div>
                <hr />

                <div className="w-full flex flex-col gap-3">
                    <h8 className='text-xl font-semibold'>
                        6. How does the removal of the Pease limitation impact my tax deduction?
                    </h8>
                    <p className="text-gray-500">
                        The Tax Cut and Jobs Act of 2017 eliminated the Pease limitation, which was a reduction on itemized deductions
                        for higher-income taxpayers. This change has removed certain restrictions that previously 
                        impacted the value of your itemized deductions.
                    </p>
                </div>
                <hr />

                <div className="w-full flex flex-col gap-3">
                    <h8 className='text-xl font-semibold'>
                        7. Can I receive a Fair Market Value deduction for donating private S-corp or C-corp stocks to charity?
                    </h8>
                    <p className="text-gray-500">
                        Yes, the full fair market value of your contribution can be deducted if the beneficiary organization
                        is a public charity. However, the charity's capacity to accept and liquidate private stock varies.
                        At The Purple Society, we work closely with donors and their advisors to process charitable donations
                        of S-corp and private C-corp stock daily, among other assets.
                    </p>
                    <p className="text-gray-500">
                        By donating private stock, not only can you avoid paying capital gains taxes on its subsequent sale,
                        but you may also be eligible to deduct its full fair market value, as determined by a qualified appraisal.
                        Since 2011, we have been assisting donors like you to make a more profound impact on the childhood cancer community.
                        Join the loving donors who have chosen The Purple Society as their partner in making their giving easier and more effective.
                    </p>
                </div>
                <hr />

                <p className="text-sm text-gray-500">
                    The tax information provided is general and educational in nature, and should not be construed as legal or tax advice.
                    The Purple Society does not provide legal or tax advice. Content provided relates to taxation at the federal level only.
                    Charitable deductions at the federal level are available only if you itemize deductions. Rules and regulations regarding 
                    tax deductions for charitable giving vary at the state level, and laws of a specific state or laws relevant to a particular
                    situation may affect the applicability, accuracy, or completeness of the information provided. As a result, The Purple Society
                    cannot guarantee that such information is accurate, complete, or timely. Tax laws and regulations are complex and subject to change,
                    and changes in them may have a material impact on pre- and/or after-tax results. The Purple Society makes no warranties with
                    regard to such information or results obtained by its use. The Purple Society disclaims any liability arising out of your use of,
                    or any tax position taken in reliance on, such information. Always consult an attorney or tax professional regarding your
                    specific legal or tax situation.
                </p>
                <hr />

                <div className="w-full flex flex-col gap-3 text-center">
                    <h8 className='text-xl font-semibold'>
                        How The Purple Society can help
                    </h8>
                    <p className="text-gray-500">
                        Since 1991, we have been helping donors like you support families fighting childhood cancer in smarter ways.
                        We can help you explore the different charitable vehicles available and explain how you can complement and
                        maximize your current giving strategy. Every dollar counts! Join the loving donors who choose The Purple Society
                        to make their giving simple and more effective.
                    </p>
                </div>
            </div>

            <Donate />
        </div>
    )
}

export default CharitableTaxDeduction;
