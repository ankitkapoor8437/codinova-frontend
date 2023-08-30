import React from 'react'
import Header from '../components/header/Header'
import Navbar from '../components/navbar.jsx/Navbar'
import ExchangeList from '../components/exchangeList/ExchangeList'

const Layout = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <ExchangeList/>
    </div>
  )
}

export default Layout