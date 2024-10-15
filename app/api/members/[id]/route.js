import connectMongoDB from "@/libs/mongodb";
import Member from "@/models/member";
import { NextResponse } from "next/server";

const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://memberease-app-deniel-dave-c-natividads-projects.vercel.app' // Production
];

function setCorsHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', allowedOrigins.join(','));
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export async function POST(request) {
  try {
    const { member, description } = await request.json();
    await connectMongoDB();
    await Member.create({ member, description });
    let response = NextResponse.json({ message: "Member Created" }, { status: 201 });
    return setCorsHeaders(response);
  } catch (error) {
    console.error("Error creating member:", error);
    let response = NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    return setCorsHeaders(response);
  }
}

export async function GET() {
  await connectMongoDB();
  const members = await Member.find();
  let response = NextResponse.json({ members });
  return setCorsHeaders(response);
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await Member.findByIdAndDelete(id);
  let response = NextResponse.json({ message: "Member Removed" }, { status: 200 });
  return setCorsHeaders(response);
}

export async function OPTIONS() {
  let response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response);
}

// import connectMongoDB from "@/libs/mongodb";
// import Member from "@/models/member";
// import { NextResponse } from "next/server";

// export async function PUT(request, {params}) {
//     const {id} = params;
//     const {newMember: member, newDescription: description} = await request.json();
//     await connectMongoDB();
//     await Member.findByIdAndUpdate(id, {member, description});
//     return NextResponse.json({message: "Member Updated"}, {status: 200});
// }

// export async function GET(request, {params}) {
//     const {id} = params;
//     await connectMongoDB();
//     const topic = await Member.findOne({_id: id});
//     return NextResponse.json({topic}, {status: 200})
// }