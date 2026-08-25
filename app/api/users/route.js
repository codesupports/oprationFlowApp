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

// Post a new Request
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


    try {
        const body = await request.json();
        const newUserRequest = {
            id: `USR-${Date.now()}`,
            name: body.name,
            email: body.email,
            role: body.role,
            department: body.department,
            status: body.status
        };

        // Store in shared store
        addRequest(newUserRequest);

        return NextResponse.json({
            success: true,
            message: "New User Request created successfully",
            data: newUserRequest,
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

// PUT
export async function PUT(request) {
    try {
        const body = await request.json();

        const { id, ...updatedData } = body;

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Request ID is required",
                },
                { status: 400 }
            );
        }

        const updatedRequest = updateRequest(id, updatedData);

        if (!updatedRequest) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Request not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Request updated successfully",
            data: updatedRequest,
        });
    } catch (error) {
        console.error("PUT error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Error updating request",
                error: error.message,
            },
            { status: 500 }
        );
    }
}

// // POST New User
// export async function POST(request) {
    
// }