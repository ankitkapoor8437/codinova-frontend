import React, { useEffect, useState } from 'react'
import menuItems from '../data/menuItems'
import { getRequest, postRequest } from '../apis/axios';
import { addExchangeData, addExchangeIcon, getExchangeDataApi, getExchangeIconApi } from '../apis/routes';



const Navbar = () => {
    // State variables to hold exchange data and icons
    const [exchangeData, setExchangeData] = useState([]);
    const [exchangeIcon, setExchangeIcon] = useState([]);

    // Function to handle button click and perform API requests
    const handleButtonClick = async () => {
        // Fetch exchange data and icons from APIs
        const exchangeDataApiResponse = await getRequest(getExchangeDataApi);
        const exchangeIconApiResponse = await getRequest(getExchangeIconApi);
        if (exchangeDataApiResponse && exchangeIconApiResponse) {
            setExchangeData(exchangeDataApiResponse);
            setExchangeIcon(exchangeIconApiResponse);
        }

    }

    // useEffect hook to send exchange data and icons to the backend
    useEffect(() => {
        if (exchangeData && exchangeIcon && exchangeData !== [] && exchangeIcon !== []) {
            const addDataUrl = process.env.REACT_APP_NODE_BACKEND_URL + addExchangeData
            const addIconUrl = process.env.REACT_APP_NODE_BACKEND_URL + addExchangeIcon
            postRequest(addDataUrl, exchangeData);
            postRequest(addIconUrl, exchangeIcon);
        }

    }, [exchangeData, exchangeIcon])


    return (
        <header className='w-full h-[80px] leading-[80px] flex items-center'>
            <div className="container">
                <div className='flex items-center justify-between'>
                    {/* Logo */}
                    <div className='flex items-center gap-[10px]'>
                        <a href="/">
                            <span className='w-[35px] h-[35px] bg-primaryColor text-white text-[18px] font-[500] rounded-full flex items-center justify-center'>
                                C
                            </span>
                        </a>

                        <div className="leading-[20px]">
                            <h2 className='text-xl text-smallTextColor font-[700]'>Codinova</h2>
                            <p className='text-smallTextColor text-[10px] font-[500]'>Crypto Exchange</p>
                        </div>
                    </div>
                    {/* Logo End */}

                    {/* Menu Start */}
                    <div className='menu'>
                        <ul className='flex  items-center gap-10 '>
                            {
                                menuItems.map(({ url, display }) => (
                                    <li >
                                        <a className='text-smallTextColor font-[600]' href={url}>{display}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    {/* Menu End */}

                    {/* Menu Right Section */}
                    <div className='flex items-center gap-4'>
                        {/* Button to handle Update request */}
                        <button className='flex items-center text-xs gap-1 text-smallTextColor font-[600] border border-solid border-smallTextColor py-2 px-2 rounded-md max-h-[30px] hover:bg-smallTextColor hover:text-white hover:font-[500] ease-in-out duration-100'
                            onClick={() => { handleButtonClick() }}>
                            <i className='ri-send-plane-line'></i>Update Exchange Data
                        </button>
                    </div>
                    {/* Menu Right End */}
                </div>
            </div>
        </header>
    )
}

export default Navbar