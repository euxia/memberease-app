import connectMongoDB from "@/libs/mongodb";
import Member from "@/models/member";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { member, description } = await request.json();
        await connectMongoDB();
        await Member.create({ member, description });
        return NextResponse.json({ message: "Member Created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating member:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    await connectMongoDB();
    const members = await Member.find();
    return NextResponse.json({members})
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Member.findByIdAndDelete(id);
    return NextResponse.json({message: "Member Removed"}, {status: 200})
}