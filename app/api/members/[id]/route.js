import connectMongoDB from "@/libs/mongodb";
import Member from "@/models/member";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { newMember: member, newDescription: description } = await request.json();
        await connectMongoDB();
        const updatedMember = await Member.findByIdAndUpdate(id, { member, description }, { new: true });
        
        if (!updatedMember) {
            return NextResponse.json({ message: "Member Not Found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Member Updated", member: updatedMember }, { status: 200 });
    } catch (error) {
        console.error("Error updating member:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = params;
        await connectMongoDB();
        const member = await Member.findById(id);
        
        if (!member) {
            return NextResponse.json({ message: "Member Not Found" }, { status: 404 });
        }

        return NextResponse.json({ member }, { status: 200 });
    } catch (error) {
        console.error("Error fetching member:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}