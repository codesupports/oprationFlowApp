
"use client";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, } from "recharts";
import { useGetUsersQuery } from "../../store/slices/requestSlice";

// const data1 = [
//   {
//     name: "Hardware",
//     value: 35,
//   },
//   {
//     name: "Software",
//     value: 25,
//   },
//   {
//     name: "Access",
//     value: 20,
//   },
//   {
//     name: "HR",
//     value: 12,
//   },
//   {
//     name: "Other",
//     value: 8,
//   },
// ];

const COLORS = [
  "#2563eb",
  "#7c3aed",
  "#0891b2",
  "#059669",
  "#f59e0b",
  "#a42020",
  "#daa794"
];

const categorieswiseRequests = (requests) => {
  const categoryCounts = requests.reduce((acc, req) => {
    acc[req.category] = (acc[req.category] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));
};

export default function CategoryChart() {
  // const requests = useSelector((state) => state.requests?.requests ?? []);
  // const data = categorieswiseRequests(requests);

  const { data: apiData, error, isLoading } = useGetUsersQuery();
  const requests = apiData?.requests || [];
  const chartData = categorieswiseRequests(requests);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">Requests by Category</h2>
        <p className="mt-1 text-xs text-slate-500">Current request distribution</p>
      </div>

      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        {chartData.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[index], }} />
            <span className="text-slate-600">{item.name}</span>
            <span className="ml-auto font-semibold text-slate-800">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}