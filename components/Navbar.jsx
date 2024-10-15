import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-slate-800 rounded px-8 py-3'>
      <Link className="text-white font-bold" href={"/"}>MemberEASE</Link>
      <Link className="bg-white p-2 rounded font-medium" href={'/addMember'}>Add Member</Link>
    </nav>
  )
}

export default Navbar
