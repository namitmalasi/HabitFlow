export default function ProgressCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "text-green-600",
  progress,
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">{title}</span>
        <Icon className={color} size={21} />
      </div>

      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold">{value}</span>
      </div>

      {progress !== undefined && (
        <>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">{progress}% completed</p>
        </>
      )}

      {subtitle && <p className="mt-3 text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}
