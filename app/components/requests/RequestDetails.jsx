"use client";

import { X, User, CalendarDays, Tag, AlertCircle, UserCheck, FileText, } from "lucide-react";
export default function RequestDetails({ request, onClose, }) {
    if (!request) {
        return null;
    }

    return (
        <div className="overflow-hidden ml-4 w-md rounded-xl border border-slate-200 bg-white shadow-sm ">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                <div>
                    <p className="text-base font-semibold text-slate-900">
                        Request Details
                    </p>
                    <div className="mt-1 flex items-center gap-3">
                        <h2 className=" text-blue-800 rounded-md px-2.5 py-1 text-xs font-semibold  bg-blue-200">
                            {request.id}
                        </h2>
                        <StatusBadge status={request.status} />
                    </div>
                </div>

                {/* {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={20} />
                    </button>
                )} */}
            </div>

            {/* Content */}
            <div className="px-6 py-2">
                {/* Request Title */}
                <div className="mb-3">
                    <h3 className="text-base font-semibold text-slate-900">
                        Request Title</h3>
                    <div className="mt-1 flex items-center gap-3">
                        <p className=" text-sm text-blue-800 rounded-sm px-2.5 py-1 font-semibold border border-blue-300 bg-blue-100">{request.title}</p>
                    </div>
                </div>

                {/* Request Information */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InfoItem
                        icon={User}
                        label="Requested By"
                        value={request.requestedBy}
                    />
                    <InfoItem
                        icon={UserCheck}
                        label="Assigned To"
                        value={request.assignedTo}
                    />
                    <InfoItem
                        icon={Tag}
                        label="Category"
                        value={request.category}
                    />
                    <InfoItem
                        icon={AlertCircle}
                        label="Priority"
                        value={request.priority}
                    />
                    <InfoItem
                        icon={CalendarDays}
                        label="Created On"
                        value={request.date}
                    />
                    <InfoItem
                        icon={FileText}
                        label="Request ID"
                        value={request.id}
                    />
                </div>

                {/* Description */}
                <div className="mt-3">
                    <h4 className="text-sm font-semibold text-slate-900">
                        Description
                    </h4>

                    <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm leading-6 text-slate-600">
                            {request.description}
                        </p>
                    </div>
                </div>

                {/* Status */}
                <div className="mt-3">
                    <h4 className="text-sm font-semibold text-slate-900">
                        Current Status:  <StatusBadge status={request.status} />
                    </h4>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
                <div>
                    <p className="text-xs text-slate-400">
                        Action
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                        {request.action || "No action available"}
                    </p>
                </div>
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    >
                        Close
                    </button>
                )}
            </div>
        </div>
    );
}


/* ------------------------------
   Info Item
-------------------------------- */

function InfoItem({
    icon: Icon,
    label,
    value,
}) {
    return (
        <div className="rounded-lg border border-slate-200 p-2">
            <div className="flex items-center gap-2 text-xs font-medium text-blue-600">
                <Icon size={15} />
                {label}
            </div>

            <p className="mt-2 text-sm font-semibold text-slate-800">
                {value || "-"}
            </p>
        </div>
    );
}


/* ------------------------------
   Status Badge
-------------------------------- */

function StatusBadge({ status }) {
    const statusStyles = {
        Pending:
            "bg-amber-50 text-amber-700 border-amber-200",

        "In Progress":
            "bg-blue-50 text-blue-700 border-blue-200",

        Completed:
            "bg-emerald-50 text-emerald-700 border-emerald-200",

        Rejected:
            "bg-red-50 text-red-700 border-red-200",

        "Pending Approval":
            "bg-purple-50 text-purple-700 border-purple-200",
    };

    return (
        <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status] ||
                "border-slate-200 bg-slate-50 text-slate-600"
                }`}
        >
            {status}
        </span>
    );
}