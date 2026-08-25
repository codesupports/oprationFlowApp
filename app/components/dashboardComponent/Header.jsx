"use client";

import {
    Search,
    Bell,
    ChevronDown,
    Menu,
    LogOut,
    User,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { isLoggedOutUser } from "../../store/slices/requestSlice";

export default function Header() {
    const [showDropdown, setShowDropdown] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    // Reference to profile + dropdown
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => { document.removeEventListener("mousedown", handleClickOutside) };
    }, []);

    const handleLogout = () => {
        dispatch(isLoggedOutUser(null));
        setShowDropdown(false);
        router.push("/login");
    };

    return (
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">



            {/* Search */}
            <div className="relative hidden w-full max-w-md md:block">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

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

                {/* Profile + Dropdown */}
                <div
                    ref={profileRef}
                    className="relative"
                >
                    <button
                        type="button"
                        onClick={() =>
                            setShowDropdown((prev) => !prev)
                        }
                        className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-slate-50"
                    >
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
                            className={`hidden text-slate-400 transition-transform sm:block ${showDropdown
                                ? "rotate-180"
                                : ""
                                }`}
                        />
                    </button>

                    {/* Dropdown */}
                    {showDropdown && (
                        <>
                            <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                                <button
                                    type="button"
                                    onClick={() => router.push("/allUser")}
                                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <User size={17} />
                                    <span>Add User</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <LogOut size={17} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}