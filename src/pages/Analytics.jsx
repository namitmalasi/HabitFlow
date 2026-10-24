import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, startOfMonth, subDays } from "date-fns";
import { CheckCircle2, Target, TrendingUp } from "lucide-react";
import ProgressCard from "../components/dashboard/ProgressCard";
import { useHabitStore } from "../store/habitStore";
import { getToday } from "../utils/dates";

export default function Analytics() {
  const habits = useHabitStore((state) => state.habits);
  const [period, setPeriod] = useState("week");

  const today = getToday();
  const todayDate = new Date();
  const todayCount = habits.filter((habit) =>
    habit.completedDates.includes(today),
  ).length;

  const chartData = useMemo(() => {
    const startDate =
      period === "week" ? subDays(todayDate, 6) : startOfMonth(todayDate);

    const days = eachDayOfInterval({
      start: startDate,
      end: todayDate,
    });

    return days.map((day) => {
      const date = format(day, "yyyy-MM-dd");

      const completed = habits.filter((habit) =>
        habit.completedDates.includes(date),
      ).length;

      return {
        date,
        day: format(day, period === "week" ? "EEE" : "d"),
        completed,
      };
    });
  }, [habits, period, today]);

  const totalCheckIns = chartData.reduce(
    (total, day) => total + day.completed,
    0,
  );

  const possibleCheckIns = chartData.length * habits.length;

  const completionRate = possibleCheckIns
    ? Math.round((totalCheckIns / possibleCheckIns) * 100)
    : 0;

  const mostActiveDay = chartData.reduce(
    (best, day) => (day.completed > best.completed ? day : best),
    { day: "—", completed: 0 },
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-5 sm:p-8">
      <section>
        <p className="mb-2 text-sm font-medium text-green-600">YOUR PROGRESS</p>
        <h2 className="text-2xl font-bold sm:text-3xl">Analytics</h2>
        <p className="mt-2 text-gray-500">
          Understand your habits and track your consistency.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <ProgressCard
          title="Today's check-ins"
          value={`${todayCount}/${habits.length}`}
          subtitle="Habits completed today"
          icon={CheckCircle2}
          color="text-green-600"
        />

        <ProgressCard
          title="Completion rate"
          value={`${completionRate}%`}
          subtitle={period === "week" ? "Last 7 days" : "This month so far"}
          icon={TrendingUp}
          color="text-blue-600"
        />

        <ProgressCard
          title="Most active day"
          value={mostActiveDay.day}
          subtitle={`${mostActiveDay.completed} habits completed`}
          icon={Target}
          color="text-purple-600"
        />
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">Habit completion</h3>
            <p className="mt-1 text-sm text-gray-500">
              {totalCheckIns} total check-ins
            </p>
          </div>

          <div className="flex rounded-xl bg-gray-100 p-1">
            <button
              onClick={() => setPeriod("week")}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                period === "week"
                  ? "bg-white text-green-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Weekly
            </button>

            <button
              onClick={() => setPeriod("month")}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                period === "month"
                  ? "bg-white text-green-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                interval={period === "month" ? 4 : 0}
              />
              <YAxis
                allowDecimals={false}
                domain={[0, Math.max(1, habits.length)]}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                labelFormatter={(_, payload) =>
                  payload?.[0]?.payload?.date || ""
                }
                formatter={(value) => [
                  `${value} ${value === 1 ? "habit" : "habits"}`,
                  "Completed",
                ]}
              />
              <Bar
                dataKey="completed"
                fill="#16a34a"
                radius={[5, 5, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Each bar shows the number of habits you completed on that day.
        </p>
      </section>
    </div>
  );
}
