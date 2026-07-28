import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";
import { 
  ShoppingCart, 
  Leaf, 
  Users, 
  CheckCircle, 
  TrendingUp, 
  DollarSign, 
  Activity,
  ArrowRight
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAuthProfile from "../Hooks/useAuthProfile";
import useBuyerDashboard from "../Hooks/dashboard/useBuyerDashboard";
import useFarmerDashboard from "../Hooks/dashboard/useFarmerDashboard";
import useAdminOverview from "@/Hooks/admin/useAdminOverview";
import DashboardHomeSkeleton from "./DashboardHomeSkeleton";

export default function DashboardHome() {
  const { user } = useContext(AuthContext);
  const { dbUser, loading: profileLoading } = useAuthProfile(user);

  const role = dbUser?.role;

  const buyerQuery = useBuyerDashboard(role === "buyer");
  const farmerQuery = useFarmerDashboard(role === "farmer");

  if (profileLoading) return <DashboardHomeSkeleton cards={3} />;

  // Gradient greeting based on time of day could be cool, but keeping it simple for now
  const greeting = `Welcome back, ${dbUser?.name?.split(' ')[0] || 'User'}! 👋`;

  return (
    <div className="p-4 sm:p-8 space-y-8 min-h-screen bg-background/50">
      <div className="flex flex-col gap-2">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl sm:text-4xl font-extrabold bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300"
        >
          {greeting}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          Here's what's happening with your agricultural activities today.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {role === "farmer" && <FarmerDashboard query={farmerQuery} />}
        {role === "buyer" && <BuyerDashboard query={buyerQuery} />}
        {role === "admin" && <AdminDashboard enabled />}
      </motion.div>
    </div>
  );
}

// ==========================================
// 🧑‍🌾 FARMER DASHBOARD
// ==========================================
function FarmerDashboard({ query }) {
  const { data, isLoading, isError } = query;

  if (isLoading) return <DashboardHomeSkeleton cards={3} />;
  if (isError) return <div className="text-red-500 bg-red-50 p-4 rounded-lg">Failed to load farmer insights.</div>;

  const stats = data?.stats || {};
  const chart = data?.chart || [];
//   const recent = data?.recent || [];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Crops Listed" 
          value={stats.myCrops ?? 0} 
          icon={<Leaf className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
          gradient="from-emerald-500/10 to-green-500/10"
          trend="+2 this week"
        />
        <StatCard 
          title="Interested Buyers" 
          value={stats.interestedBuyers ?? 0} 
          icon={<Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
          gradient="from-blue-500/10 to-cyan-500/10"
          trend="Active interest"
        />
        <StatCard 
          title="Approved Sales" 
          value={stats.approvedSales ?? 0} 
          icon={<CheckCircle className="w-6 h-6 text-violet-600 dark:text-violet-400" />}
          gradient="from-violet-500/10 to-purple-500/10"
          trend="Successful deals"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Section */}
        <Card className="shadow-lg border-none bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Activity className="w-5 h-5 text-muted-foreground" />
              Crop Interest Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" name="Interests" radius={[6, 6, 0, 0]}>
                    {chart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#10b981" : "#3b82f6"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions / Tips (Placeholder for future) */}
        <Card className="shadow-lg border-none bg-linear-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
          <CardHeader>
             <CardTitle className="text-xl">Farming Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 items-start p-3 bg-background/60 rounded-xl backdrop-blur-sm">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-lg">⚡</div>
              <div>
                <h4 className="font-semibold text-sm">Update Crop Availability</h4>
                <p className="text-xs text-muted-foreground">Keep your quantities updated to avoid rejecting orders.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-3 bg-background/60 rounded-xl backdrop-blur-sm">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">📸</div>
              <div>
                <h4 className="font-semibold text-sm">Add High Quality Images</h4>
                <p className="text-xs text-muted-foreground">Crops with images get 3x more interest from buyers.</p>
              </div>
            </div>
             <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white" variant="default" asChild>
                <Link to="/dashboard/farmer/crops">Manage Crops <ArrowRight className="w-4 h-4 ml-2"/></Link>
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ==========================================
// 🛒 BUYER DASHBOARD
// ==========================================
function BuyerDashboard({ query }) {
  const { data, isLoading, isError } = query;

  if (isLoading) return <DashboardHomeSkeleton cards={3} />;
  if (isError) return <div className="text-red-500">Failed to load buyer insights.</div>;

  const stats = data?.stats || {};
  const chart = data?.chart || [];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Spends" 
          value={stats.purchases ?? 0} 
          icon={<DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />}
          gradient="from-green-500/10 to-emerald-500/10"
          suffix=" Orders"
        />
        <StatCard 
          title="Pending Requests" 
          value={(stats.interestedCrops || 0) - (stats.approvedRequests || 0) - (stats.rejectedRequests || 0)} 
          icon={<ShoppingCart className="w-6 h-6 text-amber-600 dark:text-amber-400" />}
          gradient="from-amber-500/10 to-yellow-500/10"
          trend="Awaiting approval"
        />
        <StatCard 
          title="Approved to Pay" 
          value={stats.approvedRequests ?? 0} 
          icon={<CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
          gradient="from-blue-500/10 to-indigo-500/10"
          trend="Action required"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <Card className="lg:col-span-2 shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl">Your Buying Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px' }} />
                    <Bar dataKey="value" fill="#8884d8" radius={[10, 10, 0, 0]}>
                      {chart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={
                            entry.name === 'Purchased' ? '#10b981' : 
                            entry.name === 'Approved' ? '#3b82f6' :
                            '#94a3b8'
                        } />
                      ))}
                    </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* CTA Card */}
        <Card className="shadow-lg border-none bg-linear-to-br from-primary to-secondary text-white flex flex-col justify-center">
            <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-md">
                    <Leaf className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-2">Find Fresh Crops</h3>
                    <p className="text-white/80">Explore thousands of fresh listings directly from farmers.</p>
                </div>
                <Button variant="secondary" size="lg" className="w-full font-bold shadow-xl" asChild>
                    <Link to="/all-crops">Browse Marketplace</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ==========================================
// 🛡️ ADMIN DASHBOARD
// ==========================================
function AdminDashboard({ enabled }) {
  const { data, isLoading, isError } = useAdminOverview(enabled);

  if (isLoading) return <DashboardHomeSkeleton cards={4} />;
  if (isError) return <div className="text-error">Failed to load admin overview.</div>;

  const stats = data?.stats || {};
  const chartData = [
    { name: "Active", value: stats.activeCrops ?? 0 },
    { name: "Hidden", value: stats.hiddenCrops ?? 0 },
    { name: "Requests", value: stats.pendingRequests ?? 0 },
    { name: "Deals", value: stats.acceptedDeals ?? 0 },
  ];

  return (
    <div className="space-y-8">
      {/* 4-Column Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Farmers" value={stats.totalFarmers ?? 0} icon={<Leaf className="text-success" />} />
        <StatCard title="Total Buyers" value={stats.totalBuyers ?? 0} icon={<Users className="text-info" />} />
        <StatCard title="Pending Approvals" value={stats.pendingRequests ?? 0} icon={<Activity className="text-(--color-warning)" />} />
        <StatCard title="Completed Deals" value={stats.acceptedDeals ?? 0} icon={<TrendingUp className="text-(--color-primary)" />} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle>Platform Health</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} layout="vertical" margin={{ left: -20 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} />
                            <Tooltip cursor={{fill: 'transparent'}} />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                                <Cell fill="#22c55e" />
                                <Cell fill="#64748b" />
                                <Cell fill="#f97316" />
                                <Cell fill="#3b82f6" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                 </div>
            </CardContent>
        </Card>
        
        {/* Admin Quick Links */}
        <div className="grid grid-cols-1 gap-4">
             <Button variant="outline" className="h-full flex flex-col items-center justify-center gap-2 p-6 hover:bg-base-200 dark:hover:bg-base-300 dark:hover:text-black " asChild>
                <Link to="/dashboard/admin/users">
                    <Users className="w-8 h-8 opacity-50" />
                    <span className="text-lg font-semibold">Manage Users</span>
                </Link>
             </Button>
             <Button variant="outline" className="h-full flex flex-col items-center justify-center gap-2 p-6 hover:bg-base-200 dark:hover:bg-base-300 dark:hover:text-black" asChild>
                <Link to="/dashboard/admin/crops">
                    <Leaf className="w-8 h-8 opacity-50" />
                    <span className="text-lg font-semibold">Moderate Crops</span>
                </Link>
             </Button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 🧩 REUSABLE STAT CARD
// ==========================================
function StatCard({ title, value, icon, gradient = "from-background to-background", trend, suffix = "" }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
      <Card className={`border-none shadow-lg ${gradient} backdrop-blur-sm relative overflow-hidden`}>
        <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 transform translate-x-2 -translate-y-2">
            {icon}
        </div>
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-base-200 rounded-lg shadow-sm backdrop-blur-md">
                {icon}
            </div>
            {trend && <span className="text-xs font-medium px-2 py-1 bg-base-200 rounded-full text-base-content/70">{trend}</span>}
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-base-content/60 dark:text-white">{title}</h3>
            <p className="text-3xl font-bold tracking-tight text-base-content dark:text-white">
                {value}<span className="text-lg text-base-content/60 font-medium">{suffix}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
