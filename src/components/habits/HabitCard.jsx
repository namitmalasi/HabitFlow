import { Circle, CheckCircle2, Pencil, Trash2 } from "lucide-react";

export default function HabitCard({ habit, onToggle, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 transition hover:border-gray-200 sm:gap-4 sm:p-5">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl"
        style={{ backgroundColor: `${habit.color}18` }}
      >
        {habit.icon}
      </div>

      <div className="min-w-0 flex-1">
        <h4
          className={`truncate font-semibold ${
            habit.completed ? "text-gray-400 line-through" : ""
          }`}
        >
          {habit.name}
        </h4>
        <p className="mt-1 text-sm text-gray-500">
          {habit.category} · {habit.targetFrequency}x/week
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <button
          onClick={() => onEdit(habit)}
          aria-label={`Edit ${habit.name}`}
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          <Pencil size={17} />
        </button>

        <button
          onClick={() => onDelete(habit.id)}
          aria-label={`Delete ${habit.name}`}
          className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={17} />
        </button>

        <button
          onClick={() => onToggle(habit.id)}
          aria-label={`Mark ${habit.name} ${
            habit.completed ? "incomplete" : "complete"
          }`}
          className={`rounded-full transition hover:scale-105 ${
            habit.completed
              ? "text-green-600"
              : "text-gray-300 hover:text-green-500"
          }`}
        >
          {habit.completed ? <CheckCircle2 size={27} /> : <Circle size={27} />}
        </button>
      </div>
    </div>
  );
}
