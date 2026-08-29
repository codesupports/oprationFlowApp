"use client";

import { todayDate } from "../utils/helpers";
import { useGetRecentRequestQuery } from "../store/slices/requestSlice";
import * as XLSX from "xlsx";
import { FileSpreadsheet, Download } from "lucide-react";

const reports = [
    {
        id: 1,
        name: "Request Report",
        type: "Report",
        date: todayDate(),
        status: "Ready",
    },
];

export default function Reports() {
    const { data, isLoading } = useGetRecentRequestQuery(undefined);

    const handleDownload = () => {
        const confirmed = window.confirm('Are you want to download Excel Data!')

        if (!confirmed) {
            return;
        }
        const requests = Array.isArray(data?.requests)
            ? data.requests
            : [];

        if (!requests.length) {
            alert("No request data available.");
            return;
        }

        // Excel mein jo data chahiye
        const excelData = requests.map((request: any, index: number) => ({
            "S.No": index + 1,
            "Request ID": request.id ?? "",
            "Title": request.title ?? "",
            "Description": request.description ?? "",
            "Category": request.category ?? "",
            "Status": request.status ?? "",
            "Requested By": request.requestedBy,
            "Updated Date": request.date,
        }));

        // Worksheet create
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // Column width
        worksheet["!cols"] = [
            { wch: 8 },
            { wch: 15 },
            { wch: 25 },
            { wch: 40 },
            { wch: 20 },
            { wch: 15 },
            { wch: 18 },
            { wch: 18 },
        ];

        // Workbook create
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Requests-Data"
        );

        // Excel download
        XLSX.writeFile(
            workbook,
            `All_Request_Report_${todayDate()}.xlsx`
        );
    };

    return (
        <main className="flex min-h-screen bg-slate-50">
            <div className="flex min-w-0 flex-1 p-5 flex-col lg:ml-64">
                <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm">
                    {/* Header */}
                    <div className="border-b border-gray-200 px-6 py-5">
                        <h2 className="text-lg font-semibold text-gray-900">Reports</h2>
                        <p className="mt-1 text-sm text-gray-500">Download your generated reports.</p>
                    </div>
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px] text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Report</th>
                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Type</th>
                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Generated On</th>
                                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {reports.map((report) => (
                                    <tr
                                        key={report.id}
                                        className="transition-colors hover:bg-gray-50"
                                    >
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                                                    <FileSpreadsheet />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{report.name}</p>
                                                    <p className="text-sm text-gray-500">Excel Report</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{report.type}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{report.date}</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                                                {report.status}
                                            </span>
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4 text-right">
                                            <button
                                                onClick={handleDownload}
                                                disabled={isLoading}
                                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <Download />
                                                {isLoading ? "Loading..." : "Download"}
                                            </button>

                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
