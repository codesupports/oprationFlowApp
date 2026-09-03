
"use client";

import {
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
} from "lucide-react";

import RequestStatus from "./RequestStatus";
import { useVirtualizer } from "@tanstack/react-virtual";


const priorityStyles = {
  "low": "text-green-500",
  "Low": "text-green-500",
  "medium": "text-amber-600",
  "Medium": "text-amber-600",
  "high": "text-orange-600",
  "High": "text-orange-600",
  "critical": "text-red-600 font-bold",
  "Critical": "text-red-600 font-bold",
};

export default function RequestTable({ requests, onView, onEdit, onDelete, }) {

  /* =========================
     Empty State
  ========================= */

  if (!requests || requests.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <MoreHorizontal size={22} className="text-slate-400" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-slate-800">No requests found</h3>
        <p className="mt-1 text-sm text-slate-500">Try changing your search or filters.</p>
      </div>
    );
  }
  return (
    <>
      {/* =================================================
          Desktop Table
      ================================================= */}

      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            {/* Table Header */}
            <thead className="bg-white ">
              <tr className="border-b-2 border-gray-400">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Request</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Category</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Priority</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Assigned To</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Date</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100">
              {requests.map((request) => (
                <tr key={request.id} className="transition hover:bg-slate-50">
                  {/* Request */}
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => onView(request.id)}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                    >{request.id}</button>
                    <p className="mt-1 max-w-[220px] truncate text-xs text-slate-500">{request.title}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{request.category}</td>
                  <td className="px-5 py-4">
                    <span className={`text-sm font-semibold capitalize ${priorityStyles[request.priority] || "text-slate-500"}`}>{request.priority}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{request.assignedTo}</td>
                  <td className="px-5 py-4"><RequestStatus status={request.status} /></td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">{request.date}</td>
                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      {/* View */}
                      <button
                        type="button"
                        title="View Request"
                        onClick={() => onView(request.id)}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye size={17} />
                      </button>
                      {/* Edit */}
                      <button
                        disabled={request.status === "Completed" || request.status === "In Progress"}
                        type="button"
                        title="Edit Request"
                        onClick={() => onEdit(request.id)}
                        className={`rounded-lg p-2 text-slate-600 transition hover:bg-amber-50 hover:text-amber-600 ${request.status === "Completed" || request.status === "In Progress" ? "cursor-not-allowed opacity-40" : ""}`}
                      >
                        <Pencil size={17} />
                      </button>
                      {/* Delete */}
                      <button
                        disabled={request.status === "Completed"}
                        type="button"
                        title="Delete Request"
                        onClick={() => onDelete(request.id)}
                        className={`rounded-lg p-2 text-slate-600 transition hover:bg-amber-50 hover:text-amber-600 ${request.status === "Completed" ? "cursor-not-allowed opacity-40" : ""}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* =================================================
          Mobile Cards
      ================================================= */}
      <div className="space-y-3 md:hidden">
        {requests.map((request) => (
          <div key={request.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            {/* Top */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <button
                  type="button"
                  onClick={() => onView(request.id)}
                  className="text-sm font-semibold text-blue-600"
                >
                  {request.id}
                </button>
                <h3 className="mt-1 truncate text-sm font-semibold text-slate-800">{request.title}</h3>
              </div>
              <RequestStatus
                status={request.status}
              />
            </div>

            {/* Details */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400">Category</p>
                <p className="mt-1 text-sm font-medium text-slate-700">{request.category}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Priority</p>
                <p className={`mt-1 text-sm font-semibold ${priorityStyles[request.priority] || "text-slate-500"}`}>
                  {request.priority}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Assigned To</p>
                <p className="mt-1 text-sm font-medium text-slate-700">{request.assignedTo}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Date</p>
                <p className="mt-1 text-sm font-medium text-slate-700">{request.date}</p>
              </div>
            </div>
            {/* Actions */}
            <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => onView(request.id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                <Eye size={15} />
                View
              </button>

              <button
                type="button"
                onClick={() => onEdit(request.id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                <Pencil size={15} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(request.id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

