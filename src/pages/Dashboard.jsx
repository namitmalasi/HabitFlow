import { useState } from "react";
import { CheckCircle2, Flame, Target } from "lucide-react";
import ProgressCard from "../components/dashboard/ProgressCard";
import HabitList from "../components/habits/HabitList";

const initialHabits = [
  {
    id: 1,
    name: "Morning workout",
    category: "Health",
    icon: "🏋️",
    color: "#22c55e",
    completed: true,
  },
  {
    id: 2,
    name: "Read 10 pages",
    category: "Learning",
    icon: "📚",
    color: "#8b5cf6",
    completed: true,
  },
  {
    id: 3,
    name: "Drink enough water",
    category: "Health",
    icon: "💧",
    color: "#3b82f6",
    completed: false,
  },
  {
    id: 4,
    name: "Practice coding",
    category: "Productivity",
    icon: "💻",
    color: "#f59e0b",
    completed: false,
  },
];

export default function Dashboard() {
  const [habits, setHabits] = useState(initialHabits);

  const completedCount = habits.filter((habit) => habit.completed).length;

  const progress = habits.length
    ? Math.round((completedCount / habits.length) * 100)
    : 0;

  function toggleHabit(id) {
    setHabits((current) =>
      current.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit,
      ),
    );
  }

  function addHabit() {
    const name = window.prompt("Enter a habit name");

    if (!name?.trim()) return;

    setHabits((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        category: "Personal",
        icon: "🎯",
        color: "#22c55e",
        completed: false,
      },
    ]);
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
          value="7 days"
          subtitle="Keep your momentum going!"
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

      <HabitList habits={habits} onToggle={toggleHabit} onAdd={addHabit} />

      <footer className="pb-4 text-center text-sm text-gray-400">
        Made for better habits, one day at a time.
      </footer>
    </div>
  );
}
