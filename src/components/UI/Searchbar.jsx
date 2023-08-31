import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { searchExchange } from '../../feature/exchangeDataSlice';

const Searchbar = () => {

    // State to hold the search data
    const [searchData, setSearchData] = useState("");
    const dispatch = useDispatch();


    // useEffect hook to dispatch the 'searchExchange' action when searchData changes
    useEffect(() => {
        dispatch(searchExchange(searchData));
    }, [dispatch, searchData]);

    return (
        // Search Bar Section
        <div >
            <div className="mt-[100px] flex justify-center items-center">
                <div className="mb-3 xl:w-96">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            className="relative m-0 block flex-auto rounded-[30px] border border-solid font-semibold border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base  leading-[1.6]
                text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3]  focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-blue-500 dark:focus:border-primary"
                            placeholder="Find an exchange"
                            aria-label="Search"
                            aria-describedby="button-addon2"
                            value={searchData}
                            onChange={(e) => setSearchData(e.target.value)}
                            type="search" />

                        {/* <!--Search icon--> */}
                        <span
                            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5
                text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                            id="basic-addon2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5">
                                <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Searchbar;