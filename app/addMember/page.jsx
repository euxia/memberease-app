"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';

const AddMember = () => {
  const [member, setMember] = useState("");
  const [description, setDescription] = useState("");
  const [addedMember, setAddedMember] = useState(null);
  const [qrCodeId, setQrCodeId] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!member || !description) {
      alert("Member Name and Description are required.");
      return;
    }
  
    const qrID = uuidv4(); // Generate a random qrID
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ member, description, qrID }),
      });
  
      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(errorData || "Failed to add a member");
      }
  
      // Generate QR code
      QRCode.toDataURL(qrID, {
        width: 300,
        margin: 2,
        color: {
          dark: '#335383FF',
          light: '#EEEEEEFF'
        }
      }, (err, url) => {
        if (err) return console.error(err);
        setQrCodeId(url);
      });
  
      // Set the added member data to state
      setAddedMember({ member, description, qrID });
  
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input 
          onChange={(e) => setMember(e.target.value)}
          value={member}
          className='border border-slate-500 rounded px-8 py-2'
          type="text" 
          placeholder="Member Name" 
        />

        <input 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className='border border-slate-500 rounded px-8 py-2'
            type="text" 
            placeholder="Member Details" 
        />
        <button type="submit" className='bg-green-600 text-xs font-medium text-white py-2 px-4 w-fit rounded'>Add Member</button>
      </form>

      {addedMember && (
        <div className='mt-4 p-4 border border-slate-500 rounded'>
          <h2 className='text-lg font-bold'>Member Added:</h2>
          <p><strong>Name:</strong> {addedMember.member}</p>
          <p><strong>Description:</strong> {addedMember.description}</p>
          <p><strong>QR ID:</strong> {addedMember.qrID}</p>
          {qrCodeId && (
            <>
              <img src={qrCodeId} alt="QR Code" />
              <a href={qrCodeId} download="qrcode.png">Download QR Code</a>
            </>
          )}
          <button 
            onClick={() => router.push('/')} 
            className='mt-4 bg-blue-600 text-xs font-medium text-white py-2 px-4 w-fit rounded'
          >
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default AddMember;