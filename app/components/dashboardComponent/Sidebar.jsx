
"use client";

import { useState } from "react";
import { useRouter, usePathname, redirect } from "next/navigation";
import Link from "next/link";
// icon for left sidebar
import { LayoutDashboard, ClipboardList, Users, CheckSquare, BarChart3, Settings, LogOut, X, Menu, } from "lucide-react";
import { useDispatch } from "react-redux";
import { isLoggedOutUser } from "../../store/slices/requestSlice"
import { getInitials, getLoggedInUserInformation } from '../../utils/helpers'


const menuItems = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
    },
    {
        label: "Requests",
        icon: ClipboardList,
        href: "/requests/new",
        subMenu: [
            { label: "Create Request", href: "/requests/new" },
            // { label: "My Request", href: "/requests/my" },
            { label: "All Request", href: "/requests" },
        ],
    },
    {
        label: "Approvals",
        icon: CheckSquare,
        href: "",
    },
    {
        label: "Users",
        icon: Users,
        href: "/allUser",
    },
    {
        label: "Reports",
        icon: BarChart3,
        href: "",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "",
    },
];

export default function Sidebar({ onClose }) {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const [openMenu, setOpenMenu] = useState("Requests");
    const [toggleHmburger, setToggleHamburger] = useState(false)

    const toggleMobileMenu = () => {
        setToggleHamburger(!toggleHmburger);
    };


    const isActiveRoute = (href) => {
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(`${href}/ || pathname == ""`);
    };

    const isParentActive = (item) => {
        if (item.subMenu) {
            return item.subMenu.some((sub) => pathname === sub.href || pathname.startsWith(`${sub.href}/`));
        }
        return isActiveRoute(item.href);
    };

    const handleNavigation = (item) => {
        if (item.subMenu) {
            setOpenMenu(openMenu === item.label ? "" : item.label);
            return;
        }
        router.push(item.href);
        setToggleHamburger(false)

    };

    const logOutUser = (val) => {
        dispatch(isLoggedOutUser(val))
        redirect("/login");
    }

    return (
        <>
            {/* Mobile Menu */}
            <button
                onClick={toggleMobileMenu}
                className="rounded-lg p-2 absolute z-50 top-4 left-3 text-slate-600 hover:bg-slate-100 mg:hidden"
            >
                <Menu size={22} />
            </button>
            {toggleHmburger && <div class="absolute inset-0 bg-black/50 z-50" onClick={toggleMobileMenu} />}
            <aside className={`fixed inset-y-0 md:left-0 z-50 flex w-64 flex-col bg-slate-900 text-white ${toggleHmburger ? "left-0" : "-left-75"}`}>

                {/* Logo */}
                <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">
                            <Link href="/dashboard">Opration-Flow</Link>
                        </h1>
                        <p className="mt-0.5 text-xs text-slate-400">Service Management</p>
                    </div>

                    {onClose && (
                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-3 py-6">
                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Workspace</p>

                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isOpen = item.subMenu && openMenu === item.label;
                        return (
                            <div key={item.label}>
                                <button
                                    type="button"
                                    onClick={() => handleNavigation(item)}
                                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isParentActive(item) ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
                                >
                                    <Icon size={19} />
                                    <span>{item.label}</span>
                                </button>

                                {item.subMenu && isOpen && (
                                    <div className="space-y-1 px-5 pt-1">
                                        {item.subMenu.map((subItem) => (
                                            <button
                                                key={subItem.label}
                                                type="button"
                                                onClick={() => handleNavigation(subItem)}
                                                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActiveRoute(subItem.href) ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
                                            >
                                                <span>{subItem.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* User */}
                <div className="border-t border-slate-800 p-4">
                    <div className="flex items-center gap-3 rounded-lg p-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold">
                            {getInitials(getLoggedInUserInformation().name)}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium capitalize">{getLoggedInUserInformation().name}</p>
                            <p className="truncate text-xs text-slate-400">{getLoggedInUserInformation().role}</p>
                        </div>
                    </div>

                    <button className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white" onClick={() => logOutUser(false)}>
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}

