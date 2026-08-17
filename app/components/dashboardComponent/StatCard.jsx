
"use client";

export default function StatCard({
  title,
  value,
  change,
  description,
  icon: Icon,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
          <Icon size={21} />
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

