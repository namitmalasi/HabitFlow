import { useState } from "react";
import { CheckCircle2, Flame, Target } from "lucide-react";
import ProgressCard from "../components/dashboard/ProgressCard";
import HabitList from "../components/habits/HabitList";
import HabitForm from "../components/habits/HabitForm";
import { useHabitStore } from "../store/habitStore";
import { getToday } from "../utils/dates";

export default function Dashboard() {
  const habits = useHabitStore((state) => state.habits);
  const toggleHabit = useHabitStore((state) => state.toggleHabit);
  const addHabit = useHabitStore((state) => state.addHabit);
  const updateHabit = useHabitStore((state) => state.updateHabit);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  const today = getToday();

  const completedCount = habits.filter((habit) =>
    habit.completedDates.includes(today),
  ).length;

  const progress = habits.length
    ? Math.round((completedCount / habits.length) * 100)
    : 0;

  const displayHabits = habits.map((habit) => ({
    ...habit,
    completed: habit.completedDates.includes(today),
  }));

  function handleAdd() {
    setEditingHabit(null);
    setIsFormOpen(true);
  }

  function handleEdit(habit) {
    setEditingHabit(habit);
    setIsFormOpen(true);
  }

  function handleSave(formData) {
    if (editingHabit) {
      updateHabit(editingHabit.id, formData);
    } else {
      addHabit(formData);
    }

    setIsFormOpen(false);
    setEditingHabit(null);
  }

  function handleDelete(id) {
    const habit = habits.find((item) => item.id === id);
    if (!habit) return;

    const confirmed = window.confirm(
      `Delete "${habit.name}"? Its check-in history will also be removed.`,
    );

    if (confirmed) {
      deleteHabit(id);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-5 sm:p-8">
      <section>
        <p className="mb-2 text-sm font-medium text-green-600">
          YOUR DAILY JOURNEY
        </p>
        <h2 className="text-2xl font-bold sm:text-3xl">Good morning! 👋</h2>
        <p className="mt-2 text-gray-500">
          Make today count. Every small step matters.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <ProgressCard
          title="Today's progress"
          value={`${completedCount}/${habits.length}`}
          subtitle="habits done"
          icon={CheckCircle2}
          color="text-green-600"
          progress={progress}
        />

        <ProgressCard
          title="Current streak"
          value="Coming soon"
          subtitle="Streak calculation is next."
          icon={Flame}
          color="text-orange-500"
        />

        <ProgressCard
          title="Daily goal"
          value={habits.length}
          subtitle="habits planned"
          icon={Target}
          color="text-purple-500"
        />
      </section>

      <HabitList
        habits={displayHabits}
        onToggle={toggleHabit}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <HabitForm
          habit={editingHabit}
          onSave={handleSave}
          onClose={() => {
            setIsFormOpen(false);
            setEditingHabit(null);
          }}
        />
      )}

      <footer className="pb-4 text-center text-sm text-gray-400">
        Made for better habits, one day at a time.
      </footer>
    </div>
  );
}
