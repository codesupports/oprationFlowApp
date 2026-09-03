
"use client";


import StatCard from "../components/dashboardComponent/StatCard";
import RequestTrend from "../components/dashboardComponent/RequestTrend";
import CategoryChart from "../components/dashboardComponent/CategoryChart";
import RecentRequests from "../components/dashboardComponent/RecentRequests";
import { useGetRecentRequestQuery } from "../store/slices/requestSlice";
import { getLoggedInUserInformation } from '../utils/helpers'
import { ClipboardList, Clock3, LoaderCircle, CheckCircle2, UserCheck, ThumbsDown } from "lucide-react";
import StatusChart from "../components/dashboardComponent/StatusChart";
import { useSelector } from "react-redux";
import RequestDetails from "../components/requests/RequestDetails";

export default function DashboardPage() {
    const { data } = useGetRecentRequestQuery(undefined);
    const requests = Array.isArray(data?.requests) ? data.requests : [];
    const selectedData = useSelector((state) => state.requests.showSelectedRequestData)

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
    const approvedRequests = requests.filter((request) => {
        const status = String(request?.action ?? "").toLowerCase();
        return status === "approved";
    }).length;
    const rejectRequests = requests.filter((request) => {
        const status = String(request?.action ?? "").toLowerCase();
        return status === "rejected";
    }).length;

    const stats = [
        {
            title: "Total Requests",
            value: totalRequests.toLocaleString(),
            change: "+12.5%",
            icon: ClipboardList,
            description: "vs last month",
        },
        {
            title: "Pending",
            value: pendingRequests.toLocaleString(),
            change: "+8.2%",
            icon: Clock3,
            description: "vs last month",
        },
        {
            title: "In Progress",
            value: inProgressRequests.toLocaleString(),
            change: "+5.4%",
            icon: LoaderCircle,
            description: "vs last month",
        },
        {
            title: "Approved",
            value: approvedRequests.toLocaleString(),
            change: "+5.4%",
            icon: UserCheck,
            description: "vs last month",
        },
        {
            title: "Reject",
            value: rejectRequests.toLocaleString(),
            change: "+5.4%",
            icon: ThumbsDown,
            description: "vs last month",
        },
        {
            title: "Completed",
            value: completedRequests.toLocaleString(),
            change: "+18.7%",
            icon: CheckCircle2,
            description: "vs last month",
        },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Main Content */}
            <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back, <span className="capitalize">{getLoggedInUserInformation().name}</span> !</h1>
                        <p className="mt-1 text-sm text-slate-500">Here&apos;s what&apos;s happening with your service requests today.</p>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
                        {stats.map((stat) => (
                            <StatCard
                                key={stat.title}
                                {...stat}
                            />
                        ))}
                    </div>

                    {/* Charts */}
                    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-4">
                        <div className="xl:col-span-2"><RequestTrend /></div>
                        <div><CategoryChart /></div>
                        <div><StatusChart /></div>
                    </div>

                    {/* Recent Requests */}
                    <div className="mt-6 flex transition-all duration-1000 ease-in-out">
                        <div className="w-full "><RecentRequests /></div>
                        {selectedData &&
                            // <div className="overflow-hidden ml-4 w-md rounded-xl border border-slate-200 bg-white shadow-sm  px-5 py-4 ">
                            <RequestDetails request={selectedData} />

                            // </div>
                        }
                    </div>
                </main>
            </div>
        </div>
    );
}