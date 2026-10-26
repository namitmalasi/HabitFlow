import { useRef, useState } from "react";
import {
  Download,
  Upload,
  Database,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useHabitStore } from "../store/habitStore";

export default function Settings() {
  const habits = useHabitStore((state) => state.habits);
  const importHabits = useHabitStore((state) => state.importHabits);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState(null);

  function handleExport() {
    const backup = {
      app: "HabitFlow",
      version: 1,
      exportedAt: new Date().toISOString(),
      habits,
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `habitflow-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);

    setMessage({ type: "success", text: "Your backup was exported." });
  }

  function handleImport(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const backup = JSON.parse(reader.result);
        const importedHabits = Array.isArray(backup) ? backup : backup.habits;

        if (
          !Array.isArray(importedHabits) ||
          !importedHabits.every(
            (habit) =>
              habit &&
              typeof habit.id === "string" &&
              typeof habit.name === "string" &&
              Array.isArray(habit.completedDates) &&
              typeof habit.targetFrequency === "number" &&
              habit.targetFrequency >= 1 &&
              habit.targetFrequency <= 7,
          )
        ) {
          throw new Error("Invalid habit data");
        }

        const confirmed = window.confirm(
          "Import this backup? It will replace your current habits and check-in history.",
        );

        if (!confirmed) return;

        importHabits(importedHabits);
        setMessage({
          type: "success",
          text: "Your habits were imported successfully.",
        });
      } catch {
        setMessage({
          type: "error",
          text: "This file is invalid or could not be imported.",
        });
      } finally {
        event.target.value = "";
      }
    };

    reader.onerror = () => {
      setMessage({ type: "error", text: "Could not read this file." });
      event.target.value = "";
    };

    reader.readAsText(file);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-5 sm:p-8">
      <section>
        <p className="mb-2 text-sm font-medium text-green-600">PREFERENCES</p>
        <h2 className="text-2xl font-bold sm:text-3xl">Settings</h2>
        <p className="mt-2 text-gray-500">
          Manage your habit data and backups.
        </p>
      </section>

      {message && (
        <div
          role="status"
          className={`flex items-center gap-2 rounded-xl border p-4 text-sm ${
            message.type === "success"
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          {message.text}
        </div>
      )}

      <section className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-green-100 p-3 text-green-700">
            <Database size={22} />
          </div>
          <div>
            <h3 className="font-bold">Your habit data</h3>
            <p className="mt-1 text-sm text-gray-500">
              You currently have {habits.length} habits saved on this device.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700"
          >
            <Download size={18} />
            Export backup
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 font-semibold hover:bg-gray-50"
          >
            <Upload size={18} />
            Import backup
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImport}
            className="hidden"
          />
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Importing replaces your current habits. Export a backup first if you
          want to keep your existing data.
        </p>
      </section>
    </div>
  );
}
