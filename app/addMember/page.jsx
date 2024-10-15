"use client";

import { useState } from "react"
import { useRouter } from "next/navigation";

const AddMember = () => {
  const [member, setMember] = useState("");
  const [description, setDescription] = useState("");
  // const [image, setImage] = useState(null);
  // Add Image for later
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!member || !description) {
      alert("Member Name and Description are required.")
      return;
    }
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ member, description }),
      });
  
      // Check if the response is ok
      if (!res.ok) {
        // Try to parse the error response if available
        const errorData = await res.text(); // read the response as text
        throw new Error(errorData || "Failed to add a member");
      }
  
      // If successful, handle the response data
      const data = await res.json();
      console.log(data); // You can log the response data if needed
  
      // Redirect after success
      router.push("/");
  
    } catch (error) {
      console.log(error.message); // Log the error message
    }
  

  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input 
          onChange = {(e) => setMember(e.target.value)}
          value = {member}
          className='border border-slate-500 rounded px-8 py-2'
          type="text" 
          placeholder="Member Name" 
        />

        <input 
            onChange = {(e) => setDescription(e.target.value)}
            value = {description}
            className='border border-slate-500 rounded px-8 py-2'
            type="text" 
            placeholder="Member Details" 
        />
        <button type="submit" className='bg-green-600 text-xs font-medium text-white py-2 px-4 w-fit rounded'>Add Member</button>
    </form>
  )
}

export default AddMember
