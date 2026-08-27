import { useGetRecentRequestQuery } from "../../store/slices/requestSlice";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";
import { filterRequestsByMonth } from '../../utils/helpers'
// const data = [
//   { month: "Jan", requests: 180 },
//   { month: "Feb", requests: 240 },
//   { month: "Mar", requests: 210 },
//   { month: "Apr", requests: 320 },
//   { month: "May", requests: 280 },
//   { month: "Jun", requests: 190 },
//   { month: "Jul", requests: 350 },
// ];

export default function RequestTrend() {
  const { data: apiData, error, isLoading } = useGetRecentRequestQuery();
  const requests = apiData?.requests || [];
  const mapdata = filterRequestsByMonth(requests);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-slate-900">Request Trend</h2>
        <p className="mt-1 text-xs text-slate-500">Monthly request volume</p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mapdata}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="requests"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

