"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Logo from "@/components/Logo";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, contacted: 0, qualified: 0 });

  const correctPasscode = "admin123";

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === correctPasscode) {
      setIsAuthenticated(true);
      fetchSubmissions();
    } else {
      alert("Invalid Passcode key.");
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setSubmissions(data || []);
      calculateStats(data || []);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const pending = data.filter((s) => s.status === "pending" || !s.status).length;
    const contacted = data.filter((s) => s.status === "contacted").length;
    const qualified = data.filter((s) => s.status === "qualified").length;

    setStats({ total, pending, contacted, qualified });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from("submissions")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      const updated = submissions.map((s) =>
        s.id === id ? { ...s, status: newStatus } : s
      );
      setSubmissions(updated);
      calculateStats(updated);
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this lead record?")) return;

    try {
      const { error } = await supabase
        .from("submissions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      const updated = submissions.filter((s) => s.id !== id);
      setSubmissions(updated);
      calculateStats(updated);
    } catch (err) {
      alert("Failed to delete record: " + err.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4F7F6] flex flex-col justify-center items-center px-6 font-sans">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100/20 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="mb-8 flex items-center gap-3">
          <Logo size={40} />
          <span className="font-syne text-2xl font-extrabold tracking-tight">Ads<span className="text-[#E53935]">Growly</span></span>
        </div>

        <div className="glass p-8 rounded-3xl w-full max-w-sm border-white/80 shadow-glass bg-white/40 backdrop-blur-md">
          <h2 className="text-xl font-syne font-bold mb-2 text-center text-slate-800">ADMIN CONTROL HUB</h2>
          <p className="text-xs text-slate-400 text-center mb-6 font-mono tracking-widest uppercase">Security Clearance Required</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2 font-bold">Passcode Key</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode (admin123)"
                className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3 text-sm font-semibold shadow-soft outline-none focus:ring-4 focus:ring-blue-100 transition-all text-center"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#111111] hover:bg-slate-800 text-white font-syne font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md"
            >
              Unlock Terminal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-[#111111] font-sans pb-16">
      <nav className="w-full z-50 px-6 md:px-10 py-6 flex justify-between items-center bg-white/30 backdrop-blur-md border-b border-slate-200/50">
        <div className="flex items-center gap-3">
          <Logo size={36} />
          <span className="font-syne text-xl font-bold tracking-tight">AdsGrowly <span className="text-xs font-mono text-[#E53935] uppercase font-bold tracking-widest ml-1">Admin Panel</span></span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-500 hover:text-slate-900 border border-slate-200 bg-white/60 px-4 py-2 rounded-xl transition-all">
            Back to Site
          </Link>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition-all"
          >
            Lock
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-10">
        {/* Statistics Panels */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="glass p-6 rounded-2xl border-white/60 shadow-soft bg-white/40">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Total Submissions</span>
            <div className="text-3xl font-syne font-black text-slate-800">{stats.total}</div>
          </div>
          <div className="glass p-6 rounded-2xl border-white/60 shadow-soft bg-white/40">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Pending Review</span>
            <div className="text-3xl font-syne font-black text-[#1E88E5]">{stats.pending}</div>
          </div>
          <div className="glass p-6 rounded-2xl border-white/60 shadow-soft bg-white/40">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Contacted</span>
            <div className="text-3xl font-syne font-black text-amber-500">{stats.contacted}</div>
          </div>
          <div className="glass p-6 rounded-2xl border-white/60 shadow-soft bg-white/40">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Qualified Leaders</span>
            <div className="text-3xl font-syne font-black text-green-500">{stats.qualified}</div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="glass rounded-[2rem] border-white/60 shadow-glass overflow-hidden bg-white/30 backdrop-blur-md">
          <div className="px-8 py-5 bg-white/40 border-b border-slate-200/50 flex justify-between items-center">
            <h3 className="font-syne text-lg font-bold">Leads Registry</h3>
            <button
              onClick={fetchSubmissions}
              className="text-xs font-mono font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5"
            >
              <i className="ti ti-rotate text-sm" /> Refresh Node
            </button>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-20">
                <i className="ti ti-loader text-3xl text-[#E53935] animate-spin mb-4 block" />
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Querying database rows...</span>
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">No lead records found.</span>
              </div>
            ) : (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/50 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-200/50">
                    <th className="px-6 py-4 font-bold">Business Name</th>
                    <th className="px-6 py-4 font-bold">Commander Info</th>
                    <th className="px-6 py-4 font-bold">Ad Budget</th>
                    <th className="px-6 py-4 font-bold">GMB Status</th>
                    <th className="px-6 py-4 font-bold">Date Received</th>
                    <th className="px-6 py-4 font-bold">Status Action</th>
                    <th className="px-6 py-4 font-bold text-right">Operation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/40">
                  {submissions.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800 text-sm">{lead.business_name}</div>
                        {lead.website_url && (
                          <a href={lead.website_url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline">
                            {lead.website_url}
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-700">{lead.contact_name}</div>
                        <div className="text-slate-400">{lead.contact_email}</div>
                        {lead.phone && <div className="text-slate-400 font-mono">{lead.phone}</div>}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-600 font-mono capitalize">
                        {lead.ad_budget || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${lead.gmb_status === "yes" ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-600"}`}>
                          GMB: {lead.gmb_status || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-mono">
                        {new Date(lead.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={lead.status || "pending"}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="bg-white border border-slate-200 rounded px-3 py-1 font-bold text-slate-700 outline-none focus:border-blue-500 shadow-sm cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="closed">Closed / Deal</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="text-red-500 hover:text-red-700 font-bold px-2 py-1"
                          title="Delete Lead"
                        >
                          <i className="ti ti-trash text-base" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
