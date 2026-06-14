"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { supabase } from "@/lib/supabase";

export default function TechPage() {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    { text: "// Local Presence Dominance active. Probing channels...", color: "text-slate-400" },
    { text: "NETWORK ALIGNED: Canadian Local Sectors in radius.", color: "text-[#E53935] font-bold" },
    { text: "Available commands: help, status, initialize, clear", color: "text-slate-300" }
  ]);
  const [waitingForEmail, setWaitingForEmail] = useState(false);
  const historyEndRef = useRef(null);

  useEffect(() => {
    if (historyEndRef.current) {
      historyEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory]);

  const handleTerminalSubmit = async (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    setTerminalInput("");
    if (!cmd) return;

    // Add command to history
    setTerminalHistory((prev) => [...prev, { text: `$ ${cmd}`, color: "text-[#E53935] font-bold" }]);

    if (waitingForEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(cmd)) {
        setTerminalHistory((prev) => [
          ...prev,
          { text: `[+] CONTACT VECTOR REGISTERED: <${cmd}>. Connecting to database nodes...`, color: "text-yellow-400" }
        ]);

        try {
          const { data, error } = await supabase
            .from("submissions")
            .insert([{
              business_name: "Tech Terminal Lead",
              contact_name: "Tech Commander",
              contact_email: cmd,
              ad_budget: "unspecified",
              gmb_status: "unspecified"
            }]);

          if (error) {
            throw error;
          }

          setTerminalHistory((prev) => [
            ...prev,
            { text: `[+] REGISTRATION SUCCESSFUL: Lead synced to Supabase database.`, color: "text-green-400 font-bold" },
            { text: `[+] Dominance systems are ready. Standby for target analysis...`, color: "text-[#E53935]" }
          ]);
        } catch (err) {
          console.error(err);
          setTerminalHistory((prev) => [
            ...prev,
            { text: `[-] ERROR: Secure link lost during database syncing.`, color: "text-red-400" }
          ]);
        }
        setWaitingForEmail(false);
      } else {
        setTerminalHistory((prev) => [
          ...prev,
          { text: `[-] INVALID NODE: Input must be a valid email structure. Re-enter:`, color: "text-red-400" }
        ]);
      }
      return;
    }

    const lowerCmd = cmd.toLowerCase();
    if (lowerCmd === "help") {
      setTerminalHistory((prev) => [
        ...prev,
        { text: "Available commands:", color: "text-slate-400" },
        { text: "  status      Probes Canadian grid indicators and budget stats.", color: "text-slate-300" },
        { text: "  initialize  Secure connection vector and register your domain.", color: "text-slate-300" },
        { text: "  help        Display this operations manual.", color: "text-slate-300" },
        { text: "  clear       Reset terminal console.", color: "text-slate-300" }
      ]);
    } else if (lowerCmd === "status") {
      setTerminalHistory((prev) => [
        ...prev,
        { text: "Probing GTA & national service grids...", color: "text-slate-500" }
      ]);

      setTimeout(() => {
        setTerminalHistory((prev) => [
          ...prev,
          { text: "--- COMMAND CENTER INDICATORS ---", color: "text-[#E53935] font-bold" },
          { text: "  Active Deployed: 120+ systems active", color: "text-slate-300" },
          { text: "  Managed CPL: CAD $18 (Meta Flow), $24 (Google Search)", color: "text-slate-300" },
          { text: "  Radius Dominated: GTA (50KM), Metro Vancouver, Calgary", color: "text-slate-300" },
          { text: "  Retention Index: 98.4% lock rate", color: "text-slate-300" },
          { text: "  System Health: 100% operational", color: "text-slate-300" }
        ]);
      }, 150);
    } else if (lowerCmd === "initialize") {
      setTerminalHistory((prev) => [
        ...prev,
        { text: "Initializing setup script...", color: "text-slate-400" },
        { text: "Enter your commander email to link local business territory:", color: "text-slate-300" }
      ]);
      setWaitingForEmail(true);
    } else if (lowerCmd === "clear") {
      setTerminalHistory([]);
    } else {
      setTerminalHistory((prev) => [
        ...prev,
        { text: `[-] COMMAND NOT FOUND: "${cmd}". Type "help" for operator instruction.`, color: "text-red-400" }
      ]);
    }
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#F4F7F6] text-[#111111] font-mono selection:bg-[#E53935] selection:text-white">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#E53935_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03] pointer-events-none" />

      {/* NAVIGATION */}
      <nav className="relative w-full z-50 px-6 md:px-10 py-6 flex justify-between items-center bg-white/30 backdrop-blur-md border-b border-slate-200/50">
        <div className="flex items-center gap-3">
          <Logo size={40} />
          <span className="font-syne text-xl md:text-2xl font-extrabold tracking-tight text-[#111111]">
            Ads<span className="text-[#E53935]">Growly</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-widest text-slate-600 font-bold">
          <Link href="/#toolkit" className="hover:text-[#E53935] transition-colors">Stack</Link>
          <Link href="/aurora" className="hover:text-[#E53935] transition-colors">Protocol</Link>
          <Link href="/#sectors" className="hover:text-[#E53935] transition-colors">Sectors</Link>
          <Link href="/#pricing" className="hover:text-[#E53935] transition-colors">Pricing</Link>
          <Link href="/showcase" className="px-5 py-2 border border-[#E53935] text-[#E53935] hover:bg-[#E53935]/10 rounded-xl transition-all font-bold">
            Showcase
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-[750px] flex items-center px-6 md:px-10 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,57,53,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E53935]/15 border border-[#E53935]/30 text-[#E53935] text-[10px] uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E53935] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E53935]" />
              </span>
              System Online: Toronto HQ
            </div>

            <h1 className="font-syne text-4xl md:text-7xl font-black leading-[0.95] mb-6 uppercase">
              Dominate <br />
              <span className="text-[#E53935] italic">Canadian</span> <br />
              Search & Social
            </h1>

            <p className="font-sans text-slate-300 text-base md:text-lg max-w-lg mb-10 leading-relaxed">
              Proprietary GMB, Google Ads, and Meta systems built specifically for high-ticket service brands targeting the Canadian market.
            </p>

            <div className="flex gap-4">
              <a href="#console-block" className="bg-[#E53935] text-white px-8 py-4 rounded-xl font-bold font-syne shadow-lg shadow-red-500/20 hover:bg-[#c62828] transition-all">
                Boot Command Terminal
              </a>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
              
              {/* Autoplay Video Centerpiece */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <video
                  src="https://videos.pexels.com/video-files/34630451/14676799_640_360_30fps.mp4"
                  poster="https://images.pexels.com/videos/34630451/pexels-photo-34630451.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] object-cover rounded-full scale-110 opacity-80"
                />
              </div>

              {/* Overlay Active Radius */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-950/20 rounded-full text-center p-6 pointer-events-none">
                <span className="text-[10px] text-slate-300 block mb-2 tracking-widest font-mono">Active Radius</span>
                <div className="text-xl md:text-2xl font-syne font-black text-white leading-none uppercase drop-shadow-md">50KM Domination</div>
                <div className="text-[9px] text-slate-400 mt-2 font-mono">TORONTO · VANCOUVER · CALGARY</div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-10 -right-4 z-20 glass p-5 rounded-2xl animate-floaty shadow-2xl text-slate-800 border-white/60">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#E53935]/10 flex items-center justify-center text-[#E53935]">
                    <i className="ti ti-chart-infographic" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Local Views</span>
                </div>
                <div className="text-3xl font-black font-syne tracking-tight text-[#111111]">+340%</div>
                <div className="flex items-center gap-1 text-[10px] text-[#E53935] mt-1">
                  <i className="ti ti-trending-up" />
                  <span>TORONTO REGION</span>
                </div>
              </div>

              <div className="absolute top-1/2 -left-20 z-20 glass p-5 rounded-2xl animate-floaty2 shadow-2xl text-slate-800 border-white/60">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#1E88E5]/10 flex items-center justify-center text-[#1E88E5]">
                    <i className="ti ti-target-arrow" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Conversion</span>
                </div>
                <div className="text-3xl font-black font-syne tracking-tight text-[#111111]">CPL $18</div>
                <div className="text-[10px] text-slate-500 mt-1 font-mono uppercase tracking-widest">Meta Lead Flow</div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* LOCAL GRID DEFENSE SECTION */}
      <section className="relative min-h-[900px] overflow-hidden flex items-center bg-[#F4F7F6] py-24 border-t border-slate-100">
        
        {/* Toronto Map Background */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1544411047-c491e34a24e0?auto=format&w=1600&q=80&fit=crop"
            alt="Toronto City Map"
            className="w-full h-full object-cover grayscale"
            decoding="async"
            loading="lazy"
          />
        </div>

        {/* Radar Animation Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none opacity-30">
          <div className="absolute top-1/2 left-1/2 w-[2000px] h-[2000px] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(229,57,53,0.15)_360deg)] rounded-full animate-[spin_12s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-slate-300 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-300 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-slate-300 rounded-full" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl text-slate-800">
            <div className="text-[#E53935] font-mono text-sm tracking-[0.4em] mb-6 uppercase font-bold">Local Grid Defense</div>
            <h2 className="font-syne text-5xl lg:text-7xl font-black mb-8 tracking-tighter leading-[0.9] text-[#111111] uppercase">
              'NEAR ME' <br /> DOMINANCE
            </h2>
            <p className="text-base md:text-lg text-slate-500 mb-10 leading-relaxed max-w-lg font-medium">
              Turn "Near Me" into "Booked Now". We automate your Google Business Profile to capture every local search in your service area, locking out competitors in real-time.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4 p-5 glass rounded-2xl hover:border-[#E53935]/40 transition-all cursor-default max-w-md shadow-soft">
                <div className="p-3 bg-[#E53935]/10 rounded-lg text-[#E53935]">
                  <i className="ti ti-map-pin-filled text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-[#111111]">Grid Tracking v4.0</h4>
                  <p className="text-xs md:text-sm text-slate-500 font-medium">Monitor rankings point-by-point across your entire city with 500m precision.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 glass rounded-2xl hover:border-[#E53935]/40 transition-all cursor-default max-w-md shadow-soft">
                <div className="p-3 bg-[#1E88E5]/10 rounded-lg text-[#1E88E5]">
                  <i className="ti ti-message-2-share text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-[#111111]">Review Acceleration</h4>
                  <p className="text-xs md:text-sm text-slate-500 font-medium">Proprietary AI sequence to stack 5-star reviews and boost authority instantly.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center z-10">
            <div className="glass p-8 md:p-10 rounded-[2.5rem] w-[450px] shadow-glass border-slate-200/50 relative group">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#E53935] text-white font-mono text-xs font-bold rounded-full uppercase tracking-widest shadow-lg">
                You rank #1
              </div>

              <div className="flex justify-between items-center mb-10 text-slate-800">
                <div className="w-16 h-16 bg-[#E53935]/10 rounded-2xl flex items-center justify-center border border-[#E53935]/20">
                  <img
                    src="https://cdn.jsdelivr.net/npm/game-icons-transparent@latest/svgs/lorc/radar-sweep.svg"
                    className="w-10 h-10"
                    style={{ filter: "invert(27%) sepia(91%) saturate(3015%) hue-rotate(346deg) brightness(96%) contrast(89%)" }}
                    decoding="async"
                    loading="lazy"
                    alt="Radar sweep"
                  />
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] text-[#E53935] uppercase tracking-widest mb-1 font-bold">Node Status</div>
                  <div className="text-[#111111] font-bold">Toronto - Downtown</div>
                </div>
              </div>

              <div className="space-y-8 text-slate-800">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-3">
                    <span className="text-slate-500 font-bold">SEARCH VISIBILITY</span>
                    <span className="text-[#E53935] font-bold">94%</span>
                  </div>
                  <div className="h-2 bg-slate-200/50 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E53935] w-[94%]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 p-4 rounded-xl border border-slate-200/50">
                    <div className="text-[10px] font-mono text-slate-500 uppercase mb-1 font-bold">Clicks</div>
                    <div className="text-xl font-black text-[#111111]">2,481</div>
                  </div>
                  <div className="bg-white/60 p-4 rounded-xl border border-slate-200/50">
                    <div className="text-[10px] font-mono text-slate-500 uppercase mb-1 font-bold">Actions</div>
                    <div className="text-xl font-black text-[#111111]">154</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 flex items-center gap-4">
                  <div className="flex -space-x-3 overflow-hidden">
                    <img src="https://i.pravatar.cc/100?u=1" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Avatar" decoding="async" loading="lazy" />
                    <img src="https://i.pravatar.cc/100?u=2" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Avatar" decoding="async" loading="lazy" />
                    <img src="https://i.pravatar.cc/100?u=3" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Avatar" decoding="async" loading="lazy" />
                    <div className="w-10 h-10 rounded-full bg-[#E53935]/10 border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#E53935]">+12</div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 leading-tight">
                    RECENT CONVERSIONS IN <br /> <span className="text-[#111111] font-bold">SCARBOROUGH, ON</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEPLOYMENT PROTOCOL */}
      <section className="py-24 px-6 bg-[#F4F7F6] relative overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
            <div>
              <div className="text-[#E53935] font-mono text-xs tracking-[0.5em] mb-4 uppercase font-bold">Deployment Protocol</div>
              <h2 className="font-syne text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-[#111111]">
                From Recon <br /> To <span className="text-[#E53935] italic">Takeover</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-lg font-medium">
              A militarized 4-phase rollout. No vague retainers, no agency limbo — every week has a deliverable and a defined kill metric.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-red-500/0 via-red-500/30 to-red-500/0" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { num: "01", icon: "ti-radar-2", title: "Audit & Recon", desc: "Full teardown of your GMB, ad accounts, and competitor grid. We map every leak in your local funnel within 72 hours.", time: "Week 0–1" },
                { num: "02", icon: "ti-settings-code", title: "System Build", desc: "Landing pages, tracking, review automations, and campaign architecture assembled into one connected operating stack.", time: "Week 1–2" },
                { num: "03", icon: "ti-rocket", title: "Launch Sprint", desc: "A 30-day learning loop: 3+ ad angles live, GMB posting cadence active, and lead routing tested against real call volume.", time: "Week 2–6" },
                { num: "04", icon: "ti-shield-bolt", title: "Scale & Defend", desc: "Winners get budget, losers get killed. Grid defense protocols keep competitors locked out while spend scales profitably.", time: "Ongoing", highlight: true }
              ].map((ph, idx) => (
                <div key={idx} className="relative group text-slate-800">
                  <div className={`w-[96px] h-[96px] rounded-2xl glass flex items-center justify-center mb-8 relative z-10 hover:border-[#E53935]/50 transition-colors ${ph.highlight ? "border-[#E53935]/40" : ""}`}>
                    <span className="font-mono text-2xl font-bold text-[#E53935]">{ph.num}</span>
                    <span className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-lg flex items-center justify-center text-sm ${ph.highlight ? "bg-[#E53935] text-white shadow-md" : "bg-[#E53935]/10 border border-[#E53935]/30 text-[#E53935]"}`}>
                      <i className={`ti ${ph.icon}`} />
                    </span>
                  </div>
                  <h3 className="font-syne text-xl font-black mb-3 tracking-tight uppercase text-[#111111]">{ph.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-xs md:text-sm mb-4 font-medium">{ph.desc}</p>
                  <div className="font-mono text-[9px] text-[#E53935] uppercase tracking-widest font-bold">{ph.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE GROWTH STACK */}
      <section className="py-24 px-6 relative bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-[#E53935] font-mono text-xs tracking-[0.5em] mb-4 uppercase font-bold">The Growth Stack</div>
            <h2 className="font-syne text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase text-[#111111]">Engineered For Scale</h2>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-xl mx-auto font-medium">
              Integrated acquisition systems that work in concert to build absolute market dominance for Canadian service brands.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {/* Card 1 */}
            <div className="glass p-10 rounded-[2.5rem] border border-slate-200/50 hover:border-[#1E88E5]/30 flex flex-col group shadow-glass text-slate-800">
              <div className="mb-8 text-[#1E88E5]/60 group-hover:text-[#1E88E5] transition-colors">
                <i className="ti ti-brand-facebook text-6xl" />
              </div>
              <h3 className="font-syne text-2xl font-black mb-4 tracking-tight text-[#111111]">PAID SOCIAL ENGINE</h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-sm md:text-base font-medium">
                Hyper-targeted Meta Ads focusing on creative testing and automated lead routing for Canadian service brands.
              </p>
              <div className="mt-auto space-y-3 pt-8 border-t border-slate-200/50">
                <div className="flex items-center gap-3 text-xs font-mono">
                  <i className="ti ti-checks text-[#1E88E5] text-base" />
                  <span className="text-slate-600 font-medium">Dynamic Creative Optimization</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <i className="ti ti-checks text-[#1E88E5] text-base" />
                  <span className="text-slate-600 font-medium">24/7 Lead Hygiene Filter</span>
                </div>
              </div>
            </div>

            {/* Card 2 - Local Supremacy (Centerpiece with 3D Pin image) */}
            <div className="glass p-10 rounded-[2.5rem] border-2 border-[#E53935]/60 scale-105 z-10 relative flex flex-col group shadow-glass overflow-hidden bg-white/50 text-slate-800">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 opacity-20 pointer-events-none group-hover:opacity-50 group-hover:scale-125 transition-all duration-700">
                <img
                  src="https://images.unsplash.com/photo-1677080865283-26f94ed332f1?auto=format&w=600&q=80&fit=crop"
                  alt="3D Pin"
                  className="w-full h-full object-contain rounded-full scale-110"
                  decoding="async"
                  loading="lazy"
                />
              </div>

              <div className="mb-8 text-[#E53935]">
                <i className="ti ti-map-pin-2 text-6xl drop-shadow-[0_4px_15px_rgba(229,57,53,0.3)]" />
              </div>
              <div className="inline-block px-3 py-1 bg-[#E53935] text-white font-mono text-[9px] font-bold rounded-full mb-4 w-fit uppercase">Most Requested</div>
              <h3 className="font-syne text-2xl font-black mb-4 tracking-tight text-[#111111]">LOCAL SUPREMACY</h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-sm md:text-base italic font-medium">
                The gold standard for GMB management in the GTA and beyond. Automated ranking grid defense protocols.
              </p>
              
              <div className="bg-white/60 p-5 rounded-2xl border border-slate-200/50 mb-8 mt-auto">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[9px] text-[#E53935] font-bold">PROTOCOL STATUS</span>
                  <span className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
                </div>
                <div className="text-xs font-mono text-slate-700">Active Ranking Grid: <span className="text-[#E53935] font-bold">LIVE</span></div>
              </div>

              <a href="#console-block" className="w-full py-4 bg-[#E53935] text-white font-black rounded-xl uppercase tracking-widest text-center hover:scale-[1.02] transition-transform shadow-xl text-xs font-mono">
                Secure Your Territory
              </a>
            </div>

            {/* Card 3 */}
            <div className="glass p-10 rounded-[2.5rem] border border-slate-200/50 hover:border-[#E53935]/30 flex flex-col group shadow-glass text-slate-800">
              <div className="mb-8 text-[#E53935]/60 group-hover:text-[#E53935] transition-colors">
                <i className="ti ti-search text-6xl" />
              </div>
              <h3 className="font-syne text-2xl font-black mb-4 tracking-tight text-[#111111]">INTENT CAPTURE</h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-sm md:text-base font-medium">
                High-intent keyword harvesting paired with high-conversion local landing pages built to print appointments.
              </p>
              <div className="mt-auto space-y-3 pt-8 border-t border-slate-200/50">
                <div className="flex items-center gap-3 text-xs font-mono">
                  <i className="ti ti-checks text-[#E53935] text-base" />
                  <span className="text-slate-600 font-medium">Negative Term Scrubbing</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <i className="ti ti-checks text-[#E53935] text-base" />
                  <span className="text-slate-600 font-medium">24/7 Bid Management AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTOR PLAYBOOKS */}
      <section className="py-24 px-6 relative bg-[#F4F7F6] border-t border-slate-100 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <video
            src="https://videos.pexels.com/video-files/34633541/14679242_640_360_30fps.mp4"
            poster="https://images.pexels.com/videos/34633541/pexels-photo-34633541.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-[0.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F4F7F6] via-transparent to-[#F4F7F6]" />
        </div>

        <div className="container mx-auto relative z-10 text-slate-800">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-[#E53935] font-mono text-xs tracking-[0.5em] mb-4 uppercase font-bold">Sector Playbooks</div>
            <h2 className="font-syne text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase text-[#111111]">
              Industries We <span className="text-[#E53935] italic">Arm</span>
            </h2>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
              Pre-built offer angles, booking flows, and ranking playbooks for Canada's highest-ticket local verticals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { num: "PB-01", label: "HVAC & Plumbing", icon: "ti-tools", details: "Emergency-intent capture with call-first campaigns and seasonal demand surges.", cpl: "Avg CPL: $19–$32 CAD", color: "hover:border-[#E53935]/40", iconColor: "text-[#E53935]", bgColor: "bg-[#E53935]/10" },
              { num: "PB-02", label: "Roofing", icon: "ti-home-bolt", details: "Storm-response funnels, financing offers, and brochure-to-WhatsApp handoffs.", cpl: "Avg Ticket: $14K CAD", color: "hover:border-[#1E88E5]/40", iconColor: "text-[#1E88E5]", bgColor: "bg-[#1E88E5]/10" },
              { num: "PB-03", label: "Dental Clinics", icon: "ti-dental", details: "Implant and Invisalign patient pipelines integrated with local review-velocity engines.", cpl: "Avg LTV: $6K CAD", color: "hover:border-[#E53935]/40", iconColor: "text-[#E53935]", bgColor: "bg-[#E53935]/10" },
              { num: "PB-04", label: "Legal Services", icon: "ti-scale", details: "High-intent keyword harvesting paired with conversion-optimized case intake funnels.", cpl: "Avg Case: $11K CAD", color: "hover:border-[#1E88E5]/40", iconColor: "text-[#1E88E5]", bgColor: "bg-[#1E88E5]/10" },
              { num: "PB-05", label: "Real Estate", icon: "ti-building-skyscraper", details: "Listing-launch ads, high-intent buyer captures, and automated follow-up sequences.", cpl: "Avg Commission: $19K CAD", color: "hover:border-[#E53935]/40", iconColor: "text-[#E53935]", bgColor: "bg-[#E53935]/10" },
              { num: "PB-06", label: "Auto Services", icon: "ti-car", details: "Bay-filling scheduling funnels for high-end detailing, paint correction, and repair.", cpl: "Avg Repair: $2.4K CAD", color: "hover:border-[#1E88E5]/40", iconColor: "text-[#1E88E5]", bgColor: "bg-[#1E88E5]/10" }
            ].map((pb, idx) => (
              <div key={idx} className={`glass p-8 rounded-[2rem] group ${pb.color} cursor-default`}>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl ${pb.bgColor} flex items-center justify-center ${pb.iconColor}`}>
                    <i className={`ti ${pb.icon} text-2xl`} />
                  </div>
                  <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-all font-bold">{pb.num}</span>
                </div>
                <h3 className="font-syne text-xl font-black mb-2 tracking-tight text-[#111111]">{pb.label}</h3>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-4 font-medium">{pb.details}</p>
                <div className={`font-mono text-[9px] uppercase tracking-widest font-bold ${pb.iconColor}`}>{pb.cpl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMAND TERMINAL CONSOLE */}

      {/* COMMAND TERMINAL CONSOLE */}
      <section id="console-block" className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto max-w-3xl relative z-10">
          <div className="text-center mb-12">
            <span className="text-[#E53935] font-mono text-xs tracking-[0.4em] mb-4 uppercase block font-bold">System Interface</span>
            <h2 className="font-syne text-3xl md:text-5xl font-black uppercase tracking-tighter">INITIATE PROTOCOL</h2>
            <p className="text-slate-400 text-xs md:text-sm mt-4">
              Scale your client pipeline. Boot up the network command line and capture local market share.
            </p>
          </div>

          <div className="bg-black/50 rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-black/80 px-6 py-3 border-b border-slate-800 flex justify-between items-center text-[10px] text-slate-500 font-mono">
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
              </div>
              <span>ADS_GROWLY_SYSTEM_CONSOLE.SH</span>
            </div>

            {/* Terminal Screen */}
            <div className="p-6 md:p-8 space-y-3 min-h-[300px] max-h-[450px] overflow-y-auto text-xs md:text-sm font-mono scrollbar-thin scrollbar-thumb-zinc-800">
              {terminalHistory.map((item, index) => (
                <div key={index} className={item.color}>
                  {item.text}
                </div>
              ))}
              <div ref={historyEndRef} />

              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
                <span className="text-[#E53935] font-bold">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder={waitingForEmail ? "Enter commander email..." : "Type command here... (help)"}
                  className="bg-transparent border-none outline-none text-white w-full focus:ring-0 font-mono text-xs md:text-sm"
                />
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200/50 py-16 px-6 text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Logo size={32} />
              <span className="font-syne text-lg font-bold text-slate-900">Ads<span className="text-[#E53935]">Growly</span></span>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest">
              Tech Command Center System v4.0.2<br />
              Dominance Vector: Toronto Grid HQ.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 text-xs font-mono font-bold">
            <div className="flex flex-col gap-2">
              <span className="text-[#E53935] uppercase tracking-widest text-[9px]">Stacks</span>
              <Link href="/#toolkit" className="hover:text-[#E53935]">Paid Social</Link>
              <Link href="/aurora" className="hover:text-[#E53935]">Local Supremacy</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-slate-400 uppercase tracking-widest text-[9px]">Connection</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] text-[#E53935] tracking-widest">SECURE LINK ESTABLISHED</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
