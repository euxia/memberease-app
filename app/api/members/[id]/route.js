import connectMongoDB from "@/libs/mongodb";
import Member from "@/models/member";
import { NextResponse } from "next/server";

export async function PUT(request, {params}) {
    const {id} = params;
    const {newMember: member, newDescription: description} = await request.json();
    await connectMongoDB();
    await Member.findByIdAndUpdate(id, {member, description});
    return NextResponse.json({message: "Member Updated"}, {status: 200});
}

export async function GET(request, {params}) {
    const {id} = params;
    await connectMongoDB();
    const topic = await Member.findOne({_id: id});
    return NextResponse.json({topic}, {status: 200})
}