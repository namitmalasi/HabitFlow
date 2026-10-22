
import {
  LayoutDashboard,
  ChartNoAxesCombined,
  Settings,
  Flame,
  Target,
  X,
} from 'lucide-react'

const navigation = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Analytics', icon: ChartNoAxesCombined },
  { label: 'Settings', icon: Settings },
]

export default function Sidebar({
  activePage,
  setActivePage,
  menuOpen,
  setMenuOpen,
}) {
  return (
    <>
      {menuOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white p-5 transition-transform lg:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500 text-white">
              <Target size={23} />
            </div>
            <span className="text-xl font-bold">HabitFlow</span>
          </div>

          <button
            className="lg:hidden"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Workspace
        </p>

        <nav className="space-y-2">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => {
                setActivePage(label)
                setMenuOpen(false)
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                activePage === label
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={19} />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl bg-green-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-green-700">
            <Flame size={20} />
            <span className="font-semibold">Stay consistent!</span>
          </div>
          <p className="text-sm leading-6 text-gray-600">
            Small daily actions lead to big changes.
          </p>
        </div>
      </aside>
    </>
  )
}
