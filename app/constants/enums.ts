export enum RequestStatus {
    ALL = "All",
    OPEN = "Open",
    PENDING = "Pending",
    IN_PROGRESS = "In Progress",
    COMPLETED = "Completed",
    REJECTED = "Rejected",
}

export enum RequestPriority {
    ALL = "All",
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
    CRITICAL = "Critical",
}

export enum RequestCategory {
    ALL = "All",
    HARDWARE = "Hardware",
    SOFTWARE = "Software",
    ACCESS = "Access",
    HR = "HR",
    OTHER = "Other",
}

export enum RequestAction {
    APPROVED = "Approved",
    APPROVE = "Approve",
    REJECTED = "Rejected",
    REJECT = "Reject",

}

export const REQUEST_STATUS_OPTIONS = Object.values(RequestStatus);
export const REQUEST_PRIORITY_OPTIONS = Object.values(RequestPriority);
export const REQUEST_CATEGORY_OPTIONS = Object.values(RequestCategory);

export const REQUEST_STATUS_STYLES: Record<RequestStatus, { badge: string; dot: string }> = {
    [RequestStatus.ALL]: {
        badge: "bg-slate-100 text-slate-700",
        dot: "bg-slate-500",
    },
    [RequestStatus.OPEN]: {
        badge: "bg-slate-100 text-slate-700",
        dot: "bg-slate-500",
    },
    [RequestStatus.PENDING]: {
        badge: "bg-amber-50 text-amber-700",
        dot: "bg-amber-500",
    },
    [RequestStatus.IN_PROGRESS]: {
        badge: "bg-blue-50 text-blue-700",
        dot: "bg-blue-500",
    },
    [RequestStatus.COMPLETED]: {
        badge: "bg-emerald-50 text-emerald-700",
        dot: "bg-emerald-500",
    },
    [RequestStatus.REJECTED]: {
        badge: "bg-red-50 text-red-700",
        dot: "bg-red-500",
    },
};
