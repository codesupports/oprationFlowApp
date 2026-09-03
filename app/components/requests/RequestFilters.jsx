
"use client";

import RequestSearch from "./RequestSearch";
import { RequestStatus, RequestPriority, RequestCategory } from '../../constants/enums'

const statusOptions = [
  RequestStatus.ALL,
  RequestStatus.OPEN,
  RequestStatus.PENDING,
  RequestStatus.IN_PROGRESS,
  RequestStatus.COMPLETED,
  RequestStatus.REJECTED,
];

const priorityOptions = [
  RequestPriority.ALL,
  RequestPriority.LOW,
  RequestPriority.MEDIUM,
  RequestPriority.HIGH,
  RequestPriority.CRITICAL, ,
];

const categoryOptions = [
  RequestCategory.ALL,
  RequestCategory.HARDWARE,
  RequestCategory.SOFTWARE,
  RequestCategory.ACCESS,
  RequestCategory.HR,
  RequestCategory.OTHER,
];

export default function RequestFilters({
  filters,
  onFilterChange,
}) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <RequestSearch value={filters.search} onChange={(value) => onFilterChange("search", value)} />
      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Status */}
        <div>
          <label htmlFor="status" className="mb-2 block text-sm font-medium text-slate-700">Status</label>
          <select
            id="status"
            value={filters.status}
            onChange={(event) => onFilterChange("status", event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="priority" className="mb-2 block text-sm font-medium text-slate-700">Priority</label>
          <select
            id="priority"
            value={filters.priority}
            onChange={(event) => onFilterChange("priority", event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 capitalize"
          >
            {priorityOptions.map((priority) => (
              <option key={priority} value={priority} className="capitalize" >{priority}</option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-medium text-slate-700">Category</label>
          <select
            id="category"
            value={filters.category}
            onChange={(event) => onFilterChange("category", event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

