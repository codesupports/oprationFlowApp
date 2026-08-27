
"use client";

import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    CalendarDays,
    Clock3,
    User,
    Tag,
    FileText,
    Pencil,
    Trash2,
    CheckCircle2,
    Circle,
    MessageSquare,
} from "lucide-react";

import RequestStatus from "../../components/requests/RequestStatus";
import { deleteRequest, useGetRecentRequestQuery, updateRequest } from "../../store/slices/requestSlice";

export default function RequestDetailsPage() {
    const { data, error, isLoading } = useGetRecentRequestQuery();
    const router = useRouter();
    const params = useParams();
    const requestId = params?.id;

    const activities = [
        {
            id: 1,
            title: "Request created",
            description: "Request was submitted successfully.",
            user: "Raj Kumar",
            date: "Aug 11, 2026",
            time: "09:30 AM",
            completed: true,
        },
        {
            id: 2,
            title: "Request assigned",
            description: "Request was assigned to Amit Sharma.",
            user: "Admin",
            date: "Aug 11, 2026",
            time: "10:15 AM",
            completed: true,
        },
        {
            id: 3,
            title: "Request is in progress",
            description: "IT team started working on the request.",
            user: "Amit Sharma",
            date: "Aug 11, 2026",
            time: "11:00 AM",
            completed: true,
        },
        {
            id: 4,
            title: "Request completed",
            description: "Waiting for the request to be completed.",
            user: "IT Team",
            date: "-",
            time: "-",
            completed: false,
        },
    ];
    const request = data?.requests.find((req) => req.id === requestId);

    const handleDelete = () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this request?"
        );
        if (!confirmed) return;
        // Later this will dispatch Redux action/API call.
        console.log("Delete request:", request.id);
        router.push("/requests");
    };

    const handleEdit = () => {
        console.log('hi request details page [id] ke ander wala')
        // router.push(
        //     `/requests/new/${request.id}?edit=true`
        // );
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="border-b border-slate-200 bg-white">
                <div className="flex min-w-0 flex-1 flex-col lg:ml-64 ">
                    <div className="mx-auto w-full px-4 py-5 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            onClick={() => router.push("/requests")}
                            className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
                        >
                            <ArrowLeft size={17} />
                            Back to Requests
                        </button>
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">{request?.title}</h1>
                                    <RequestStatus
                                        status={request?.status}
                                    />
                                </div>
                                <p className="mt-2 text-sm text-slate-500">
                                    Request ID:{" "}
                                    <span className="font-semibold text-slate-700">{request?.id}</span>
                                </p>
                            </div>
                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleEdit}
                                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    <Pencil size={17} />
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                >
                                    <Trash2 size={17} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
          Main Content
      ===================================================== */}
            <div className="flex min-w-0 flex-1 flex-col lg:ml-64 ">
                <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            {/* Request Information */}
                            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                                <div className="border-b border-slate-100 px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <FileText
                                            size={18}
                                            className="text-blue-600"
                                        />
                                        <h2 className="text-base font-semibold text-slate-900">Request Information</h2>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        {/* Category */}
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Category</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <Tag
                                                    size={16}
                                                    className="text-slate-400"
                                                />
                                                <p className="text-sm font-semibold text-slate-700">{request?.category}</p>
                                            </div>
                                        </div>
                                        {/* Priority */}
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Priority</p>
                                            <p className="mt-2 text-sm font-semibold text-red-600">{request?.priority}</p>
                                        </div>
                                        {/* Requested By */}
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Requested By</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <User
                                                    size={16}
                                                    className="text-slate-400"
                                                />
                                                <p className="text-sm font-semibold text-slate-700">{request?.requestedBy}</p>
                                            </div>
                                        </div>
                                        {/* Assigned To */}
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Assigned To</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <User
                                                    size={16}
                                                    className="text-slate-400"
                                                />
                                                <p className="text-sm font-semibold text-slate-700">{request?.assignedTo}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Description */}
                                    <div className="mt-8">
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Description</p>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">{request?.description}</p>
                                    </div>
                                </div>
                            </section>
                            {/* Activity Timeline */}
                            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                                <div className="border-b border-slate-100 px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Clock3
                                            size={18}
                                            className="text-blue-600"
                                        />
                                        <h2 className="text-base font-semibold text-slate-900">
                                            Activity
                                        </h2>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-6">
                                        {activities.map(
                                            (activity, index) => (
                                                <div
                                                    key={activity.id}
                                                    className="relative flex gap-4"
                                                >
                                                    {/* Timeline Line */}
                                                    {index !==
                                                        activities.length - 1 && (
                                                            <div className="absolute left-[9px] top-6 h-full w-px bg-slate-200" />
                                                        )}
                                                    {/* Timeline Icon */}
                                                    <div className="relative z-10 flex-shrink-0">
                                                        {activity.completed ? (
                                                            <CheckCircle2
                                                                size={20}
                                                                className="text-emerald-500"
                                                            />
                                                        ) : (
                                                            <Circle
                                                                size={20}
                                                                className="text-slate-300"
                                                            />
                                                        )}
                                                    </div>
                                                    {/* Activity Content */}
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                                            <h3 className="text-sm font-semibold text-slate-800">
                                                                {activity.title}
                                                            </h3>
                                                            <span className="text-xs text-slate-400">
                                                                {activity.date}{" "}
                                                                {activity.time}
                                                            </span>
                                                        </div>
                                                        <p className="mt-1 text-sm text-slate-500">
                                                            {activity.description}
                                                        </p>
                                                        <p className="mt-2 text-xs font-medium text-slate-400">
                                                            By {activity.user}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </section>
                            {/* Comment Section */}
                            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                                <div className="border-b border-slate-100 px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare
                                            size={18}
                                            className="text-blue-600"
                                        />
                                        <h2 className="text-base font-semibold text-slate-900">
                                            Add Comment
                                        </h2>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <textarea
                                        rows={4}
                                        placeholder="Write a comment..."
                                        className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    />
                                    <div className="mt-3 flex justify-end">
                                        <button
                                            type="button"
                                            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                                        >
                                            Add Comment
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                        {/* =================================================
              Right Sidebar
          ================================================= */}
                        <aside className="space-y-6">
                            {/* Status Card */}
                            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                                <div className="border-b border-slate-100 px-5 py-4">
                                    <h2 className="text-sm font-semibold text-slate-900">
                                        Request Status
                                    </h2>
                                </div>
                                <div className="space-y-5 p-5">
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                            Current Status
                                        </p>
                                        <div className="mt-2">
                                            <RequestStatus
                                                status={request?.status}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                            Priority
                                        </p>
                                        <p className="mt-2 text-sm font-semibold text-red-600">
                                            {request?.priority}
                                        </p>
                                    </div>
                                </div>
                            </section>
                            {/* Dates */}
                            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                                <div className="border-b border-slate-100 px-5 py-4">
                                    <h2 className="text-sm font-semibold text-slate-900">
                                        Dates
                                    </h2>
                                </div>
                                <div className="space-y-5 p-5">
                                    <div className="flex items-start gap-3">
                                        <CalendarDays
                                            size={18}
                                            className="mt-0.5 text-slate-400"
                                        />
                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Created
                                            </p>
                                            <p className="mt-1 text-sm font-medium text-slate-700">
                                                {request?.createdDate}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock3
                                            size={18}
                                            className="mt-0.5 text-slate-400"
                                        />
                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Last Updated
                                            </p>
                                            <p className="mt-1 text-sm font-medium text-slate-700">
                                                {request?.updatedDate}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CalendarDays
                                            size={18}
                                            className="mt-0.5 text-slate-400"
                                        />
                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Due Date
                                            </p>
                                            <p className="mt-1 text-sm font-medium text-slate-700">
                                                {request?.dueDate}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* Assignment */}
                            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                                <div className="border-b border-slate-100 px-5 py-4">
                                    <h2 className="text-sm font-semibold text-slate-900">
                                        Assignment
                                    </h2>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                                            AS
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">
                                                {request?.assignedTo}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                Assigned User
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </aside>
                    </div>
                </div>
            </div>
        </main>
    );
}

