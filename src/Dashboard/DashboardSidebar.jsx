import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAuthProfile from "../Hooks/useAuthProfile";
import {
  LayoutDashboard,
  User,
  ListChecks,
  Leaf,
  PlusCircle,
  Inbox,
  House,
} from "lucide-react";

const SidebarItem = ({ to, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      data-tip={label}
      className={({ isActive }) =>
        [
          "is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition",
          isActive
            ? "bg-(--color-primary) text-white"
            : "text-(--color-text) hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]",
        ].join(" ")
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="is-drawer-close:hidden">{label}</span>
    </NavLink>
  );
};

const DashboardSidebar = () => {
  const { user } = useContext(AuthContext);
  const { dbUser, isLoading } = useAuthProfile(user);

  if (isLoading) return null;

  const role = dbUser?.role ?? "buyer";

  return (
    <aside className="h-full w-full px-2">
      <nav className="flex flex-col gap-6 mt-4">
        {/* Home */}
        <Link
          to="/"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] transition"
          data-tip="Homepage"
        >
          <House className="h-4 w-4" />
          <span className="is-drawer-close:hidden">Homepage</span>
        </Link>

        {/* Dashboard Section */}
        <div className="flex flex-col gap-2">
          <Link
            to="/dashboard"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] transition"
            data-tip="Overview"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="is-drawer-close:hidden">Overview</span>
          </Link>

          <SidebarItem to="/dashboard/profile" icon={User} label="Profile" />

          {/* Buyer */}
          {role === "buyer" && (
            <SidebarItem
              to="/dashboard/buyer/interests"
              icon={ListChecks}
              label="My Interests"
            />
          )}

          {/* Farmer */}
          {role === "farmer" && (
            <>
              <SidebarItem
                to="/dashboard/farmer/crops"
                icon={Leaf}
                label="My Crops"
              />
              <SidebarItem
                to="/dashboard/farmer/crops/add"
                icon={PlusCircle}
                label="Add Crop"
              />
              <SidebarItem
                to="/dashboard/farmer/interests"
                icon={Inbox}
                label="Crop Interests"
              />
            </>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
