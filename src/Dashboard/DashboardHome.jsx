import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ShoppingCart, Leaf, Users, CheckCircle } from "lucide-react";

const mockFarmerData = [
  { name: "Wheat", value: 40 },
  { name: "Rice", value: 65 },
  { name: "Potato", value: 30 },
];

const mockBuyerData = [
  { name: "Interested", value: 12 },
  { name: "Approved", value: 6 },
  { name: "Purchased", value: 4 },
];

const mockAdminData = [
  { name: "Pending", value: 10 },
  { name: "Approved", value: 18 },
  { name: "Rejected", value: 3 },
];

export default function DashboardHome({ role = "farmer" }) {
  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold"
      >
        Dashboard Overview
      </motion.h1>

      {role === "farmer" && <FarmerDashboard />}
      {role === "buyer" && <BuyerDashboard />}
      {role === "admin" && <AdminDashboard />}
    </div>
  );
}

function FarmerDashboard() {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="My Crops" value="8" icon={<Leaf />} />
        <StatCard title="Interested Buyers" value="14" icon={<Users />} />
        <StatCard title="Approved Sales" value="5" icon={<CheckCircle />} />
      </div>

      <Card className="mt-6">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-4">Crop Interest Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockFarmerData}>
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

function BuyerDashboard() {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Interested Crops" value="12" icon={<Leaf />} />
        <StatCard title="Approved Requests" value="6" icon={<CheckCircle />} />
        <StatCard title="Purchases" value="4" icon={<ShoppingCart />} />
      </div>

      <Card className="mt-6">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-4">Buying Journey</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockBuyerData}>
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

function AdminDashboard() {
  return (
    <>
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard title="Total Farmers" value="42" icon={<Leaf />} />
        <StatCard title="Total Buyers" value="58" icon={<Users />} />
        <StatCard title="Pending Approvals" value="10" icon={<CheckCircle />} />
        <StatCard title="Completed Sales" value="23" icon={<ShoppingCart />} />
      </div>

      <Card className="mt-6">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-4">System Approval Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockAdminData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="flex justify-end mt-4">
        <Button>Go to Approval Panel</Button>
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
