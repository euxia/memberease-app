"use client"
import EditMemberForm from "@/components/EditMemberForm";

const getMemberById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/${id}`, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to fetch member");
    }
    const data = await res.json();
    return data.member; // Ensure we return the member object
  } catch (error) {
    console.log(error);
    return null;
  }
};

const EditMemberPage = async ({ params }) => {
  const { id } = params;
  const memberData = await getMemberById(id);

  if (!memberData) {
    return <div>Error fetching member data</div>;
  }

  const { member, description } = memberData;

  return (
    <div>
      <EditMemberForm id={id} member={member} description={description} />
    </div>
  );
};

export default EditMemberPage;
// import EditMemberForm from "@/components/EditMemberForm";

// const getMemberById = async (id) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/${id}`, {
//       cache: "no-store"
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch member");
//     }
//     const data = await res.json();
//     return data.member; // Ensure we return the member object
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

// const EditMemberPage = async ({ params }) => {
//   const { id } = params;
//   const memberData = await getMemberById(id);

//   if (!memberData) {
//     return <div>Error fetching member data</div>;
//   }

//   const { member, description } = memberData;

//   return (
//     <div>
//       <EditMemberForm id={id} member={member} description={description} />
//     </div>
//   );
// };

// export default EditMemberPage;