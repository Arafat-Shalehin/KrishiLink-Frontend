import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxios";
import { toast } from "react-toastify";
import { 
  ShoppingBag, 
  CheckCircle, 
  Package, 
  Calendar, 
  MapPin,
  User,
  CreditCard,
  FileText
} from "lucide-react";
import { Link } from "react-router";

const BuyerPurchases = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPurchases = async () => {
      setLoading(true);
      try {
        // Fetch interests that have been paid
        const res = await axiosSecure.get("/myInterests");
        const allInterests = res.data.interests || [];
        
        // Filter only paid purchases
        const paidPurchases = allInterests.filter(
          (interest) => interest.paymentStatus === "paid"
        );
        
        setPurchases(paidPurchases);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load purchases!");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user, axiosSecure]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-48 bg-(--color-border) rounded animate-pulse"></div>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-(--color-surface) border border-(--color-border) rounded-2xl p-6 animate-pulse">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-(--color-border) rounded-xl"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 w-3/4 bg-(--color-border) rounded"></div>
                <div className="h-4 w-1/2 bg-(--color-border) rounded"></div>
                <div className="h-4 w-1/4 bg-(--color-border) rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-(--color-text)">
            My <span className="text-(--color-primary)">Purchases</span>
          </h1>
          <p className="mt-1 text-(--color-muted)">
            Crops you've successfully purchased
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-(--color-surface) border border-(--color-border) rounded-xl">
          <ShoppingBag className="w-5 h-5 text-(--color-primary)" />
          <span className="font-semibold text-(--color-text)">{purchases.length} items</span>
        </div>
      </div>

      {/* Empty State */}
      {purchases.length === 0 ? (
        <div className="bg-(--color-surface) border border-(--color-border) rounded-3xl p-12 text-center">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-(--color-text) mb-2">No Purchases Yet</h2>
          <p className="text-(--color-muted) mb-6 max-w-md mx-auto">
            You haven't completed any purchases yet. Browse crops and start buying from local farmers!
          </p>
          <Link
            to="/all-crops"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
          >
            <Package className="w-5 h-5" />
            Browse Crops
          </Link>
        </div>
      ) : (
        /* Purchases Grid */
        <div className="grid gap-6">
          {purchases.map((purchase) => (
            <div
              key={purchase._id}
              className="bg-(--color-surface) border border-(--color-border) rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-48 h-48 md:h-auto relative">
                  <img
                    src={purchase.cropImage || "https://www.shutterstock.com/image-vector/crop-picture-icon-image-260nw-2224993981.jpg"}
                    alt={purchase.cropName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                      <CheckCircle className="w-3 h-3" />
                      Purchased
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-(--color-text)">
                        {purchase.cropName}
                      </h3>
                      <p className="text-sm text-(--color-muted) mt-1">
                        {purchase.cropType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-(--color-primary)">
                        ৳{((purchase.quantity || 0) * (purchase.cropPrice || 0)).toLocaleString()}
                      </p>
                      <p className="text-sm text-(--color-muted)">
                        {purchase.quantity} × ৳{purchase.cropPrice}
                      </p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-(--color-border)">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-(--color-muted)" />
                      <div>
                        <p className="text-xs text-(--color-muted)">Seller</p>
                        <p className="text-sm font-medium text-(--color-text)">
                          {purchase.ownerName || "Unknown"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-(--color-muted)" />
                      <div>
                        <p className="text-xs text-(--color-muted)">Location</p>
                        <p className="text-sm font-medium text-(--color-text)">
                          {purchase.cropLocation || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-(--color-muted)" />
                      <div>
                        <p className="text-xs text-(--color-muted)">Quantity</p>
                        <p className="text-sm font-medium text-(--color-text)">
                          {purchase.quantity} units
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-(--color-muted)" />
                      <div>
                        <p className="text-xs text-(--color-muted)">Date</p>
                        <p className="text-sm font-medium text-(--color-text)">
                          {new Date(purchase.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Transaction ID */}
                  {purchase.transactionId && (
                    <div className="mt-4 pt-4 border-t border-(--color-border) flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-(--color-muted)" />
                      <span className="text-xs text-(--color-muted)">Transaction:</span>
                      <code className="text-xs font-mono bg-(--color-bg) px-2 py-1 rounded text-(--color-text)">
                        {purchase.transactionId}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerPurchases;
