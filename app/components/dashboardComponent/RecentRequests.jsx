import { ArrowUpRight, Eye } from "lucide-react";
import { useGetRecentRequestQuery, isEditRequest, useUpdateRequestMutation, showSelectedRequestData } from "../../store/slices/requestSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getLoggedInUserInformation } from '../../utils/helpers'
import { useDispatch } from "react-redux";
import { RequestAction } from "../../constants/enums"

const statusStyles = {
  "In Progress": "bg-blue-50 text-blue-700",
  Pending: "bg-amber-50 text-amber-700",
  Completed: "bg-emerald-50 text-emerald-700",
};

const priorityStyles = {
  High: "text-red-600 bg-red-600/5",
  high: "text-red-600 bg-red-600/5",
  Medium: "text-amber-600 bg-amber-600/5",
  medium: "text-amber-600 bg-amber-600/5",
  Low: "text-green-500 bg-green-600/5",
  low: "text-green-500 bg-green-600/5",
  Critical: "text-red-700 font-bold bg-red-600/5",
  critical: "text-red-700 font-bold bg-red-600/5",
};

export default function RecentRequests() {

  const { data, error, isLoading } = useGetRecentRequestQuery();
  const [updateRequest] = useUpdateRequestMutation();

  const router = useRouter();
  const dispatch = useDispatch();

  // Request ID -> approved/rejected
  const [requestActions, setRequestActions] = useState({});

  const handleApprove = async (id) => {
    try {
      const request = data?.requests?.find(
        (request) => request.id == id
      );

      if (!request) return;

      // UI update
      setRequestActions((prev) => ({
        ...prev,
        [id]: "approved",
      }));

      // Same API record ko update karo
      await updateRequest({ id: request.id, action: "approved" }).unwrap();

      console.log("Request approved successfully");
    } catch (error) {
      console.error("Approve failed:", error);

      // API fail hone par UI rollback
      setRequestActions((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };


  const handleReject = async (id) => {
    try {
      const request = data?.requests?.find(
        (request) => request.id == id
      );
      if (!request) return;
      // UI update
      setRequestActions((prev) => ({
        ...prev,
        [id]: "rejected",
      }));
      // Same API record ko update karo
      await updateRequest({ id: request.id, action: "rejected" }).unwrap();
      console.log("Request rejected successfully");
    } catch (error) {
      console.error("Approve failed:", error);
      // API fail hone par UI rollback
      setRequestActions((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };
  // console.log("data aaya", data.requests)
  const showSelecedRequest = (id) => {
    const selectedRequest = data?.requests?.find((item) => item.id === id);

    if (selectedRequest) {
      dispatch(showSelectedRequestData(selectedRequest));
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-slate-500">
          Loading requests...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-red-500">
          Failed to load requests.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Recent Requests
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Showing <b>{data?.requests.length}</b> requests
          </p>
        </div>

        <button
          onClick={() => router.push("/requests")}
          className="flex cursor-pointer items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
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

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data?.requests?.map((request) => {
              const action = (requestActions[request.id] ?? request.action ?? request.status)?.toString().toLowerCase();
              const hasDecision = action === "approved" || action === "rejected";

              return (
                <tr
                  key={request.id}
                  className={`transition hover:bg-slate-50 ${action === "approved" ? "bg-green-100" : action === "rejected" ? "bg-red-100"
                    : ""}`}
                >
                  {/* Request */}
                  <td className="px-5 py-3">
                    <p className="text-sm font-semibold text-slate-800">
                      {request.id}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {request.title}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-3 text-sm capitalize text-slate-600">
                    {request.category}
                  </td>

                  {/* Priority */}
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyles[request.priority] ||
                        "bg-slate-50 text-slate-600"
                        }`}
                    >
                      {request.priority}
                    </span>
                  </td>

                  {/* Assigned To */}
                  <td className="px-5 py-3 text-sm text-slate-600">
                    {request.assignedTo}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3">
                    {action === "approved" ? (
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        Approved
                      </span>
                    ) : action === "rejected" ? (
                      <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                        Rejected
                      </span>
                    ) : (
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[request.status] ||
                          "bg-slate-50 text-slate-600"
                          }`}
                      >
                        {request.status}
                      </span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="whitespace-nowrap px-5 py-3 text-sm text-slate-500">
                    {request.date}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="p-1 mr-3 border border-gray-300 rounded-sm bg-gray-100 text-gray-400 cursor-pointer"
                        onClick={() => showSelecedRequest(request.id)}
                      >
                        <Eye size={16} title="Show Data" />
                      </span>
                      <button
                        onClick={() => handleApprove(request.id)}
                        disabled={hasDecision || getLoggedInUserInformation().role !== "Admin"}
                        className={`rounded-lg px-3 py-2 text-xs font-medium text-white transition ${action === "approved"
                          ? "cursor-not-allowed bg-emerald-800"
                          : hasDecision || getLoggedInUserInformation().role !== "Admin" || request.status == "Completed"
                            ? "cursor-not-allowed bg-slate-300"
                            : "cursor-pointer bg-emerald-600 hover:bg-emerald-700"
                          }`}
                      >
                        {action === "approved" ? "Approved" : "Approve"}
                      </button>

                      <button
                        onClick={() => handleReject(request.id)}
                        disabled={hasDecision || getLoggedInUserInformation().role !== "Admin"}
                        className={`rounded-lg px-3 py-2 text-xs font-medium text-white transition ${action === "rejected"
                          ? "cursor-not-allowed bg-red-600"
                          : hasDecision || getLoggedInUserInformation().role !== "Admin" || request.status == "Completed"
                            ? "cursor-not-allowed bg-slate-300"
                            : "cursor-pointer bg-red-600 hover:bg-red-700"
                          }`}
                      >
                        {action === "rejected" ? "Rejected" : "Reject"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-slate-100 md:hidden">
        {data?.requests?.map((request) => {
          const action = requestActions[request.id];

          return (
            <div
              key={request.id}
              className={`p-5 ${action === "approved"
                ? "bg-green-50/50"
                : action === "rejected"
                  ? "bg-red-50/50"
                  : ""
                }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {request.id}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {request.title}
                  </p>
                </div>

                {action === "approved" ? (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Approved
                  </span>
                ) : action === "rejected" ? (
                  <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                    Rejected
                  </span>
                ) : (
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[request.status] ||
                      "bg-slate-50 text-slate-600"
                      }`}
                  >
                    {request.status}
                  </span>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-slate-400">Category</p>
                  <p className="mt-1 font-medium capitalize text-slate-700">
                    {request.category}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Priority</p>
                  <p
                    className={`mt-1 inline-block rounded-full px-2 py-1 font-semibold ${priorityStyles[request.priority] || ""
                      }`}
                  >
                    {request.priority}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Assigned To</p>
                  <p className="mt-1 font-medium text-slate-700">
                    {request.assignedTo}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Date</p>
                  <p className="mt-1 font-medium text-slate-700">
                    {request.date}
                  </p>
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleApprove(request.id)}
                  disabled={!!action}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white ${action === "approved"
                    ? "cursor-not-allowed bg-emerald-600"
                    : action
                      ? "cursor-not-allowed bg-slate-300"
                      : "cursor-pointer bg-emerald-600 hover:bg-emerald-700"
                    }`}
                >
                  {action === "approved" ? "Approved" : "Approve"}
                </button>

                <button
                  onClick={() => handleReject(request.id)}
                  disabled={!!action}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white ${action === "rejected"
                    ? "cursor-not-allowed bg-red-600"
                    : action
                      ? "cursor-not-allowed bg-slate-300"
                      : "cursor-pointer bg-red-600 hover:bg-red-700"
                    }`}
                >
                  {action === "rejected" ? "Rejected" : "Reject"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {
        !data?.requests?.length && (
          <div className="py-10 text-center">
            <p className="text-sm text-slate-500">
              No recent requests found.
            </p>
          </div>
        )
      }
    </div >
  );
}
