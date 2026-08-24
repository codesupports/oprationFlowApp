
export default function StatCard({
  title,
  value,
  change,
  description,
  icon: Icon,
}) {
  const statusStyles = {
    "Completed": "text-emerald-700",
    "In Progress": "text-blue-700",
    "Pending": "text-amber-700",
    "Total Requests": "text-black-700",
  };
  const bgStyles = {
    "Completed": "bg-emerald-50",
    "In Progress": "bg-blue-50",
    "Pending": "bg-amber-50",
    "Total Requests": "bg-white",
  };
  return (
    <div className={`rounded-xl border border-slate-300 p-5 shadow-sm transition hover:shadow-md ${bgStyles[title]}`}>

      <div className="flex items-start justify-between">

        <div>
          <p className={`text-sm font-bold  ${statusStyles[title]}`}>
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div className={`rounded-lg ${statusStyles[title]}`}>
          <Icon size={30} />
        </div>

      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm font-semibold text-emerald-600">
          {change}
        </span>

        <span className="text-xs text-slate-400">
          {description}
        </span>
      </div>

    </div>
  );
}

