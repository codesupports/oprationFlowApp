"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useUpdateRequestMutation } from "../../store/slices/requestSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'


export default function EditRequest() {
    const requests = useSelector((state) => state.requests);
    const router = useRouter()
    const [updateRequest, { isLoading }] = useUpdateRequestMutation();

    const [formData, setFormData] = useState({
        title: requests.isEditData[0]?.title || "",
        category: requests.isEditData[0]?.category || "",
        priority: requests.isEditData[0]?.priority || "Low",
        assignedTo: requests.isEditData[0]?.assignedTo || "",
        status: requests.isEditData[0]?.status || "Pending",
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const request = requests.isEditData?.[0];
        if (!request) {
            console.error("No request selected");
            return;
        }
        try {
            const updatedRequest = {
                id: request.id,
                ...formData,
            };
            console.log("PUT data:", updatedRequest);
            await updateRequest(updatedRequest).unwrap();
            router.back();
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">Edit Request</h2>
                        <p className="mt-1 text-xs text-slate-500">Update request details</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 p-6">
                    {/* Title */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Enter request title"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Category
                        </label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="">Select category</option>
                            <option value="Hardware">Hardware</option>
                            <option value="Software">Software</option>
                            <option value="Access">Access</option>
                            <option value="Security">Security</option>
                        </select>
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Priority
                        </label>

                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    {/* Assigned To */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Assigned To
                        </label>

                        <input
                            type="text"
                            name="assignedTo"
                            value={formData.assignedTo}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Enter assignee"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Status
                        </label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}