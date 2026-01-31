import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxios";
import Loader from "../../Components/Loader";

const FarmerDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/dashboard/farmer");
        setData(res.data.dashboard);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [axiosSecure]);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold">
        Farmer <span className="text-(--color-primary)">Overview</span>
      </h1>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card title="Crops" value={data?.totalCrops || 0} />
        <Card title="Received" value={data?.totalReceivedInterests || 0} />
        <Card title="Pending" value={data?.pendingReceivedInterests || 0} />
        <Card title="Deals" value={data?.acceptedDeals || 0} />
        <Card title="Rejected" value={data?.rejectedReceivedInterests || 0} />
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="rounded-2xl border border-(--color-border) bg-(--color-bg) p-4">
    <p className="text-xs font-semibold text-(--color-muted)">{title}</p>
    <p className="mt-2 text-2xl font-extrabold text-(--color-text)">{value}</p>
  </div>
);

export default FarmerDashboard;
