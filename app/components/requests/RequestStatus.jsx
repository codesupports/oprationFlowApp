
export default function RequestStatus({
    status,
}) {
    const styles = {
        Open: {
            badge: "bg-slate-100 text-slate-700",
            dot: "bg-slate-500",
        },

        Pending: {
            badge: "bg-amber-50 text-amber-700",
            dot: "bg-amber-500",
        },

        "In Progress": {
            badge: "bg-blue-50 text-blue-700",
            dot: "bg-blue-500",
        },

        Completed: {
            badge: "bg-emerald-50 text-emerald-700",
            dot: "bg-emerald-500",
        },

        Rejected: {
            badge: "bg-red-50 text-red-700",
            dot: "bg-red-500",
        },
    };

    const currentStyle =
        styles[status] || styles.Open;

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${currentStyle.badge}`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${currentStyle.dot}`}
            />

            {status}
        </span>
    );
}

