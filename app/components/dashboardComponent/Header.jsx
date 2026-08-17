
"use client";
// icon imports
import {
    Search,
    Bell,
    ChevronDown,
    Menu,
} from "lucide-react";

export default function Header() {
    return (
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">

            {/* Mobile Menu */}
            <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden">
                <Menu size={22} />
            </button>

            {/* Search */}
            <div className="relative hidden w-full max-w-md md:block">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                <input
                    type="search"
                    placeholder="Search requests, users..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
            </div>

            {/* Right Side */}
            <div className="ml-auto flex items-center gap-3">

                {/* Notification */}
                <button className="relative rounded-lg p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
                    <Bell size={20} />

                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>

                {/* Profile */}
                <button className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-slate-50">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                        RK
                    </div>

                    <div className="hidden text-left sm:block">
                        <p className="text-sm font-semibold text-slate-800">
                            Raj Kumar
                        </p>

                        <p className="text-xs text-slate-500">
                            Admin
                        </p>
                    </div>

                    <ChevronDown
                        size={16}
                        className="hidden text-slate-400 sm:block"
                    />
                </button>

            </div>
        </header>
    );
}

