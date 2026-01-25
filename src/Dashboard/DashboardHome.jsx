import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ShoppingCart, Leaf, Users, CheckCircle } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAuthProfile from "../Hooks/useAuthProfile";
import useBuyerDashboard from "../Hooks/dashboard/useBuyerDashboard";
import useFarmerDashboard from "../Hooks/dashboard/useFarmerDashboard";
import DashboardHomeSkeleton from "./DashboardHomeSkeleton";

export default function DashboardHome() {
  const { user } = useContext(AuthContext);
  const { dbUser, loading: profileLoading } = useAuthProfile(user);

  const role = dbUser?.role || "buyer";

  const buyerQuery = useBuyerDashboard(role === "buyer");
  const farmerQuery = useFarmerDashboard(role === "farmer");

  if (profileLoading) return <DashboardHomeSkeleton cards={3} />;

  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold"
      >
        Dashboard Overview
      </motion.h1>

      {role === "farmer" && <FarmerDashboard query={farmerQuery} />}
      {role === "buyer" && <BuyerDashboard query={buyerQuery} />}

      {/* Admin later */}
      {role === "admin" && <AdminDashboard />}
    </div>
  );
}

function FarmerDashboard({ query }) {
  const { data, isLoading, isError } = query;

  if (isLoading) return <p>Loading farmer dashboard...</p>;
  if (isError) return <p>Failed to load farmer dashboard.</p>;

  const stats = data?.stats || {};
  const chart = data?.chart || [];

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="My Crops" value={stats.myCrops ?? 0} icon={<Leaf />} />
        <StatCard
          title="Interested Buyers"
          value={stats.interestedBuyers ?? 0}
          icon={<Users />}
        />
        <StatCard
          title="Approved Sales"
          value={stats.approvedSales ?? 0}
          icon={<CheckCircle />}
        />
      </div>

      <Card className="mt-6">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-4">Crop Interest Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}

function BuyerDashboard({ query }) {
  const { data, isLoading, isError } = query;

  if (isLoading) return <DashboardHomeSkeleton cards={3} />;
  if (isError) return <p>Failed to load buyer dashboard.</p>;

  const stats = data?.stats || {};
  const chart = data?.chart || [];

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Interested Crops"
          value={stats.interestedCrops ?? 0}
          icon={<Leaf />}
        />
        <StatCard
          title="Approved Requests"
          value={stats.approvedRequests ?? 0}
          icon={<CheckCircle />}
        />
        <StatCard
          title="Purchases"
          value={stats.purchases ?? 0}
          icon={<ShoppingCart />}
        />
      </div>

      <Card className="mt-6">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-4">Buying Journey</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}

// keep Admin static for now
function AdminDashboard() {
  return (
    <>
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard title="Total Farmers" value="—" icon={<Leaf />} />
        <StatCard title="Total Buyers" value="—" icon={<Users />} />
        <StatCard title="Pending Approvals" value="—" icon={<CheckCircle />} />
        <StatCard title="Completed Sales" value="—" icon={<ShoppingCart />} />
      </div>

      <Card className="mt-6">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-4">System Approval Status</h2>
          <p className="text-sm text-muted-foreground">
            Admin dashboard will be added later.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end mt-4">
        <Button disabled>Go to Approval Panel</Button>
      </div>
    </>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }}>
      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="text-muted-foreground">{icon}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
