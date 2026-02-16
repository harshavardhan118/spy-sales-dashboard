function AdminLayout({ children, active, onNavigate }) {
  return (
        <div className="min-h-screen flex bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="h-16 flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-400 border-b">
         <h1 className="text-xl font-semibold">
            SPY
        </h1>
        </div>

        <nav className="mt-4 flex flex-col gap-1 px-2">
          <button
            type="button"
            onClick={() => onNavigate("dashboard")}
            className={`text-left px-4 py-2 rounded ${
              active === "dashboard"
                ? "bg-indigo-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            📊 Dashboard
          </button>

          <button
            type="button"
            onClick={() => onNavigate("sales")}
            className={`text-left px-4 py-2 rounded ${
              active === "sales"
                ? "bg-indigo-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            💼 Sales Entry
          </button>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 shadow flex items-center px-6">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            SPY
          </h1>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
