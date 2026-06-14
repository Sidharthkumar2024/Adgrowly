"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function ShowcaseHub() {
  const [sandboxActive, setSandboxActive] = useState(false);
  const [activeTheme, setActiveTheme] = useState("/"); // Default is the Master Page (homepage)
  const [viewport, setViewport] = useState("desktop"); // desktop, tablet, mobile

  const themes = [
    {
      id: "/",
      name: "Glassmorphic Polish",
      variant: "Variant 02",
      color: "#1E88E5",
      icon: "ti-brand-google-filled",
      bgColorClass: "bg-[#1E88E5]/10",
      description: "Clean bento layout with soft drop shadows and blue highlights. Includes an interactive ROI calculator and responsive padding structures."
    },
    {
      id: "/aurora",
      name: "Aurora Data Flow",
      variant: "Variant 01",
      color: "#E53935",
      icon: "ti-brand-meta",
      bgColorClass: "bg-[#E53935]/10",
      description: "Light glass-aesthetic with dynamic data flow path lines. Features interactive SVG node structures and responsive layouts."
    },
    {
      id: "/tech",
      name: "Tech Command Center",
      variant: "Variant 03",
      color: "#E53935",
      icon: "ti-terminal-2",
      bgColorClass: "bg-[#E53935]/10",
      description: "Tactical light UI focusing on radar loops and live grid networks. Deploys a live command line console and scales responsively."
    },
    {
      id: "/openai",
      name: "OpenAI Ads Engine",
      variant: "Variant 04",
      color: "#1E88E5",
      icon: "ti-cpu",
      bgColorClass: "bg-[#1E88E5]/10",
      description: "Cutting-edge AI automation layout. Features light-grey backgrounds, red/blue highlights, and an interactive AI Ad Copywriter simulator."
    }
  ];

  const launchSandbox = (themePath) => {
    setActiveTheme(themePath);
    setViewport("desktop");
    setSandboxActive(true);
  };

  const closeSandbox = () => {
    setSandboxActive(false);
  };

  const getThemeName = (path) => {
    const theme = themes.find((t) => t.id === path);
    return theme ? theme.name : "Glassmorphic Polish";
  };

  const getThemeColor = (path) => {
    const theme = themes.find((t) => t.id === path);
    return theme ? theme.color : "#1E88E5";
  };

  return (
    <div className="relative min-h-screen bg-[#F4F7F6] text-[#111111] font-sans selection:bg-[#E53935] selection:text-white">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-red-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* DASHBOARD */}
      <main className={`max-w-7xl mx-auto px-6 py-12 relative z-10 transition-all duration-500 ${sandboxActive ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <div className="flex flex-col">
              <span className="font-syne text-lg tracking-tighter text-[#111111] leading-none font-bold">ADS GROWLY</span>
              <span className="font-mono text-[8px] text-slate-500 uppercase tracking-[0.35em] mt-1">Design System Hub</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xs font-semibold text-slate-600 hover:text-slate-900 font-mono">
              Back to Home
            </Link>
            <span className="px-3 py-1 bg-[#E53935]/10 border border-[#E53935]/20 rounded-full font-mono text-[9px] text-[#E53935] font-bold">V4.0 LIVE</span>
          </div>
        </header>

        <section className="max-w-4xl mb-16">
          <span className="text-[#E53935] font-mono text-xs uppercase tracking-[0.3em] mb-4 block font-bold">Design Showdown</span>
          <h1 className="font-syne text-4xl md:text-7xl font-extrabold tracking-tighter leading-none mb-6">
            FOUR VISIONS.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E53935] to-[#1E88E5]">UNIFIED DOMINANCE.</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
            Ads Growly engineers hyper-targeted traffic pipelines for Canada's service leaders. Explore our optimized UI layouts, built with precise typography, responsive grids, and immersive styles.
          </p>
        </section>

        {/* Theme Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className="glass p-8 rounded-[2rem] flex flex-col justify-between hover:border-slate-300 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group shadow-soft"
            >
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div className={`w-12 h-12 rounded-xl ${theme.bgColorClass} flex items-center justify-center`} style={{ color: theme.color }}>
                    <i className={`ti ${theme.icon} text-2xl`} />
                  </div>
                  <span className="font-mono text-[10px] font-bold" style={{ color: theme.color }}>
                    {theme.variant}
                  </span>
                </div>
                <h3 className="font-syne text-2xl font-bold mb-3 text-[#111111] group-hover:text-opacity-80 transition-colors">
                  {theme.name}
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 font-medium">
                  {theme.description}
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 rounded-md font-mono text-[9px] text-slate-500 font-bold">#F4F7F6</span>
                  <span className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 rounded-md font-mono text-[9px] text-slate-500 font-bold">#E53935</span>
                  <span className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 rounded-md font-mono text-[9px] text-slate-500 font-bold">#1E88E5</span>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => launchSandbox(theme.id)}
                    className="flex-1 py-3 bg-[#111111] text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-all uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    Enter Sandbox <i className="ti ti-external-link" />
                  </button>
                  <a
                    href={theme.id}
                    target="_blank"
                    className="w-12 h-12 bg-white/60 border border-slate-200 flex items-center justify-center rounded-xl hover:bg-white transition-colors text-slate-600"
                  >
                    <i className="ti ti-eye text-lg" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Specifications */}
        <section className="glass p-8 rounded-[2rem] shadow-soft">
          <h4 className="font-syne text-lg mb-4 text-[#111111] font-bold">Design Architecture Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs md:text-sm text-slate-600 font-medium">
            <div className="space-y-1">
              <div className="text-[#E53935] font-bold"><i className="ti ti-devices" /> Responsive Widths</div>
              <p className="text-[11px] text-slate-400">Centered container grids and balanced spacing for absolute stability.</p>
            </div>
            <div className="space-y-1">
              <div className="text-[#1E88E5] font-bold"><i className="ti ti-brand-openai" /> Interactive Elements</div>
              <p className="text-[11px] text-slate-400">Full React conversions for Geogrid scan widgets, ROI sliders, and terminal engines.</p>
            </div>
            <div className="space-y-1">
              <div className="text-[#E53935] font-bold"><i className="ti ti-database" /> Lead Management</div>
              <p className="text-[11px] text-slate-400">Connected to a live Supabase SQL instance to save lead requests instantaneously.</p>
            </div>
            <div className="space-y-1">
              <div className="text-[#1E88E5] font-bold"><i className="ti ti-shield-check" /> Clean Codebase</div>
              <p className="text-[11px] text-slate-400">Next.js App Router structure built for fast loads and flawless Vercel builds.</p>
            </div>
          </div>
        </section>
      </main>

      {/* FULLSCREEN SANDBOX VIEWPORT SIMULATOR */}
      {sandboxActive && (
        <div className="fixed inset-0 bg-[#F4F7F6] z-50 flex flex-col animate-fadeIn">
          {/* Header */}
          <div className="bg-white/60 backdrop-blur-md border-b border-slate-200/50 px-6 py-4 flex flex-wrap justify-between items-center gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <button
                onClick={closeSandbox}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors text-xs font-mono tracking-widest text-slate-600 uppercase font-bold"
              >
                ← Hub
              </button>
              <div className="h-6 w-px bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className="font-syne text-sm font-bold tracking-tight text-slate-800">Design Sandbox:</span>
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest mt-0.5" style={{ color: getThemeColor(activeTheme) }}>
                  {getThemeName(activeTheme)}
                </span>
              </div>
            </div>

            {/* Viewport Selectors */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewport("desktop")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  viewport === "desktop" ? "bg-[#E53935] text-white shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                }`}
              >
                <i className="ti ti-device-desktop" /> Desktop
              </button>
              <button
                onClick={() => setViewport("tablet")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  viewport === "tablet" ? "bg-[#E53935] text-white shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                }`}
              >
                <i className="ti ti-device-tablet" /> Tablet
              </button>
              <button
                onClick={() => setViewport("mobile")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  viewport === "mobile" ? "bg-[#E53935] text-white shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                }`}
              >
                <i className="ti ti-device-mobile" /> Mobile
              </button>
            </div>

            {/* Switcher Select */}
            <div className="flex items-center gap-3">
              <select
                value={activeTheme}
                onChange={(e) => setActiveTheme(e.target.value)}
                className="bg-white border border-slate-200 text-xs font-mono font-bold rounded-lg px-4 py-2 text-slate-800 outline-none cursor-pointer focus:border-[#E53935] shadow-sm"
              >
                <option value="/">Glassmorphic Polish</option>
                <option value="/aurora">Aurora Data Flow</option>
                <option value="/tech">Tech Command Center</option>
                <option value="/openai">OpenAI Ads Engine</option>
              </select>
              <a
                href={activeTheme}
                target="_blank"
                className="w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center transition-colors text-slate-600 shadow-sm"
                title="Open in New Tab"
              >
                <i className="ti ti-external-link" />
              </a>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-4 md:p-8 bg-slate-200/40">
            <div
              className={`iframe-container shadow-2xl relative bg-white transition-all duration-300 ${
                viewport === "desktop"
                  ? "w-full h-full border-[12px] border-slate-900 rounded-2xl border-b-[30px]"
                  : viewport === "tablet"
                  ? "w-[768px] h-[1024px] border-[16px] border-slate-900 rounded-[24px]"
                  : "w-[375px] h-[812px] border-[16px] border-slate-900 rounded-[36px]"
              }`}
            >
              <iframe src={activeTheme} className="w-full h-full border-none" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
