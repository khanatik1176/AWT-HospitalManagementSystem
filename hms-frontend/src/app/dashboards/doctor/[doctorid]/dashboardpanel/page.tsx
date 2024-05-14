import Cookies from 'js-cookie'
import React from 'react'

const dashboardPanel = () => {

  return (
    <div className="dashboard-main bg-gray-600 h-screen">
    <div className='bg-indigo-400 h-52'>
     <h1 className='text-black text-4xl p-10 font-bold'> Welcome Mr.X</h1>
    
    <div className='search-bar-area flex justify-end pr-10'>
        <form action="" className="search">
        <input type="text" className='bg-white border-collapse pb-1 pt-1 pl-2 rounded-xl text-start text-black placeholder-black' placeholder='Search' name="" id="" />
        </form>
    </div>

    <div className="visual-area">
        
    </div>
    
    </div>
    </div>

    
    

  )
}

export default dashboardPanel
