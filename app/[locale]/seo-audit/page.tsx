"use client";

import { useState, useEffect } from "react";

interface AuditSummary {
  generated: string;
  summary: {
    total: number;
    index: number;
    noindex: number;
    reduction: string;
    byLocale: Record<string, { index: number; noindex: number }>;
    byType: Record<string, { index: number; noindex: number }>;
  };
  instructions: Record<string, string>;
  entries: {
    url: string;
    locale: string;
    type: string;
    index: boolean;
    tier: string;
    reason: string;
    priority: number;
  }[];
  note?: string;
}

export default function SeoAuditPage() {
  const [data, setData] = useState<AuditSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"summary" | "index" | "noindex">("summary");

  useEffect(() => {
    fetch("/api/seo-audit")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-[#d4c5a0] text-lg">Generating SEO audit...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-red-400 text-lg">Failed to load audit data</div>
      </div>
    );
  }

  const { summary, instructions } = data;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8dcc8] p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#d4c5a0] mb-2">
            SEO Audit Report
          </h1>
          <p className="text-[#a09880] text-sm">
            Generated: {new Date(data.generated).toLocaleString()}
          </p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1a1a1a] border border-[#2a2520] rounded-lg p-6">
            <div className="text-sm text-[#a09880] mb-1">Total Pages</div>
            <div className="text-3xl font-bold text-[#e8dcc8]">
              {summary.total.toLocaleString()}
            </div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a5520] rounded-lg p-6">
            <div className="text-sm text-green-400 mb-1">INDEX</div>
            <div className="text-3xl font-bold text-green-300">
              {summary.index.toLocaleString()}
            </div>
            <div className="text-xs text-[#a09880] mt-1">
              {((summary.index / summary.total) * 100).toFixed(1)}% of total
            </div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#552520] rounded-lg p-6">
            <div className="text-sm text-red-400 mb-1">NOINDEX</div>
            <div className="text-3xl font-bold text-red-300">
              {summary.noindex.toLocaleString()}
            </div>
            <div className="text-xs text-[#a09880] mt-1">{summary.reduction}</div>
          </div>
        </div>

        {/* Breakdown by Type */}
        <div className="bg-[#1a1a1a] border border-[#2a2520] rounded-lg p-6 mb-8">
          <h2 className="text-lg font-serif font-bold text-[#d4c5a0] mb-4">
            By Page Type
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2a2520]">
                  <th className="text-left py-2 px-3 text-[#a09880]">Type</th>
                  <th className="text-right py-2 px-3 text-green-400">INDEX</th>
                  <th className="text-right py-2 px-3 text-red-400">NOINDEX</th>
                  <th className="text-right py-2 px-3 text-[#a09880]">Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(summary.byType).map(([type, counts]) => (
                  <tr key={type} className="border-b border-[#1f1f1f]">
                    <td className="py-2 px-3 font-mono text-xs">{type}</td>
                    <td className="py-2 px-3 text-right text-green-300">
                      {counts.index.toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-right text-red-300">
                      {counts.noindex.toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-right text-[#a09880]">
                      {(counts.index + counts.noindex).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Breakdown by Locale */}
        <div className="bg-[#1a1a1a] border border-[#2a2520] rounded-lg p-6 mb-8">
          <h2 className="text-lg font-serif font-bold text-[#d4c5a0] mb-4">
            By Locale
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(summary.byLocale).map(([loc, counts]) => (
              <div
                key={loc}
                className="bg-[#0a0a0a] border border-[#2a2520] rounded-lg p-3"
              >
                <div className="text-xs text-[#a09880] font-mono mb-1">
                  /{loc}
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-green-300">{counts.index} idx</span>
                  <span className="text-red-300">{counts.noindex} no</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Actions */}
        <div className="bg-[#1a1a1a] border border-[#2a2520] rounded-lg p-6 mb-8">
          <h2 className="text-lg font-serif font-bold text-[#d4c5a0] mb-4">
            Download Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/api/seo-audit?format=csv&filter=index"
              className="block bg-green-900/30 border border-green-800/50 rounded-lg p-4 hover:bg-green-900/50 transition-colors"
            >
              <div className="text-green-300 font-medium mb-1">
                INDEX URLs (CSV)
              </div>
              <div className="text-xs text-[#a09880]">
                {summary.index} URLs to submit in sitemap. Send to Google Search Console.
              </div>
            </a>
            <a
              href="/api/seo-audit?format=csv&filter=noindex"
              className="block bg-red-900/30 border border-red-800/50 rounded-lg p-4 hover:bg-red-900/50 transition-colors"
            >
              <div className="text-red-300 font-medium mb-1">
                NOINDEX URLs (CSV)
              </div>
              <div className="text-xs text-[#a09880]">
                {summary.noindex.toLocaleString()} thin content URLs marked noindex. For audit only.
              </div>
            </a>
            <a
              href="/api/seo-audit?format=txt&filter=noindex"
              className="block bg-[#0a0a0a] border border-[#2a2520] rounded-lg p-4 hover:bg-[#151515] transition-colors"
            >
              <div className="text-[#d4c5a0] font-medium mb-1">
                NOINDEX URL List (TXT)
              </div>
              <div className="text-xs text-[#a09880]">
                Plain text list for GSC URL Removal Tool
              </div>
            </a>
            <a
              href="/api/seo-audit?format=csv"
              className="block bg-[#0a0a0a] border border-[#2a2520] rounded-lg p-4 hover:bg-[#151515] transition-colors"
            >
              <div className="text-[#d4c5a0] font-medium mb-1">
                Full Audit (CSV)
              </div>
              <div className="text-xs text-[#a09880]">
                Complete spreadsheet with all {summary.total.toLocaleString()} URLs and classification
              </div>
            </a>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-[#1a1a1a] border border-[#2a2520] rounded-lg p-6 mb-8">
          <h2 className="text-lg font-serif font-bold text-[#d4c5a0] mb-4">
            What To Do
          </h2>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="text-[#d4c5a0] font-bold shrink-0">1.</span>
              <span>
                <strong className="text-[#d4c5a0]">Submit sitemap:</strong>{" "}
                Go to Google Search Console and submit{" "}
                <code className="bg-[#0a0a0a] px-1.5 py-0.5 rounded text-xs">
                  {instructions.sitemap?.split("submit ONLY ")[1] || `${BASE_URL}/sitemap.xml`}
                </code>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#d4c5a0] font-bold shrink-0">2.</span>
              <span>
                <strong className="text-[#d4c5a0]">Noindex is automatic:</strong>{" "}
                Thin content pages already have{" "}
                <code className="bg-[#0a0a0a] px-1.5 py-0.5 rounded text-xs">
                  {"<meta name='robots' content='noindex, follow'>"}
                </code>{" "}
                in their HTML. No extra action needed.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#d4c5a0] font-bold shrink-0">3.</span>
              <span>
                <strong className="text-[#d4c5a0]">Optional cleanup:</strong>{" "}
                Download the NOINDEX TXT file and use Google Search Console URL Removal
                tool to request faster de-indexing of previously indexed thin pages.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#d4c5a0] font-bold shrink-0">4.</span>
              <span>
                <strong className="text-[#d4c5a0]">Monitor:</strong>{" "}
                Check GSC Coverage report over the next 2-4 weeks to confirm thin pages
                drop out of the index.
              </span>
            </li>
          </ol>
        </div>

        {/* Sample entries */}
        <div className="bg-[#1a1a1a] border border-[#2a2520] rounded-lg p-6">
          <div className="flex gap-3 mb-4">
            <h2 className="text-lg font-serif font-bold text-[#d4c5a0]">
              Sample URLs
            </h2>
            <div className="flex gap-2 ml-auto">
              {(["summary", "index", "noindex"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    activeTab === tab
                      ? tab === "index"
                        ? "bg-green-900/50 border-green-700 text-green-300"
                        : tab === "noindex"
                          ? "bg-red-900/50 border-red-700 text-red-300"
                          : "bg-[#2a2520] border-[#3a3530] text-[#d4c5a0]"
                      : "border-[#2a2520] text-[#a09880] hover:border-[#3a3530]"
                  }`}
                >
                  {tab === "summary" ? "All" : tab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-[#1a1a1a]">
                <tr className="border-b border-[#2a2520]">
                  <th className="text-left py-2 px-2 text-[#a09880]">URL</th>
                  <th className="text-left py-2 px-2 text-[#a09880]">Type</th>
                  <th className="text-center py-2 px-2 text-[#a09880]">Index</th>
                  <th className="text-left py-2 px-2 text-[#a09880]">Reason</th>
                </tr>
              </thead>
              <tbody>
                {data.entries
                  .filter((e) =>
                    activeTab === "index"
                      ? e.index
                      : activeTab === "noindex"
                        ? !e.index
                        : true
                  )
                  .slice(0, 50)
                  .map((entry, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#1f1f1f] hover:bg-[#151515]"
                    >
                      <td className="py-1.5 px-2 font-mono truncate max-w-xs">
                        {entry.url.replace(BASE_URL, "")}
                      </td>
                      <td className="py-1.5 px-2 text-[#a09880]">{entry.type}</td>
                      <td className="py-1.5 px-2 text-center">
                        {entry.index ? (
                          <span className="text-green-400">YES</span>
                        ) : (
                          <span className="text-red-400">NO</span>
                        )}
                      </td>
                      <td className="py-1.5 px-2 text-[#a09880] truncate max-w-xs">
                        {entry.reason}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {data.note && (
            <p className="text-xs text-[#a09880] mt-3 italic">{data.note}</p>
          )}
        </div>
      </div>
    </div>
  );
}
