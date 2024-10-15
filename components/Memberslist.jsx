"use client"
import React, { useEffect, useState } from 'react';
import Removebtn from './Removebtn';
import Link from 'next/link';
import { HiPencilAlt } from "react-icons/hi";
import moment from 'moment-timezone';

const getMembers = async () => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`, {
      cache: "no-store",
    });

    if (!result.ok) {
      throw new Error('Failed to fetch members');
    }

    return result.json();
  } catch (error) {
    console.log("Error loading members: ", error);
    return { members: [] }; // Return an empty array if there's an error
  }
};

const Memberslist = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const data = await getMembers();
      setMembers(data.members || []); // Ensure members is always an array
    };

    fetchMembers();
  }, []);

  const removeMemberFromList = (id) => {
    setMembers((prevMembers) => prevMembers.filter(member => member._id !== id));
  };
  // TODO: Add picture to the member list.
  return (
    <>
    
      {members.map((m) => (
        <div key={m._id} className='p-4 border border-slate-300 my-3 flex justify-between rounded gap-5 items-start'>
          <div>
            <h2 className='font-bold text-2xl'>{m.member}</h2>
            <div>{m.description}</div>
            <div className='text-green-600'>
              Date registered: {moment.tz(m.createdAt, 'Asia/Manila').format('MMMM D, YYYY')}
            </div>
          </div>
          <div className='flex gap-2'>
            <Removebtn id={m._id} removeMemberFromList={removeMemberFromList} />
            <Link href={`/editMember/${m._id}`}>
              <HiPencilAlt size={20} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Memberslist;


