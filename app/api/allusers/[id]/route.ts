import { NextResponse } from "next/server";
import { deleteUserById } from "../../store";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User ID is required",
                },
                { status: 400 }
            );
        }

        const deleted = deleteUserById(id);

        if (!deleted) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "User deleted successfully",
            data: { id },
        });
    } catch (error) {
        console.error("DELETE USER ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete user",
            },
            { status: 500 }
        );
    }
}
