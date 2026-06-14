"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function OpenAIPage() {
  const [vertical, setVertical] = useState("roofing");
  const [status, setStatus] = useState("// Output will render here...");
  const [headline, setHeadline] = useState("");
  const [desc, setDesc] = useState("");
  const [primary, setPrimary] = useState("");
  const [loading, setLoading] = useState(false);

  const adTemplates = {
    roofing: {
      headline: "Need a New Roof in Ontario?",
      desc: "Free estimates, 0% financing options, and 50-year warranty roofs installed in 48 hours.",
      primary: "🚨 Ontario Homeowners: Don't wait for the next storm. Claim your FREE roof diagnostic inspection today. Click to get a guaranteed quote in 60 seconds."
    },
    hvac: {
      headline: "AC Down? Fast Ontario Repair",
      desc: "Same-day HVAC repairs, licensed techs, and 100% satisfaction guarantee. Book online.",
      primary: "❄️ Beat the summer humidity. If your cooling system is struggling, our certified engineers are in your area now. No extra diagnostic fees when we complete the repair!"
    },
    dental: {
      headline: "Get Your Dream Smile - Invisalign",
      desc: "CAD $500 off dental implants & invisible aligners. Free digital scan & consultation.",
      primary: "🦷 Regain your confidence. Our local dental specialists provide clear pricing and payment plans starting at $49/week. See your projected smile transformation today!"
    },
    legal: {
      headline: "Injured in Ontario? Get Help",
      desc: "You don't pay unless we win. Over $80M recovered. Speak with an injury lawyer now.",
      primary: "⚖️ Focus on your recovery, we handle the insurance grids. Free, zero-obligation case evaluation at home or hospital. Secure the compensation you deserve."
    }
  };

  const handleGenerate = () => {
    setLoading(true);
    setHeadline("");
    setDesc("");
    setPrimary("");
    setStatus("// Initializing OpenAI GPT-4o creative request...");

    setTimeout(() => {
      setStatus("// Generating ad variants for local service radius...");

      setTimeout(() => {
        const adData = adTemplates[vertical];
        setHeadline(adData.headline);
        setDesc(adData.desc);
        setPrimary(adData.primary);
        setStatus("// Copy generation successfully completed in 340ms:");
        setLoading(false);
      }, 500);
    }, 400);
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#F4F7F6] text-[#111111]">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* NAVIGATION */}
      <nav className="relative w-full z-50 px-6 md:px-10 py-6 flex justify-between items-center bg-white/30 backdrop-blur-md border-b border-slate-200/50">
        <div className="flex items-center gap-3">
          <Logo size={44} />
          <span className="text-xl md:text-2xl font-extrabold tracking-tighter text-[#111111] font-syne">
            Ads growly<span className="text-[#E53935]">.</span>
          </span>
          <span className="text-[9px] font-mono font-black bg-[#E53935]/10 text-[#E53935] px-2.5 py-0.5 rounded-full ml-1 uppercase tracking-widest hidden sm:inline-block">OpenAI Stack</span>
        </div>
        <div className="hidden md:flex items-center gap-10 font-semibold text-sm">
          <Link href="/#toolkit" className="text-slate-600 hover:text-[#111111] transition-colors">Our Systems</Link>
          <Link href="/#gmb-engine" className="text-slate-600 hover:text-[#111111] transition-colors">GMB Local Engine</Link>
          <a href="#simulator" className="text-slate-600 hover:text-[#111111] transition-colors font-bold">AI Writer Demo</a>
          <Link href="/#pricing" className="text-slate-600 hover:text-[#111111] transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/showcase" className="px-5 py-2 rounded-xl text-xs font-bold font-sans border border-slate-200 bg-white/60 text-slate-700">
            Showcase Hub
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-20 pb-24 px-6 flex flex-col items-center overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-100 shadow-soft mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 font-mono">AI Model: GPT-4o & Custom RAG</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-syne font-extrabold leading-[0.95] tracking-tight uppercase mb-8 text-[#111111]">
              WEAPONIZE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#E53935] italic">OPENAI</span> FOR <br />
              LOCAL ADS
            </h1>

            <p className="text-slate-500 text-sm md:text-base mb-10 leading-relaxed font-medium">
              We deploy custom-trained AI agents that build semantic keyword lists, write scroll-stopping copy variants, and manage bid adjustments every 180 seconds. Absolute ROI, zero waste.
            </p>
            <div className="flex flex-wrap gap-5">
              <a href="#simulator" className="bg-[#111111] text-white px-8 py-4.5 rounded-xl font-bold hover:scale-105 transition-transform text-xs uppercase tracking-wider flex items-center gap-2 font-mono">
                Launch AI Writer Demo <i className="ti ti-arrow-right" />
              </a>
            </div>
          </div>

          {/* Interactive AI Simulator Box */}
          <div id="simulator" className="w-full max-w-xl justify-self-center lg:justify-self-end glass rounded-3xl p-6 md:p-8 border-white/60 shadow-glass relative bg-white/40">
            <div className="absolute -top-12 -right-8 w-24 h-24 bg-red-100/30 blur-2xl rounded-full pointer-events-none" />
            <div className="flex items-center justify-between pb-6 border-b border-slate-200/55 mb-6">
              <div className="flex items-center gap-3">
                <i className="ti ti-sparkles text-[#E53935] text-2xl animate-pulse" />
                <div>
                  <span className="text-[9px] font-mono text-slate-400 block uppercase tracking-widest">OpenAI Agent</span>
                  <span className="text-sm font-bold text-slate-700 font-sans">Ad Creative Prototyper</span>
                </div>
              </div>
              <span className="text-[9px] font-mono bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full font-bold">CONNECTED</span>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-3 font-black">Target Service Sector</label>
                <div className="relative">
                  <select
                    value={vertical}
                    onChange={(e) => setVertical(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer shadow-soft font-sans"
                  >
                    <option value="roofing">Residential Roofing Replacement</option>
                    <option value="hvac">HVAC Maintenance & Install</option>
                    <option value="dental">Cosmetic Dentistry / Invisalign</option>
                    <option value="legal">Personal Injury Legal Advocacy</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <i className="ti ti-chevron-down text-lg" />
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-4 bg-[#111111] hover:bg-slate-900 text-white text-xs font-black rounded-2xl uppercase tracking-widest flex items-center justify-center gap-2 transition-transform active:scale-[0.98] font-mono disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate High-Yield Copy"} <i className="ti ti-rotate" />
              </button>

              {/* Console output window */}
              <div className="glass-dark border border-white/5 rounded-2xl p-5 font-mono text-[11px] text-slate-300 min-h-[220px] space-y-4 relative overflow-hidden shadow-inner bg-zinc-950">
                <div className="text-slate-500">{status}</div>

                {headline && (
                  <div className="animate-fadeIn">
                    <span className="text-[#E53935] block mb-1 font-bold">Headline (30 chars limit):</span>
                    <div className="text-white font-bold text-xs bg-white/5 p-3 rounded-lg border border-white/5">{headline}</div>
                  </div>
                )}

                {desc && (
                  <div className="animate-fadeIn">
                    <span className="text-blue-400 block mb-1 font-bold">Description (90 chars limit):</span>
                    <div className="text-slate-200 bg-white/5 p-3 rounded-lg border border-white/5 leading-relaxed">{desc}</div>
                  </div>
                )}

                {primary && (
                  <div className="animate-fadeIn">
                    <span className="text-green-400 block mb-1 font-bold">Primary Text / Angles:</span>
                    <div className="text-slate-200 bg-white/5 p-3 rounded-lg border border-white/5 leading-relaxed">{primary}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CORE CAPABILITIES */}
      <section id="features" className="py-32 px-6 border-t border-slate-100 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-24">
            <span className="text-blue-600 font-mono text-xs uppercase tracking-[0.3em] block mb-4 font-black">Core Model Stack</span>
            <h2 className="text-4xl md:text-5xl font-syne font-extrabold leading-tight tracking-tight text-[#111111]">COGNITIVE ACQUISITION</h2>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed mt-4 font-medium">We wrap OpenAI models in proprietary scrapers and data flows to deliver autonomous marketing dominance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="glass p-10 rounded-[2.5rem] border-white/60 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 shadow-soft bg-white/45 backdrop-blur-md">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 mb-8">
                <i className="ti ti-brain text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#111111]">Semantic Scrapers</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Autonomous mapping of local, high-intent long-tail keywords in your area. Stops money leakages on unrelated clicks.</p>
              <span className="font-mono text-[9px] text-blue-600 tracking-widest uppercase font-bold">GPT-4o Embedding APIs</span>
            </div>
            {/* Card 2 */}
            <div className="glass p-10 rounded-[2.5rem] border-white/60 relative overflow-hidden group hover:border-[#E53935]/30 transition-all duration-500 hover:-translate-y-1 shadow-soft bg-white/45 backdrop-blur-md">
              <div className="w-12 h-12 bg-[#E53935]/10 rounded-2xl flex items-center justify-center text-[#E53935] mb-8">
                <i className="ti ti-forms text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#111111]">UGC Variations</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Instant copywriting variants tailored to exact local zip codes. Captures attention with hyper-localized relevance.</p>
              <span className="font-mono text-[9px] text-[#E53935] tracking-widest uppercase font-bold">Creative Prompting v2</span>
            </div>
            {/* Card 3 */}
            <div className="glass p-10 rounded-[2.5rem] border-white/60 relative overflow-hidden group hover:border-green-500/30 transition-all duration-500 hover:-translate-y-1 shadow-soft bg-white/45 backdrop-blur-md">
              <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-600 mb-8">
                <i className="ti ti-adjustments-bolt text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#111111]">180s Bid Optimization</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Our ad automation monitors live CPL indicators and re-calibrates bids against competitor auction signals dynamically.</p>
              <span className="font-mono text-[9px] text-green-600 tracking-widest uppercase font-bold">Autonomous Agent Nodes</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROMOTIONAL BENTO CARD */}
      <section id="offer" className="py-32 px-6 relative bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="glass-dark text-white p-12 md:p-16 rounded-[3rem] border border-white/10 bg-gradient-to-br from-[#111111] via-[#0A0B10] to-[#111111] relative overflow-hidden flex flex-col md:flex-row items-center gap-12 shadow-2xl">
            {/* Radial Glow Background */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="md:w-3/5 relative z-10 space-y-6">
              <div className="inline-block px-3 py-1 bg-[#E53935] text-white font-mono text-[9px] font-bold rounded-full uppercase tracking-wider">Premium Growth Deal</div>
              <h2 className="text-4xl md:text-5xl font-syne font-extrabold uppercase leading-tight">GET A FREE CUSTOM WEBSITE</h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                Join our Premium acquisition plan and we'll build, optimize, and launch a bespoke, high-performance website for your service brand — at zero cost. Hosting, SEO, and integrations included.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono text-blue-400">
                <i className="ti ti-circle-check-filled text-lg text-green-400" />
                <span>Includes full CRM & ad lead tracking integration</span>
              </div>
            </div>
            <div className="md:w-2/5 flex flex-col items-center justify-center relative z-10 w-full">
              <div className="glass p-8 rounded-2xl w-full border-white/10 text-center max-w-sm bg-white/5 backdrop-blur-md">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-3">Value Deployed</div>
                <div className="text-5xl font-extrabold mb-2 font-mono text-white">$4,800<span className="text-lg text-slate-500 font-normal"> CAD</span></div>
                <div className="text-xs text-green-400 font-bold mb-6">COMPLETELY WAIVED</div>
                <Link href="/#audit-form" className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-black uppercase tracking-widest block text-center rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]">
                  Claim Website Offer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Logo size={32} />
              <span className="font-extrabold text-xl tracking-tighter text-[#111111] font-syne">
                Ads growly<span className="text-[#E53935]">.</span>
              </span>
            </div>
            <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest leading-relaxed">
              OpenAI Integration Stack v1.0.4<br />
              Autonomous local expansion vectors.
            </p>
          </div>

          <div className="flex flex-wrap gap-16 font-mono text-xs text-slate-500 font-semibold">
            <div className="flex flex-col gap-4">
              <span className="text-blue-600 uppercase tracking-widest text-[9px] font-bold">AI Models</span>
              <a href="#" className="hover:text-slate-900 transition-colors">GPT-4o Agency</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Semantic Embeddings</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Fine-tuned RAG</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[#E53935] uppercase tracking-widest text-[9px] font-bold">Integration</span>
              <Link href="/#toolkit" className="hover:text-slate-900 transition-colors">Meta Ads Engine</Link>
              <Link href="/#gmb-engine" className="hover:text-slate-900 transition-colors">Google Ads Core</Link>
              <a href="#" className="hover:text-slate-900 transition-colors">CRM Webhooks</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-slate-400 uppercase tracking-widest text-[9px] font-bold">Connection</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] text-green-600 tracking-widest uppercase">OpenAI Link Established</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-400">
          <span>© 2026 Ads Growly. OpenAI Cognitive Pipeline.</span>
          <span>Local Latency Check: 24ms</span>
        </div>
      </footer>
    </div>
  );
}
