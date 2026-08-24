import { NextResponse } from "next/server";
import { deleteRequestById, updateRequest } from "../../store";

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const updatedData = await request.json();

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

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        // console.log("DELETE route - ID:", id);

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Request ID is required",
                },
                { status: 400 }
            );
        }

        const deleted = deleteRequestById(id);

        console.log("Delete result:", {
            deleted,
            id,
        });

        if (!deleted) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Request not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Request deleted successfully",
                data: {
                    id,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("DELETE error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Error deleting request",
                error: error.message,
            },
            { status: 500 }
        );
    }
}