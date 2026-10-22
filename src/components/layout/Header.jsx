import { Menu } from "lucide-react";

export default function Header({ activePage, setMenuOpen }) {
  const today = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white/90 px-5 py-4 backdrop-blur sm:px-8">
      <div className="flex items-center gap-3">
        <button
          aria-label="Open navigation menu"
          className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-lg font-bold sm:text-xl">{activePage}</h1>
          <p className="hidden text-sm text-gray-500 sm:block">{today}</p>
        </div>
      </div>

      <div
        className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700"
        aria-label="HabitFlow profile"
      >
        H
      </div>
    </header>
  );
}
