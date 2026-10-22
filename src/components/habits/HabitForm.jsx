import { useEffect, useState } from "react";
import { X } from "lucide-react";

const icons = ["🎯", "🏋️", "📚", "💧", "💻", "🧘", "🚶", "🥗"];
const colors = [
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
];

const defaultValues = {
  name: "",
  category: "Personal",
  icon: "🎯",
  color: "#22c55e",
  targetFrequency: 7,
};

export default function HabitForm({ habit, onSave, onClose }) {
  const [form, setForm] = useState(defaultValues);

  useEffect(() => {
    if (habit) {
      setForm({
        name: habit.name,
        category: habit.category,
        icon: habit.icon,
        color: habit.color,
        targetFrequency: habit.targetFrequency,
      });
    } else {
      setForm(defaultValues);
    }
  }, [habit]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim()) return;

    onSave({
      ...form,
      name: form.name.trim(),
      targetFrequency: Number(form.targetFrequency),
    });
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-md space-y-5 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {habit ? "Edit habit" : "Create a habit"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div>
          <label
            htmlFor="habit-name"
            className="mb-2 block text-sm font-medium"
          >
            Habit name
          </label>
          <input
            id="habit-name"
            autoFocus
            maxLength={60}
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="e.g. Read 10 pages"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label
            htmlFor="habit-category"
            className="mb-2 block text-sm font-medium"
          >
            Category
          </label>
          <select
            id="habit-category"
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
          >
            <option>Personal</option>
            <option>Health</option>
            <option>Learning</option>
            <option>Productivity</option>
            <option>Fitness</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Choose an icon</p>
          <div className="flex flex-wrap gap-2">
            {icons.map((icon) => (
              <button
                key={icon}
                type="button"
                aria-label={`Choose ${icon} icon`}
                aria-pressed={form.icon === icon}
                onClick={() => updateField("icon", icon)}
                className={`flex h-11 w-11 items-center justify-center rounded-xl border text-xl ${
                  form.icon === icon
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Choose a color</p>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Choose color ${color}`}
                aria-pressed={form.color === color}
                onClick={() => updateField("color", color)}
                className={`h-8 w-8 rounded-full ${
                  form.color === color
                    ? "ring-2 ring-gray-900 ring-offset-2"
                    : ""
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="habit-frequency"
            className="mb-2 block text-sm font-medium"
          >
            Target frequency
          </label>
          <select
            id="habit-frequency"
            value={form.targetFrequency}
            onChange={(event) =>
              updateField("targetFrequency", event.target.value)
            }
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
          >
            <option value={1}>1 day per week</option>
            <option value={2}>2 days per week</option>
            <option value={3}>3 days per week</option>
            <option value={4}>4 days per week</option>
            <option value={5}>5 days per week</option>
            <option value={6}>6 days per week</option>
            <option value={7}>Every day</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700"
          >
            {habit ? "Save changes" : "Create habit"}
          </button>
        </div>
      </form>
    </div>
  );
}
