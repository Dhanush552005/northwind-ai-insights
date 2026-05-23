import { Users, ShoppingCart, Package } from "lucide-react";

function StatCard({ title, value }) {
  // Icon mapping based on title
  const iconMap = {
    "Total Customers": { Icon: Users, gradient: "from-blue-500 to-blue-600" },
    "Total Orders": { Icon: ShoppingCart, gradient: "from-emerald-500 to-emerald-600" },
    "Total Products": { Icon: Package, gradient: "from-purple-500 to-purple-600" },
  };

  const iconConfig = iconMap[title] || { Icon: Package, gradient: "from-slate-500 to-slate-600" };
  const { Icon, gradient } = iconConfig;

  return (
    <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
      {/* Gradient icon background */}
      <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
      </div>

      {/* Content */}
      <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
      <h2 className="text-4xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
        {value?.toLocaleString?.() || value}
      </h2>
    </div>
  );
}

export default StatCard;