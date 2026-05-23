import { useState } from "react";
import { Loader, Copy, CheckCheck, AlertCircle, Zap } from "lucide-react";
import { askAI } from "../api";
function AiAssistant() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedSQL, setCopiedSQL] = useState(false);

  const sampleQuestions = [
    {
      title: "Top Products by Sales",
      description: "Show top 5 products by sales",
      icon: "📊",
    },
    {
      title: "Countries with Most Customers",
      description: "Which countries have the most customers?",
      icon: "🌍",
    },
    {
      title: "Top Customers",
      description: "Show top 5 customers by number of orders",
      icon: "👥",
    },
    {
      title: "Top Employees",
      description: "Which employees handled the most orders?",
      icon: "💼",
    },
  ];

async function handleAsk(queryText = question) {
  if (!queryText.trim()) return;

  setQuestion(queryText);
  setLoading(true);
  setResult(null);
  setError("");

  try {
    const data = await askAI(queryText);
    setResult(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result.sql);
      setCopiedSQL(true);
      setTimeout(() => setCopiedSQL(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const columns =
    result?.rows && result.rows.length > 0
      ? Object.keys(result.rows[0])
      : [];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            AI Assistant
          </h1>
          <p className="text-slate-400 text-lg">
            Ask natural language questions about Northwind business data
          </p>
        </div>
      </div>

      {/* Sample Questions Grid */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Quick Queries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sampleQuestions.map((q) => (
            <button
              key={q.description}
              onClick={() => handleAsk(q.description)}
              className="text-left bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 hover:border-slate-700 p-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 group"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {q.icon}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {q.title}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">{q.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-6 space-y-4">
        <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Your Question
        </label>
        <textarea
          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
          rows="4"
          placeholder="Example: Show top 5 products by sales..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.ctrlKey && question.trim()) {
              handleAsk();
            }
          }}
        />

        <button
          onClick={() => handleAsk()}
          disabled={loading || !question.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Ask AI</span>
            </>
          )}
        </button>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold mb-1">Error</p>
              <p className="text-red-200/80 text-sm mb-3">{error}</p>
              <button
                onClick={() => handleAsk()}
                className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 rounded-lg text-red-200 font-medium transition-colors text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* AI Summary */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
              <h3 className="text-xl font-semibold text-white">AI Summary</h3>
            </div>
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {result.summary}
            </p>
          </div>

          {/* Generated SQL */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                <h3 className="text-xl font-semibold text-white">Generated SQL</h3>
              </div>
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white transition-all flex items-center gap-2 text-sm whitespace-nowrap"
              >
                {copiedSQL ? (
                  <>
                    <CheckCheck className="w-4 h-4" />
                    <span className="hidden sm:inline">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto text-sm text-emerald-400 font-mono">
              {result.sql}
            </pre>
          </div>

          {/* Query Results Table */}
          {result.rows.length > 0 && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h3 className="text-xl font-semibold text-white">
                  Query Results ({result.rows.length} rows)
                </h3>
              </div>

              {/* Mobile scroll wrapper */}
              <div className="overflow-x-auto rounded-xl border border-slate-700">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-700">
                      {columns.map((col) => (
                        <th
                          key={col}
                          className="text-left px-4 py-3 text-slate-300 font-semibold whitespace-nowrap"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row, index) => (
                      <tr
                        key={index}
                        className={`border-b border-slate-800 transition-colors ${
                          index % 2 === 0
                            ? "bg-slate-900/50"
                            : "bg-slate-800/30"
                        } hover:bg-slate-800/50`}
                      >
                        {columns.map((col) => (
                          <td
                            key={col}
                            className="px-4 py-3 text-slate-300 whitespace-nowrap"
                          >
                            {typeof row[col] === "number"
                              ? row[col].toLocaleString("en-US", {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 2,
                                })
                              : row[col]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Empty Results State */}
          {result.rows.length === 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-2">
              <p className="text-slate-400 text-lg">No results found</p>
              <p className="text-slate-500 text-sm">
                Try rephrasing your question
              </p>
            </div>
          )}
        </div>
      )}

      {/* Initial Empty State */}
      {!result && !loading && !error && (
        <div className="text-center py-12 space-y-4">
          <p className="text-slate-400 text-lg">
            Select a quick query or ask your own question
          </p>
        </div>
      )}
    </div>
  );
}

export default AiAssistant;