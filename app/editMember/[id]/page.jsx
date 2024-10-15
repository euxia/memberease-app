import EditMemberForm from "@/components/EditMemberForm";


const getMemberById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/${id}`, {
      cache: "no-store"
    });

    if (!res.ok){
      throw new Error("Failed to fetch topic")
    }
    return res.json();
  } catch (error) {
    console.log(error)
  }
};

const editMember = async({params}) => {
  const {id} = params;
  const {topic} = await getMemberById(id);
  const {member, description} = topic;


  return (
    <div>
        <EditMemberForm id = {id} member = {member} description = {description} />
    </div>
  )
}

export default editMember
