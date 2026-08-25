"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCreateUserMutation, } from "../store/slices/requestSlice";

export default function AddUser() {
    const router = useRouter();

    const [createUser, { isLoading }] =
        useCreateUserMutation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "User",
        department: "",
        status: "Active",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Sending:", formData);

            const response = await createUser(formData).unwrap();

            console.log("Created:", response);

            router.back();
        } catch (error) {
            console.error("Create user failed:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Add User
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Create a new user account
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-lg p-2 hover:bg-slate-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >
                    {/* Name */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium">
                            Name
                        </label>

                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            required
                            className="w-full rounded-lg border px-3 py-2.5"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                            className="w-full rounded-lg border px-3 py-2.5"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium">
                            Role
                        </label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full rounded-lg border bg-white px-3 py-2.5"
                        >
                            <option value="User">
                                User
                            </option>

                            <option value="Manager">
                                Manager
                            </option>

                            <option value="Admin">
                                Admin
                            </option>
                        </select>
                    </div>

                    {/* Department */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium">
                            Department
                        </label>

                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full rounded-lg border bg-white px-3 py-2.5"
                        >
                            <option value="">
                                Select department
                            </option>

                            <option value="IT">IT</option>
                            <option value="HR">HR</option>
                            <option value="Finance">
                                Finance
                            </option>
                            <option value="Operations">
                                Operations
                            </option>
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium">
                            Status
                        </label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full rounded-lg border bg-white px-3 py-2.5"
                        >
                            <option value="Active">
                                Active
                            </option>

                            <option value="Inactive">
                                Inactive
                            </option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 border-t pt-5">

                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="rounded-lg border px-4 py-2.5"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white disabled:opacity-50"
                        >
                            {isLoading
                                ? "Creating..."
                                : "Create User"}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}