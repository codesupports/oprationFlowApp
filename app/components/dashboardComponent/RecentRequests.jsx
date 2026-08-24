
"use client";

import { ArrowUpRight, MoreHorizontal, } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useGetUsersQuery } from "../../store/slices/requestSlice";
import { useRouter } from "next/navigation";


// const requests = [
//   {
//     id: "REQ-1024",
//     title: "Laptop replacement",
//     category: "Hardware",
//     priority: "High",
//     assignedTo: "Amit Sharma",
//     status: "In Progress",
//     date: "Aug 11, 2026",
//   },
//   {
//     id: "REQ-1023",
//     title: "VPN access request",
//     category: "Access",
//     priority: "Medium",
//     assignedTo: "Priya Singh",
//     status: "Pending",
//     date: "Aug 10, 2026",
//   },
//   {
//     id: "REQ-1022",
//     title: "Adobe license request",
//     category: "Software",
//     priority: "Low",
//     assignedTo: "Rahul Verma",
//     status: "Completed",
//     date: "Aug 10, 2026",
//   },
//   {
//     id: "REQ-1021",
//     title: "Office access card",
//     category: "Security",
//     priority: "High",
//     assignedTo: "Amit Sharma",
//     status: "Completed",
//     date: "Aug 09, 2026",
//   },
// ];

const statusStyles = {
  "In Progress": "bg-blue-50 text-blue-700",
  "Pending": "bg-amber-50 text-amber-700",
  "Completed": "bg-emerald-50 text-emerald-700",
};

const priorityStyles = {
  "High": "text-red-600 px-2.5 py-1 bg-red-600/5 rounded-full",
  "high": "text-red-600 px-2.5 py-1 bg-red-600/5 rounded-full",
  "Medium": "text-amber-600 px-2.5 py-1 bg-amber-600/5 rounded-full",
  "medium": "text-amber-600 px-2.5 py-1 bg-amber-600/5 rounded-full",
  "Low": "text-green-500 px-2.5 py-1 bg-green-600/5 rounded-full",
  "low": "text-green-500 px-2.5 py-1 bg-green-600/5 rounded-full",
  "critical": "text-red-600 font-bold  px-2.5 py-1 bg-red-600/5 rounded-full",
  "Critical": "text-red-700 font-bold  px-2.5 py-1 bg-red-600/5 rounded-full",
};

export default function RecentRequests() {
  // const requests = useSelector((state) => state.requests.requests);
  const { data, error, isLoading } = useGetUsersQuery();
  const router = useRouter();

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Recent Requests
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Latest service requests
          </p>
        </div>

        <button onClick={() => router.push("/requests")} className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
          View all
          <ArrowUpRight size={16} />
        </button>

      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left">

          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Request
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Category
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Priority
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Assigned To
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Date
              </th>

              <th />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">

            {data?.requests.map((request) => (
              < tr
                key={request.id}
                className="transition hover:bg-slate-50"
              >
                <td className="px-5 py-1">
                  <p className="text-sm font-semibold text-slate-800">{request.id}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{request.title}</p>
                </td>
                <td className="px-5 py-2 text-sm text-slate-600 capitalize">{request.category}</td>
                <td className={`px-5 py-2 text-sm font-semibold capitalize`}>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyles[request.priority]}`}>
                    {request.priority}
                  </span></td>
                <td className="px-5 py-2 text-sm text-slate-600">{request.assignedTo}</td>
                <td className="px-5 py-2">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[request.status]}`}>
                    {request.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-2 text-sm text-slate-500">{request.date}</td>
                <td className="px-5 py-2">
                  <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                    <MoreHorizontal size={18} />
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-slate-100 md:hidden">

        {data?.requests.map((request) => (
          <div
            key={request.id}
            className="p-5"
          >
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {request.id}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {request.title}
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[request.status]}`}
              >
                {request.status}
              </span>

            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">

              <div>
                <p className="text-slate-400">
                  Category
                </p>

                <p className="mt-1 font-medium text-slate-700">
                  {request.category}
                </p>
              </div>

              <div>
                <p className="text-slate-400">
                  Priority
                </p>

                <p
                  className={`mt-1 font-semibold ${priorityStyles[request.priority]?.toLowerCase()}`}
                >
                  {request.priority}
                </p>
              </div>

              <div>
                <p className="text-slate-400">
                  Assigned To
                </p>

                <p className="mt-1 font-medium text-slate-700">
                  {request.assignedTo}
                </p>
              </div>

              <div>
                <p className="text-slate-400">
                  Date
                </p>

                <p className="mt-1 font-medium text-slate-700">
                  {request.date}
                </p>
              </div>

            </div>
          </div>
        ))}

      </div>

    </div >
  );
}

