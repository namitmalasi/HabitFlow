import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="mx-auto max-w-6xl p-5 sm:p-8">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <SettingsIcon size={40} className="mx-auto mb-4 text-green-600" />
        <h2 className="text-xl font-bold">Settings</h2>
        <p className="mt-2 text-gray-500">
          Theme preferences and data backup options will appear here.
        </p>
      </div>
    </div>
  );
}
