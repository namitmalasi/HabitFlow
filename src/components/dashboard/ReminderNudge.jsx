import { useState } from "react";
import { Bell, CheckCircle2, Clock, X } from "lucide-react";
import { format, subDays } from "date-fns";
import { getToday } from "../../utils/dates";

export default function ReminderNudge({ habits }) {
  const [dismissed, setDismissed] = useState([]);

  const today = getToday();
  const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");

  const incompleteToday = habits.filter(
    (habit) => !habit.completedDates.includes(today),
  );

  // Only daily habits are treated as missed yesterday.
  const missedYesterday = habits.filter(
    (habit) =>
      habit.targetFrequency === 7 && !habit.completedDates.includes(yesterday),
  );

  const reminders = [];

  if (incompleteToday.length > 0) {
    reminders.push({
      id: "today",
      title: "Your habits are waiting!",
      message: `You have ${incompleteToday.length} habit${
        incompleteToday.length === 1 ? "" : "s"
      } left to complete today.`,
      icon: Bell,
      style: "border-green-200 bg-green-50 text-green-800",
    });
  }

  if (missedYesterday.length > 0) {
    reminders.push({
      id: "yesterday",
      title: "A fresh start today",
      message: `You missed ${missedYesterday.length} daily habit${
        missedYesterday.length === 1 ? "" : "s"
      } yesterday. No worries — you can start again today.`,
      icon: Clock,
      style: "border-amber-200 bg-amber-50 text-amber-900",
    });
  }

  const visibleReminders = reminders.filter(
    (reminder) => !dismissed.includes(`${today}-${reminder.id}`),
  );

  if (habits.length > 0 && incompleteToday.length === 0) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
        <CheckCircle2 size={22} />
        <p className="text-sm font-medium">
          Amazing! You've completed all your habits today.
        </p>
      </div>
    );
  }

  if (visibleReminders.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {visibleReminders.map((reminder) => {
        const Icon = reminder.icon;

        return (
          <div
            key={reminder.id}
            className={`flex items-start gap-3 rounded-2xl border p-4 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 ${reminder.style}`}
          >
            <Icon className="mt-0.5 shrink-0" size={21} />

            <div className="min-w-0 flex-1">
              <h3 className="font-semibold">{reminder.title}</h3>
              <p className="mt-1 text-sm opacity-90">{reminder.message}</p>
            </div>

            <button
              onClick={() =>
                setDismissed((previous) => [
                  ...previous,
                  `${today}-${reminder.id}`,
                ])
              }
              aria-label="Dismiss reminder"
              className="shrink-0 rounded-lg p-1 opacity-70 hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
