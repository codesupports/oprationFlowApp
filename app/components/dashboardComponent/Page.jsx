
// "use client";

// import Header from "../components/dashboard/Header";
// import StatCard from "../components/dashboard/StatCard";
// import RequestTrend from "../components/dashboard/RequestTrend";
// import CategoryChart from "../components/dashboard/CategoryChart";
// import RecentRequests from "../components/dashboard/RecentRequests";
// import { useGetUsersQuery } from "../store/slices/requestSlice";

// import { ClipboardList, Clock3, LoaderCircle, CheckCircle2, } from "lucide-react";

// export default function DashboardPage() {
//     const { data } = useGetUsersQuery(undefined);
//     const requests = Array.isArray(data?.requests) ? data.requests : [];

//     const totalRequests = requests.length;

//     const pendingRequests = requests.filter((request: any) => {
//         const status = String(request?.status ?? "").toLowerCase();
//         return status === "pending" || status === "new" || status === "submitted";
//     }).length;

//     const inProgressRequests = requests.filter((request: any) => {
//         const status = String(request?.status ?? "").toLowerCase().replace(/\s+/g, "-");
//         return status === "in-progress" || status === "in_progress";
//     }).length;

//     const completedRequests = requests.filter((request: any) => {
//         const status = String(request?.status ?? "").toLowerCase();
//         return status === "completed" || status === "resolved" || status === "done";
//     }).length;

//     const stats = [
//         {
//             title: "Total Requests",
//             value: totalRequests.toLocaleString(),
//             change: "+12.5%",
//             icon: ClipboardList,
//             description: "vs last month",
//         },
//         {
//             title: "Pending",
//             value: pendingRequests.toLocaleString(),
//             change: "+8.2%",
//             icon: Clock3,
//             description: "vs last month",
//         },
//         {
//             title: "In Progress",
//             value: inProgressRequests.toLocaleString(),
//             change: "+5.4%",
//             icon: LoaderCircle,
//             description: "vs last month",
//         },
//         {
//             title: "Completed",
//             value: completedRequests.toLocaleString(),
//             change: "+18.7%",
//             icon: CheckCircle2,
//             description: "vs last month",
//         },
//     ];


//     return (
//         <div className="flex min-h-screen bg-slate-50">
//             {/* Sidebar */}

//             {/* Main Content */}
//             <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
//                 <Header />
//                 <main className="flex-1 p-4 sm:p-6 lg:p-8">
//                     {/* Page Header */}
//                     <div className="mb-8">
//                         <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back, Raj!</h1>

//                         <p className="mt-1 text-sm text-slate-500">Here&apos;s what&apos;s happening with your service requests today.</p>
//                     </div>

//                     {/* Statistics */}
//                     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//                         {stats.map((stat) => (
//                             <StatCard
//                                 key={stat.title}
//                                 {...stat}
//                             />
//                         ))}
//                     </div>

//                     {/* Charts */}
//                     <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
//                         <div className="xl:col-span-2"><RequestTrend /></div>
//                         <div><CategoryChart /></div>
//                     </div>

//                     {/* Recent Requests */}
//                     <div className="mt-6"><RecentRequests /></div>
//                 </main>
//             </div>
//         </div>
//     );
// }