import { useMemo, useState } from "react";
import { eachDayOfInterval, endOfYear, format, startOfYear } from "date-fns";

const CELL_SIZE = 12;
const CELL_GAP = 4;

function getLevel(count, maxCount) {
  if (count === 0) return 0;
  if (maxCount <= 1) return 4;
  return Math.min(4, Math.ceil((count / maxCount) * 4));
}

const colors = [
  "bg-gray-100",
  "bg-green-200",
  "bg-green-300",
  "bg-green-500",
  "bg-green-700",
];

export default function HabitHeatmap({ habits }) {
  const [year, setYear] = useState(new Date().getFullYear());

  const { weeks, counts, maxCount } = useMemo(() => {
    const days = eachDayOfInterval({
      start: startOfYear(new Date(year, 0, 1)),
      end: endOfYear(new Date(year, 0, 1)),
    });

    const dailyCounts = {};

    habits.forEach((habit) => {
      habit.completedDates.forEach((date) => {
        dailyCounts[date] = (dailyCounts[date] || 0) + 1;
      });
    });

    const firstDay = days[0].getDay();
    const paddedDays = [...Array(firstDay).fill(null), ...days];

    const groupedWeeks = [];

    for (let i = 0; i < paddedDays.length; i += 7) {
      groupedWeeks.push(paddedDays.slice(i, i + 7));
    }

    const max = Math.max(0, ...Object.values(dailyCounts));

    return {
      weeks: groupedWeeks,
      counts: dailyCounts,
      maxCount: max,
    };
  }, [habits, year]);

  const totalCheckIns = Object.values(counts).reduce(
    (total, count) => total + count,
    0,
  );

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold">Habit activity</h3>
          <p className="mt-1 text-sm text-gray-500">
            {totalCheckIns} check-ins in {year}
          </p>
        </div>

        <select
          value={year}
          onChange={(event) => setYear(Number(event.target.value))}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
          aria-label="Select activity year"
        >
          {[0, 1, 2, 3, 4].map((offset) => {
            const optionYear = new Date().getFullYear() - offset;

            return (
              <option key={optionYear} value={optionYear}>
                {optionYear}
              </option>
            );
          })}
        </select>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-max">
          <div className="mb-2 flex gap-1 pl-8 text-xs text-gray-400">
            {weeks.map((week, index) => {
              const firstDate = week.find(Boolean);
              const showMonth = firstDate && firstDate.getDate() <= 7;

              return (
                <div
                  key={index}
                  style={{ width: CELL_SIZE }}
                  className="overflow-visible"
                >
                  {showMonth ? format(firstDate, "MMM") : ""}
                </div>
              );
            })}
          </div>

          <div className="flex gap-1">
            <div className="mr-1 flex flex-col justify-between text-xs text-gray-400">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const date = week[dayIndex];
                  const dateKey = date ? format(date, "yyyy-MM-dd") : null;
                  const count = dateKey ? counts[dateKey] || 0 : 0;
                  const level = getLevel(count, maxCount);

                  return (
                    <div
                      key={dateKey || `empty-${weekIndex}-${dayIndex}`}
                      title={
                        date
                          ? `${format(date, "MMM d, yyyy")}: ${count} check-ins`
                          : ""
                      }
                      className={`h-3 w-3 rounded-sm ${
                        date ? colors[level] : "bg-transparent"
                      }`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-gray-500">
        <span>Less</span>
        {colors.map((color) => (
          <span key={color} className={`h-3 w-3 rounded-sm ${color}`} />
        ))}
        <span>More</span>
      </div>
    </section>
  );
}
