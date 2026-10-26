import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getToday } from "../utils/dates";

const initialHabits = [
  {
    id: "habit-1",
    name: "Morning workout",
    category: "Health",
    icon: "🏋️",
    color: "#22c55e",
    targetFrequency: 7,
    completedDates: [],
  },
  {
    id: "habit-2",
    name: "Read 10 pages",
    category: "Learning",
    icon: "📚",
    color: "#8b5cf6",
    targetFrequency: 7,
    completedDates: [],
  },
  {
    id: "habit-3",
    name: "Drink enough water",
    category: "Health",
    icon: "💧",
    color: "#3b82f6",
    targetFrequency: 7,
    completedDates: [],
  },
  {
    id: "habit-4",
    name: "Practice coding",
    category: "Productivity",
    icon: "💻",
    color: "#f59e0b",
    targetFrequency: 3,
    completedDates: [],
  },
];

export const useHabitStore = create(
  persist(
    (set, get) => ({
      habits: initialHabits,

      addHabit: (habit) =>
        set((state) => ({
          habits: [
            ...state.habits,
            {
              ...habit,
              id: crypto.randomUUID(),
              completedDates: [],
            },
          ],
        })),

      updateHabit: (id, updates) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, ...updates } : habit,
          ),
        })),

      deleteHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        })),

      exportHabits: () => get().habits,

      importHabits: (habits) => set({ habits }),

      toggleHabit: (id) =>
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id !== id) return habit;

            const today = getToday();
            const completed = habit.completedDates.includes(today);

            return {
              ...habit,
              completedDates: completed
                ? habit.completedDates.filter((date) => date !== today)
                : [...habit.completedDates, today],
            };
          }),
        })),
    }),
    {
      name: "habitflow-storage",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
