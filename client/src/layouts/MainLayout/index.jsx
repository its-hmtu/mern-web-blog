import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

const MainLayout = () => {
  return (
    <div className='main-layout__container'>
      <Header />
      <div className="main-layout__outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout