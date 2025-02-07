import { UserRound } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

export default function Navbar() {
    const { user, logout } = useContext(AppContext);

    return (
        <header className='w-full bg-blue-500 sticky top-0 shadow-xl z-30'>
            <div className='p-4 flex justify-between max-w-7xl mx-auto'>
                <UserRound className='text-white' />

                <div className='flex flex justify-center gap-8'>
                    <Link to='/' className='text-white'>
                        Home
                    </Link>
                    {
                        user && 
                        <Link to='/addQues' className='text-white'>
                            Add Ques
                        </Link>
                    }
                    {
                        !user ?
                        <Link to='/login' className='text-white'>
                            Login
                        </Link>
                        :
                        <p className='cursor-pointer text-white' onClick={() => logout()}>
                            Logout
                        </p>
                    }
                </div>
            </div>
        </header>
    )
}
