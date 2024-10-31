import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-slate-800 rounded px-8 py-3'>
      <Link className="text-white font-bold" href={"/"}>MemberEASE</Link>
      <div className="flex ml-auto space-x-4">
        <Link className="bg-white p-2 rounded font-medium" href={'/scanMember'}>Scan Member</Link>
        <Link className="bg-white p-2 rounded font-medium" href={'/addMember'}>Add Member</Link>
      </div>
    </nav>
  );
};

export default Navbar;