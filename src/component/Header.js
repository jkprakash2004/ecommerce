import React, { useContext, useState } from 'react'
import "./styles/head.css"
import { Link } from 'react-router-dom';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
const Header = () => {
  return (    
    <header className='head'>        
      <div  className='container'>
            <div className='logo'>                
                <Link to={"/"}>
                    <span>Shoping</span>
                </Link>
            </div>
            <div className='int-box'>
                <input type='text' placeholder='search product here...' />
                <div className='ser'>
                  <GrSearch />
                </div>
            </div>
        <div className='login-btn flex gap-10'>
            <button className='c-slate-700 font-serif font-thin'>
              <Link to="product/allCartProduct">
              <FaShoppingCart/>
              </Link>
              </button>          
            <button ><Link to="login">Login</Link></button>                         
        </div>

      </div>
    </header>
  )
}

export default Header