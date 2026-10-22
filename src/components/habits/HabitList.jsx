import { Plus } from "lucide-react";
import HabitCard from "./HabitCard";

export default function HabitList({
  habits,
  onToggle,
  onAdd,
  onEdit,
  onDelete,
}) {
  return (
    <section>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold">Today's habits</h3>
          <p className="mt-1 text-sm text-gray-500">
            One step closer to your goals.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add habit</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      <div className="space-y-3">
        {habits.length > 0 ? (
          habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <p className="font-medium">No habits yet</p>
            <p className="mt-1 text-sm text-gray-500">
              Create your first habit to get started.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
