import { Outlet } from "react-router";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <section className="min-h-[calc(100vh-64px)] bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <DashboardSidebar />
          <main className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
