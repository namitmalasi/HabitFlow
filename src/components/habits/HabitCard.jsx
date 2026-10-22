import { Circle, CheckCircle2 } from "lucide-react";

export default function HabitCard({ habit, onToggle }) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border bg-white p-4 transition sm:p-5 ${
        habit.completed
          ? "border-green-100"
          : "border-gray-100 hover:border-gray-200"
      }`}
    >
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
        <p className="mt-1 text-sm text-gray-500">{habit.category}</p>
      </div>

      <button
        onClick={() => onToggle(habit.id)}
        aria-label={`Mark ${habit.name} ${
          habit.completed ? "incomplete" : "complete"
        }`}
        className={`shrink-0 transition hover:scale-105 ${
          habit.completed
            ? "text-green-600"
            : "text-gray-300 hover:text-green-500"
        }`}
      >
        {habit.completed ? <CheckCircle2 size={28} /> : <Circle size={28} />}
      </button>
    </div>
  );
}
