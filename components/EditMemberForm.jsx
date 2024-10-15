"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const EditMemberForm = ({ id, member, description }) => {
  const [newMember, setNewMember] = useState(member);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();

  useEffect(() => {
    setNewMember(member);
    setNewDescription(description);
  }, [member, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({newMember, newDescription })
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input
          onChange={(e) => setNewMember(e.target.value)}
          value={newMember}
          className='border border-slate-500 rounded px-8 py-2'
          type="text"
          placeholder="Member Name"
        />

        <input
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
          className='border border-slate-500 rounded px-8 py-2'
          type="text"
          placeholder="Member Details"
        />
        <button className='bg-green-600 text-xs font-medium text-white py-2 px-4 w-fit rounded'>
          Edit Member
        </button>
      </form>
    </div>
  );
};

export default EditMemberForm;
// "use client";
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';

// const EditTopicForm = ({ id, member, description }) => {
//   const [newMember, setEditMember] = useState(member);
//   const [newDescription, setNewDescription] = useState(description);
//   const router = useRouter();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`http://localhost:3000/api/members/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ newMember, newDescription })
//       });

//       if (!res.ok) {
//         throw new Error("Failed to update topic");
//       }

//       router.push("/");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
//         <input
//           onChange={(e) => setEditMember(e.target.value)}
//           value={newMember}
//           className='border border-slate-500 rounded px-8 py-2'
//           type="text"
//           placeholder="Member Name"
//         />

//         <input
//           onChange={(e) => setNewDescription(e.target.value)}
//           value={newDescription}
//           className='border border-slate-500 rounded px-8 py-2'
//           type="text"
//           placeholder="Member Details"
//         />
//         <button className='bg-green-600 text-xs font-medium text-white py-2 px-4 w-fit rounded'>
//           Edit Member
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditTopicForm;