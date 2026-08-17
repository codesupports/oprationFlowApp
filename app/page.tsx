
// import LoginPage from "./login/page";

// export default function HomePage() {


//   return (
//     // <div className="flex min-h-screen bg-slate-50">
//     //   {/* Sidebar */}

//     //   {/* Main Content */}
//     //   <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
//     //     <Header />
//     //     <main className="flex-1 p-4 sm:p-6 lg:p-8">
//     //       {/* Page Header */}
//     //       <div className="mb-8">
//     //         <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back, Raj!</h1>

//     //         <p className="mt-1 text-sm text-slate-500">Here&apos;s what&apos;s happening with your service requests today.</p>
//     //       </div>

//     //       {/* Statistics */}
//     //       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//     //         {stats.map((stat) => (
//     //           <StatCard
//     //             key={stat.title}
//     //             {...stat}
//     //           />
//     //         ))}
//     //       </div>

//     //       {/* Charts */}
//     //       {/* <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
//     //         <div className="xl:col-span-2"><RequestTrend /></div>
//     //         <div><CategoryChart /></div>
//     //       </div> */}

//     //       {/* Recent Requests */}
//     //       <div className="mt-6"><RecentRequests /></div>
//     //     </main>
//     //   </div>
//     // </div>
//     <LoginPage />
//   );
// }

import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/login");

}