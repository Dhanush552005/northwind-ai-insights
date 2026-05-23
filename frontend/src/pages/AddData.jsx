import { useState } from "react";
import { Loader, CheckCircle, AlertCircle, Database, Shield } from "lucide-react";
import { addCustomer } from "../api";

function AddData() {
  const [form, setForm] = useState({
    customer_id: "",
    company_name: "",
    contact_name: "",
    city: "",
    country: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const data = await addCustomer(form);
      setMessage(data.message);

      setForm({
        customer_id: "",
        company_name: "",
        contact_name: "",
        city: "",
        country: "",
        phone: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Add Data
          </h1>
          <p className="text-slate-400 text-lg">
            Add new customer records into the Northwind database
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Card */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-8">
              <Database className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                Add New Customer
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Grid for form fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Customer ID */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Customer ID <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="customer_id"
                    value={form.customer_id}
                    onChange={handleChange}
                    placeholder="e.g., TEST2"
                    required
                    maxLength="5"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                  <p className="text-xs text-slate-500">Maximum 5 characters</p>
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Company Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="company_name"
                    value={form.company_name}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Contact Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Contact Name
                  </label>
                  <input
                    name="contact_name"
                    value={form.contact_name}
                    onChange={handleChange}
                    placeholder="Enter contact name"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    City
                  </label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Country
                  </label>
                  <input
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Enter country"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Adding Customer...
                  </>
                ) : (
                  "Add Customer"
                )}
              </button>
            </form>

            {/* Success Message */}
            {message && (
              <div className="mt-6 bg-green-500/10 border border-green-500/50 text-green-200 p-4 sm:p-5 rounded-xl flex gap-3 items-start animate-in fade-in slide-in-from-top-4 duration-300">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
                <div className="flex-1">
                  <p className="font-semibold text-green-100 text-sm">{message}</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 bg-red-500/10 border border-red-500/50 text-red-200 p-4 sm:p-5 rounded-xl flex gap-3 items-start animate-in fade-in slide-in-from-top-4 duration-300">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
                <div className="flex-1">
                  <p className="font-semibold text-red-100 text-sm">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Card - Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-800/50 rounded-2xl p-6 sticky top-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Data Security</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  This form uses <span className="text-blue-300 font-medium">FastAPI validation</span> to ensure data integrity and security.
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 space-y-2">
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  Required Fields
                </p>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Customer ID (5 chars max)</li>
                  <li>• Company Name</li>
                </ul>
              </div>
              <p className="text-xs text-slate-500 italic">
                All data is validated and safely inserted into the Northwind database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddData;