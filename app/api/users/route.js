import { NextResponse } from "next/server";
import { storedRequests, addRequest } from "../store";

// Get all users
export async function GET() {
    return NextResponse.json({
        success: true,
        message: "Users API working",
        requests: storedRequests,
    });
}

// Post a new user
export async function POST(request) {
    try {
        const body = await request.json();
        const newRequest = {
            id: `REQ-${Date.now()}`,
            title: body.title,
            description: body.description,
            category: body.category,
            priority: body.priority,
            status: "Pending",
            assignedTo: body.assignedTo || "Unassigned",
            requestedBy: body.requestedBy || "Raj Kumar",
            date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
        };

        // Store in shared store
        addRequest(newRequest);

        return NextResponse.json({
            success: true,
            message: "Request created successfully",
            data: newRequest,
        }, { status: 201 });
    }
    catch (error) {
        console.error("POST error:", error);
        return NextResponse.json({
            success: false,
            message: "Error creating request",
            error: error.message,
        }, { status: 500 });
    }
}