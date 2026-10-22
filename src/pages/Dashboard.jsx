import { CheckCircle2, Flame, Target } from "lucide-react";
import ProgressCard from "../components/dashboard/ProgressCard";
import HabitList from "../components/habits/HabitList";
import { useHabitStore } from "../store/habitStore";
import { getToday } from "../utils/dates";

export default function Dashboard() {
  const habits = useHabitStore((state) => state.habits);
  const toggleHabit = useHabitStore((state) => state.toggleHabit);
  const addHabit = useHabitStore((state) => state.addHabit);

  const today = getToday();

  const completedCount = habits.filter((habit) =>
    habit.completedDates.includes(today),
  ).length;

  const progress = habits.length
    ? Math.round((completedCount / habits.length) * 100)
    : 0;

  function handleAddHabit() {
    const name = window.prompt("Enter a habit name");

    if (!name?.trim()) return;

    addHabit({
      name: name.trim(),
      category: "Personal",
      icon: "🎯",
      color: "#22c55e",
      targetFrequency: 7,
    });
  }

  const displayHabits = habits.map((habit) => ({
    ...habit,
    completed: habit.completedDates.includes(today),
  }));

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
          subtitle="Your streak calculation is next."
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
        onAdd={handleAddHabit}
      />

      <footer className="pb-4 text-center text-sm text-gray-400">
        Made for better habits, one day at a time.
      </footer>
    </div>
  );
}
