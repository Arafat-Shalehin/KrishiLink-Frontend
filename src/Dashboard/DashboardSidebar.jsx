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
  ShoppingBag,
  Receipt,
} from "lucide-react";
import {
  Shield,
  Users as UsersIcon,
  ClipboardList,
  Sprout,
} from "lucide-react";

const SidebarItem = ({ to, icon: Icon, label, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      data-tip={label}
      className={({ isActive }) =>
        [
          "is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition",
          isActive
            ? "bg-(--color-primary) dark:bg-green-500 dark:text-black text-primary-content"
            : "text-base-content hover:bg-primary/10",
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

  if (isLoading) {
    return <aside className="h-full w-full px-2" />;
  }

  if (!dbUser) return null;

  const role = dbUser?.role;

  return (
    <aside className="h-full w-full px-2">
      <nav className="flex flex-col gap-6 mt-4 dark:*:text-white">
        {/* Home */}
        <Link
          to="/"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-base-content hover:bg-primary/10 transition"
          data-tip="Homepage"
        >
          <House className="h-4 w-4" />
          <span className="is-drawer-close:hidden">Homepage</span>
        </Link>

        {/* Dashboard Section */}
        <div className="flex flex-col gap-2 dark:*:text-white">
          <NavLink
            to="/dashboard"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-base-content hover:bg-primary/10 transition"
            data-tip="Overview"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="is-drawer-close:hidden">Overview</span>
          </NavLink>

          <SidebarItem to="/dashboard/profile" icon={User} label="Profile" />

          {/* Buyer */}
          {role === "buyer" && (
            <>
              <SidebarItem
                to="/dashboard/buyer/interests"
                icon={ListChecks}
                label="My Interests"
              />
              <SidebarItem
                to="/dashboard/buyer/purchases"
                icon={ShoppingBag}
                label="My Purchases"
              />
              <SidebarItem
                to="/dashboard/buyer/transactions"
                icon={Receipt}
                label="Transactions"
              />
            </>
          )}

          {/* Farmer */}
          {role === "farmer" && (
            <>
              <SidebarItem
                to="/dashboard/farmer/crops"
                icon={Leaf}
                label="My Crops"
                end
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

          {/* Admin */}
          {/* Admin */}
          {role === "admin" && (
            <>
              <SidebarItem
                to="/dashboard/admin"
                icon={Shield}
                label="Admin Overview"
                end
              />
              <SidebarItem
                to="/dashboard/admin/users"
                icon={UsersIcon}
                label="Users"
              />
              <SidebarItem
                to="/dashboard/admin/requests"
                icon={ClipboardList}
                label="Requests"
              />
              <SidebarItem
                to="/dashboard/admin/crops"
                icon={Sprout}
                label="Crops"
              />
            </>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
