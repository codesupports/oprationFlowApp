"use client";

import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, X, } from "lucide-react";
import { useGetRecentRequestQuery, useDeleteItemRequestMutation, isEditRequest } from "../store/slices/requestSlice";
import RequestTable from "../components/requests/RequestTable";
import RequestFilters from "../components/requests/RequestFilters";

export default function RequestsPage() {
    const router = useRouter();
    const [deleteItemRequestMutation] = useDeleteItemRequestMutation();
    const dispatch = useDispatch();
    const { data, error, isLoading } = useGetRecentRequestQuery();

    const [filters, setFilters] = useState({
        search: "",
        status: "All",
        priority: "All",
        category: "All",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const filteredRequests = useMemo(() => {
        return data?.requests?.filter((request) => {
            const searchValue = filters.search.toLowerCase().trim();

            const matchesSearch = !searchValue || request.id.toLowerCase().includes(searchValue) ||
                request.title.toLowerCase().includes(searchValue) ||
                request.assignedTo.toLowerCase().includes(searchValue);
            const matchesStatus = filters.status === "All" || request.status === filters.status;
            const matchesPriority = filters.priority === "All" || request.priority === filters.priority;
            const matchesCategory = filters.category === "All" || request.category === filters.category;
            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority &&
                matchesCategory
            );
        });
    }, [data?.requests, filters]);
    const totalPages = Math.ceil(
        filteredRequests?.length / itemsPerPage
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedRequests = filteredRequests?.slice(startIndex, startIndex + itemsPerPage);

    const handleFilterChange = (name, value) => {
        setFilters((previous) => ({
            ...previous,
            [name]: value,
        }));
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setFilters({
            search: "",
            status: "All",
            priority: "All",
            category: "All",
        });
        setCurrentPage(1);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this request?");
        if (!confirmed) return;

        try {
            // console.log("Deleting ID:", id);
            const result = await deleteItemRequestMutation(id).unwrap();
            console.log("Delete success:", result);

        } catch (error) {
            console.error("Delete error:", error);
            // console.error("Status:", error?.status);
            // console.error("Data:", error?.data);
        }
    };
    const handleView = (id) => {
        router.push(`/requests/${id}`);
    };

    const handleEdit = (id) => {
        const ftData = data?.requests?.filter((request) => {
            return request.id == id
        })
        dispatch(isEditRequest(ftData))
        console.log('asdasdasdasdasdasdasdasdas')
        router.push(`/requests/edit`);// For Handle Edit
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="flex min-w-0 flex-1 flex-col lg:ml-64 ">
                <div className="border-b  border-slate-200 bg-white">
                    <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                    Requests
                                </h1>

                                <p className="mt-1 text-sm text-slate-500">
                                    Manage and track all service requests.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="mb-4 flex items-center gap-2">
                            <SlidersHorizontal
                                size={18}
                                className="text-slate-500"
                            />
                            <h2 className="text-sm font-semibold text-slate-800">Search & Filters</h2>
                        </div>

                        <RequestFilters
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClear={handleClearFilters}
                        />
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">Showing{" "}
                                <span className="font-semibold text-slate-700">{filteredRequests?.length}</span>{" "}
                                requests
                            </p>
                        </div>

                        {(filters.search ||
                            filters.status !== "All" ||
                            filters.priority !== "All" ||
                            filters.category !== "All") && (
                                <button
                                    type="button"
                                    onClick={handleClearFilters}
                                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    <X size={16} />
                                    Clear filters
                                </button>
                            )}
                    </div>

                    <div className="mt-3">
                        <RequestTable
                            requests={paginatedRequests}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-6 flex items-center justify-center gap-2">
                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((page) => page - 1)}
                                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => setCurrentPage(page)}
                                    className={`h-9 w-9 rounded-lg text-sm font-medium ${currentPage === page
                                        ? "bg-blue-600 text-white"
                                        : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                type="button"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((page) => page + 1)}
                                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
