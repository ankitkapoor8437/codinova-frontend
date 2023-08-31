import React, { useEffect, useState } from 'react'
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { getExchangeData } from '../../apis/axios';
import { addExchangeData, addExchangeIcon } from '../../apis/routes';
import avatarIcon from '../assets/images/null.png'


const ExchangeList = () => {

    const [combinedData, setCombinedData] = useState([]);
    const [exchangeData, setExchangeData] = useState([]);
    const [exchangeIcon, setExchangeIcon] = useState([]);

    const fetchDataApi = async () => {
        try {
            const exchangeDataResponse = await getExchangeData(addExchangeData);
            const exchangeIconResponse = await getExchangeData(addExchangeIcon);

            if (exchangeDataResponse && exchangeIconResponse) {
                setExchangeData(exchangeDataResponse);
                setExchangeIcon(exchangeIconResponse);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchDataApi();
    }, []);

    useEffect(() => {
        if (exchangeData.length > 0 && exchangeIcon.length > 0) {
            const combinedData = exchangeData.map(data => {
                const matchingIcon = exchangeIcon.find(icon => icon.exchange_id === data.exchange_id);
                return {
                    ...data,
                    icon_url: matchingIcon ? matchingIcon.url : null,
                };
            });

            setCombinedData(combinedData);
        }
    }, [exchangeData, exchangeIcon]);

    // console.log(combinedData);


    // Pagination Logic
    const [exchanges, setExchanges] = useState([]);
    const [active, setActive] = useState(1);
    const recordsPerPage = 10;


    const firstIndex = (active - 1) * recordsPerPage;
    const lastIndex = firstIndex + recordsPerPage;
    const records = combinedData.slice(firstIndex, lastIndex);
    const numberOfPages = Math.ceil(exchanges.length / recordsPerPage);
    const numbers = [...Array(numberOfPages + 1).keys()].slice(1);

    const getItemProps = (index) => ({
        variant: active === index ? "filled" : "text",
        color: "blue",
        onClick: () => setActive(index),
    });

    const next = () => {
        if (active === numbers.length) return;
        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
    };

    return (
        <section>
            <div className="flex flex-col ">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-md font-semibold text-gray-500 uppercase tracking-wider"
                                        >
                                            Exchanges
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-md font-semibold text-gray-500 uppercase tracking-wider"
                                        >
                                            24H Trade Volume
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-md font-semibold text-gray-500 uppercase tracking-wider"
                                        >
                                            Remove the exchange
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        records.map(listData => (
                                            <tr key={listData.exchange_id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            {/* Use a conditional rendering to show either the icon or a placeholder */}
                                                            {listData.icon_url ? (
                                                                <img className="h-10 w-10 rounded-full" src={listData.icon_url} alt="" />
                                                            ) : (
                                                                <img className="h-10 w-10 rounded-full" src={avatarIcon} alt="avatarIcon" />
                                                                )}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-lg font-medium text-gray-900">{listData.name}</div>
                                                            <a href={listData.website} className="text-md mt-2 text-gray-500" target="_blank" rel="noopener noreferrer">
                                                                {listData.website}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                                    <div className="text-md font-bold text-gray-900">$ {listData.data_symbols_count} Billion</div>
                                                </td>
                                                <td className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <button className="text-indigo-600 text-lg font-bold hover:text-indigo-900">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            <div className='flex justify-center items-center mt-[35px] mb-[35px]'>
                                <div className="flex items-center gap-4">
                                    <Button
                                        variant="text"
                                        className="flex items-center gap-2"
                                        onClick={prev}
                                        disabled={active === 1}
                                    >
                                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                                    </Button>
                                    <div className="flex justify-center items-center gap-2">
                                        {numbers.map((number) => (
                                            <IconButton key={number} {...getItemProps(number)}>
                                                {number}
                                            </IconButton>
                                        ))}
                                    </div>
                                    <Button
                                        variant="text"
                                        className="flex items-center gap-2"
                                        onClick={next}
                                        disabled={active === numbers.length}
                                    >
                                        Next
                                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </section>
    );
}

export default ExchangeList;



