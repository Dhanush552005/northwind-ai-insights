import { useEffect, useState } from "react";
import { getDashboardData } from "../api";
import StatCard from "../components/StatCard";
import { RefreshCw, AlertCircle } from "lucide-react";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getDashboardData();
      setDashboard(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-800 animate-pulse">
      <div className="w-12 h-12 bg-slate-700 rounded-xl mb-4"></div>
      <div className="h-4 bg-slate-700 rounded w-24 mb-3"></div>
      <div className="h-8 bg-slate-700 rounded w-16"></div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
              Dashboard
            </h1>
            <p className="text-slate-400 text-lg">
              Real-time insights from Northwind business database
            </p>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="mt-2 p-2 sm:p-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 transition-all duration-300 flex items-center gap-2 text-slate-300 hover:text-white whitespace-nowrap"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 sm:p-6 rounded-xl flex gap-4 items-start">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Unable to Load Data</h3>
            <p className="text-red-200/80 text-sm">
              {error === "Failed to fetch dashboard data"
                ? "Backend/database is not ready yet. Please ensure Northwind database is imported."
                : error}
            </p>
            <button
              onClick={fetchData}
              className="mt-3 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 rounded-lg text-red-200 font-medium transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : dashboard ? (
          <>
            <StatCard title="Total Customers" value={dashboard.total_customers} />
            <StatCard title="Total Orders" value={dashboard.total_orders} />
            <StatCard title="Total Products" value={dashboard.total_products} />
          </>
        ) : null}
      </div>

      {/* Empty State */}
      {!loading && !error && !dashboard && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No data available</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;