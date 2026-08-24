"use client";

import { useMemo, useState } from "react";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    MoreVertical,
} from "lucide-react";
import { useRouter } from "next/navigation";

const initialUsers = [
    {
        id: "USR-001",
        name: "Raj Kumar",
        email: "raj.kumar@example.com",
        role: "Admin",
        department: "IT",
        status: "Active",
    },
    {
        id: "USR-002",
        name: "Simran Sharma",
        email: "simran.sharma@example.com",
        role: "Manager",
        department: "Operations",
        status: "Active",
    },
    {
        id: "USR-003",
        name: "Kartik Singh",
        email: "kartik.singh@example.com",
        role: "User",
        department: "IT",
        status: "Active",
    },
    {
        id: "USR-004",
        name: "Priya Verma",
        email: "priya.verma@example.com",
        role: "User",
        department: "Finance",
        status: "Inactive",
    },
];

export default function UserList() {
    const router = useRouter();

    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const searchValue = search.toLowerCase();

            const matchesSearch =
                user.name.toLowerCase().includes(searchValue) ||
                user.email.toLowerCase().includes(searchValue) ||
                user.department.toLowerCase().includes(searchValue);

            const matchesRole =
                roleFilter === "All" ||
                user.role === roleFilter;

            const matchesStatus =
                statusFilter === "All" ||
                user.status === statusFilter;

            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus
            );
        });
    }, [users, search, roleFilter, statusFilter]);

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) return;

        setUsers((prev) =>
            prev.filter((user) => user.id !== id)
        );
    };

    const handleEdit = (user) => {
        console.log("Edit user:", user);

        // Example:
        // dispatch(setEditUser(user));
        // router.push(`/users/${user.id}/edit`);
    };

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    return (
        <main className="flex min-h-screen bg-slate-50">
            <div className="flex min-w-0 flex-1 p-5 flex-col lg:ml-64">

                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Users
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage users and their permissions
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => router.push("/users/add")}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        <Plus size={18} />
                        Add User
                    </button>
                </div>

                {/* Filters */}
                <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                    <div className="flex flex-col gap-3 lg:flex-row">

                        {/* Search */}
                        <div className="relative flex-1">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="search"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search users..."
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            />
                        </div>

                        {/* Role */}
                        <select
                            value={roleFilter}
                            onChange={(e) =>
                                setRoleFilter(e.target.value)
                            }
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="All">All Roles</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="User">User</option>
                        </select>

                        {/* Status */}
                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* User Count */}
                <div className="mb-3 text-sm text-slate-500">
                    Showing{" "}
                    <span className="font-semibold text-slate-700">
                        {filteredUsers.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-slate-700">
                        {users.length}
                    </span>{" "}
                    users
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">

                            <thead className="border-b border-slate-200 bg-slate-50">
                                <tr>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        User
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Role
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Department
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Status
                                    </th>

                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">

                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="transition hover:bg-slate-50"
                                        >
                                            {/* User */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                                                        {getInitials(
                                                            user.name
                                                        )}
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-800">
                                                            {user.name}
                                                        </p>

                                                        <p className="text-xs text-slate-500">
                                                            {user.email}
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>

                                            {/* Role */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${user.role ===
                                                        "Admin"
                                                        ? "bg-purple-100 text-purple-700"
                                                        : user.role ===
                                                            "Manager"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-slate-100 text-slate-600"
                                                        }`}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>

                                            {/* Department */}
                                            <td className="px-5 py-4 text-sm text-slate-600">
                                                {user.department}
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${user.status ===
                                                        "Active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${user.status ===
                                                            "Active"
                                                            ? "bg-green-500"
                                                            : "bg-red-500"
                                                            }`}
                                                    />

                                                    {user.status}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-1">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleEdit(
                                                                user
                                                            )
                                                        }
                                                        className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                                                        title="Edit user"
                                                    >
                                                        <Pencil
                                                            size={17}
                                                        />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                user.id
                                                            )
                                                        }
                                                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                                                        title="Delete user"
                                                    >
                                                        <Trash2
                                                            size={17}
                                                        />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                                        title="More"
                                                    >
                                                        <MoreVertical
                                                            size={17}
                                                        />
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-5 py-12 text-center"
                                        >
                                            <div className="text-sm font-medium text-slate-700">
                                                No users found
                                            </div>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Try changing your search or
                                                filters.
                                            </p>
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}