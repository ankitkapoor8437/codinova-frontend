import React from 'react'
import Header from '../components/UI/Header';
import ExchangeList from '../components/UI/ExchangeList';
import Searchbar from '../components/UI/Searchbar';

const Layout = () => {
    return (
        <section>
            <Header/>
            <Searchbar/>
            <ExchangeList/>
        </section>
    )
}

export default Layout;