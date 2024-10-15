"use client"

import {HiOutlineTrash} from "react-icons/hi"
import { useRouter } from "next/navigation";

const Removebtn = ({id, removeMemberFromList}) => {
  const router = useRouter();
  const removeMember = async () => {
      const confirmed  = confirm('Remove the member?')

      if (confirmed) {
        const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/members?id=${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          console.error('Failed to remove member');
          return;
        }
        removeMemberFromList(id);
      }
  }
  return (
    <button onClick={removeMember} className='text-red-400'>
      <HiOutlineTrash size={20} />
    </button>
  )
}

export default Removebtn
