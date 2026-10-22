import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  function renderPage() {
    switch (activePage) {
      case "Analytics":
        return <Analytics />;
      case "Settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main className="min-h-screen lg:ml-64">
        <Header activePage={activePage} setMenuOpen={setMenuOpen} />

        {renderPage()}
      </main>
    </div>
  );
}
