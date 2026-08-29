"use client";
import { useGetRecentRequestQuery } from "../../store/slices/requestSlice";
import { getPercentOfNumber } from "../../utils/helpers"



export default function StatusChart() {

  const { data } = useGetRecentRequestQuery(undefined);
  const requests = Array.isArray(data?.requests) ? data.requests : [];

  const totalRequests = requests.length;

  const pendingRequests = requests.filter((request) => {
    const status = String(request?.status ?? "").toLowerCase();
    return status === "pending" || status === "new" || status === "submitted";
  }).length;

  const inProgressRequests = requests.filter((request) => {
    const status = String(request?.status ?? "").toLowerCase().replace(/\s+/g, "-");
    return status === "in-progress" || status === "in_progress";
  }).length;

  const completedRequests = requests.filter((request) => {
    const status = String(request?.status ?? "").toLowerCase();
    return status === "completed" || status === "resolved" || status === "done";
  }).length;

  // const totalRequests = statusData.reduce(
  //   (total, item) => total + item.value,
  //   0
  // );

  const statusData = [
    {
      label: "Pending",
      value: pendingRequests,
      percentage: getPercentOfNumber(pendingRequests, totalRequests),
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
    },
    {
      label: "In Progress",
      value: inProgressRequests,
      percentage: getPercentOfNumber(inProgressRequests, totalRequests),
      color: "bg-blue-500",
      textColor: "text-blue-600",
    },
    // {
    //   label: "Pending Approval",
    //   value: 89,
    //   percentage: 7,
    //   color: "bg-purple-500",
    //   textColor: "text-purple-600",
    // },
    {
      label: "Completed",
      value: completedRequests,
      percentage: getPercentOfNumber(completedRequests, totalRequests),
      color: "bg-green-500",
      textColor: "text-green-600",
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h2 className="text-md font-semibold text-slate-900">
            Requests by Status
          </h2>
        </div>

        {/* <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
          <option>This Year</option>
        </select> */}
      </div>

      {/* Total */}
      <div className="mb-2 rounded-lg bg-slate-50 p-4">
        <p className="text-sm text-slate-500">
          Total Requests
        </p>

        <h3 className="mt-1 text-3xl font-bold text-slate-900">
          {totalRequests.toLocaleString()}
        </h3>
      </div>

      {/* Status List */}
      <div className="space-y-5">
        {statusData.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                />

                <span className="text-sm font-medium text-slate-700">
                  {item.label}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-900">
                  {item.value}
                </span>

                <span
                  className={`text-xs font-medium ${item.textColor}`}
                >
                  {item.percentage}%
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{
                  width: `${item.percentage}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}