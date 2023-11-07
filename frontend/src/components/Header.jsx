import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function Header() {
  return (
    <header className='flex w-full pt-5 pb-5 bg-teal-600 text-white text-lg items-center justify-center'>
      <ul className='flex justify-around w-full font-medium gap-2 max-sm:justify-center text-center'>
        <Link to='/home'>My Expenses</Link>
        <Link to='/article'>Articles</Link>
        <Link to='/saved-articles'>Favorites Articles</Link>
      </ul>
    </header>
  )
}

export default Header
