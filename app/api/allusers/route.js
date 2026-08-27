import { NextResponse } from "next/server";
import { addUser, appUsers } from "../store";

export async function GET() {
    return NextResponse.json({
        success: true,
        users: appUsers,
    });
}

export async function POST(request) {
    try {
        const body = await request.json();
        const newUser = {
            id: `USR-${Date.now()}`,
            name: body.name,
            email: body.email,
            role: body.role,
            department: body.department,
            status: body.status,
        };
        console.log('newUser', newUser)
        addUser(newUser);

        return NextResponse.json({
            success: true,
            message: "User created successfully",
            data: newUser,
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error creating user",
            error: error.message,
        }, { status: 500 });
    }
}
