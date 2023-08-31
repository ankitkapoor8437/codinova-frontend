import React, { useEffect, useState } from 'react'
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import avatarIcon from '../assets/images/null.png'
import { useDispatch, useSelector } from 'react-redux';
import { readData } from '../../feature/exchangeDataSlice';



const ExchangeList = () => {

    // Extract 'exchangeData' and 'searchData' from the app state using useSelector
    const { exchangeData, searchData } = useSelector((state) => state.app);
    const dispatch = useDispatch();

    // useEffect hook to dispatch the 'readData' action when component mounts
    useEffect(() => {
        dispatch(readData());
    }, [dispatch]);

    //  Pagination Logic
    const [active, setActive] = useState(1);
    const recordsPerPage = 10;
    const firstIndex = (active - 1) * recordsPerPage;
    const lastIndex = firstIndex + recordsPerPage;
    const records = exchangeData.slice(firstIndex, lastIndex);
    const numberOfPages = Math.ceil(exchangeData.length / recordsPerPage);
    const numbers = [...Array(numberOfPages + 1).keys()].slice(1);

    // Logics for the Page movement
    const getItemProps = (index) => ({
        variant: active === index ? "filled" : "text",
        color: "blue",
        onClick: () => setActive(index),
        className: "rounded-full",
    });

    const next = () => {
        if (active === numberOfPages) return;
        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
    };

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <section>

            {/* Refresh button to reload the Data when no data is avalain */}
            <button className='flex items-center text-xs gap-1 text-smallTextColor font-[600] mb-5 border border-solid 
        border-smallTextColor py-2 px-2 rounded-md max-h-[30px] hover:bg-smallTextColor hover:text-white 
        hover:font-[500] ease-in-out duration-100'
                onClick={() => { refreshPage() }}>
                <i className='ri-send-plane-line'></i>Refresh the Table
            </button>

            {/* Exchange Data Table */}
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
                            records.filter(element => {
                                if (searchData.length === 0) {
                                    return true;
                                } else {
                                    return element.name.toLowerCase().includes(searchData.toLowerCase());
                                }
                            }).map(listData => (
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
            </div>

            {/* Pagination Section */}
            <div className="flex items-center gap-4 justify-center mt-10">
                <Button
                    variant="text"
                    className="flex items-center gap-2 rounded-full"
                    onClick={prev}
                    disabled={active === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                </Button>
                <div className="flex items-center gap-2">
                    {active <= 4 ? (
                        numbers.slice(0, 7).map((number) => (
                            <IconButton key={number} {...getItemProps(number)}>
                                {number}
                            </IconButton>
                        ))
                    ) : (
                        <>
                            {/* Show the first page */}
                            <IconButton {...getItemProps(1)}>1</IconButton>
                            <span className="text-gray-400">...</span>
                            {numbers.slice(active - 3, active + 1).map((number) => (
                                <IconButton key={number} {...getItemProps(number)}>
                                    {number}
                                </IconButton>
                            ))}
                        </>
                    )}
                    {numberOfPages > 7 && active < numberOfPages - 3 && (
                        <>
                            <span className="text-gray-400">...</span>
                            <IconButton {...getItemProps(numberOfPages)}>
                                {numberOfPages}
                            </IconButton>
                        </>
                    )}
                </div>
                <Button
                    variant="text"
                    className="flex items-center gap-2 rounded-full"
                    onClick={next}
                    disabled={active === numberOfPages}
                >
                    Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
            </div>

        </section>
    );
}

export default ExchangeList;



