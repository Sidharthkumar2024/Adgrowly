"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { supabase } from "@/lib/supabase";

export default function AuroraPage() {
  const [estimateGoal, setEstimateGoal] = useState("5000");
  const [formData, setFormData] = useState({
    contact_name: "",
    contact_email: "",
    phone: ""
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.contact_name || !formData.contact_email) {
      alert("Please enter a name and email.");
      return;
    }

    setFormSubmitting(true);

    try {
      const { data, error } = await supabase
        .from("submissions")
        .insert([{
          business_name: "Aurora Lead Request",
          contact_name: formData.contact_name,
          contact_email: formData.contact_email,
          phone: formData.phone,
          ad_budget: "unspecified",
          gmb_status: "unspecified"
        }]);

      if (error) {
        throw new Error(error.message || "Failed to submit connection.");
      }

      setFormSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Error submitting connection: " + err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-[#F4F7F6] text-[#111111]">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* NAVIGATION */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo size={40} />
          <div className="flex flex-col">
            <span className="font-syne text-xl md:text-2xl tracking-tighter leading-none font-bold">ADS GROWLY</span>
            <span className="font-mono text-[8px] text-[#E53935]/70 uppercase tracking-[0.35em] mt-1">Growth Command</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 font-inter text-[10px] font-bold tracking-widest uppercase text-slate-500">
          <Link href="/#toolkit" className="hover:text-slate-900 transition-colors">Strategy</Link>
          <a href="#sequence" className="hover:text-slate-900 transition-colors">Sequence</a>
          <a href="#sectors" className="hover:text-slate-900 transition-colors">Sectors</a>
          <Link href="/#pricing" className="hover:text-slate-900 transition-colors">Tiers</Link>
          <Link href="/showcase" className="px-5 py-2.5 border border-slate-200 rounded-xl bg-white hover:bg-slate-55 transition-all text-slate-700 text-xs font-bold font-sans">
            Showcase Hub
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[800px] overflow-hidden bg-[#EAF1F7] flex items-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <video
            src="https://videos.pexels.com/video-files/34336322/14545802_360_640_30fps.mp4"
            poster="https://images.pexels.com/videos/34336322/pexels-photo-34336322.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.40] saturate-[1.05]"
          />
          <div className="absolute top-[20%] right-[10%] w-64 glass p-6 rounded-2xl border-white/10 text-white shadow-2xl hidden lg:block z-10">
            <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block mb-2">Market Status</span>
            <div className="text-xl font-mono mb-2 text-[#E53935] font-bold">DOMINATING</div>
            <div className="flex items-end gap-1 h-8">
              <div className="w-1.5 h-[40%] bg-[#E53935] rounded-full" />
              <div className="w-1.5 h-[70%] bg-[#E53935] rounded-full" />
              <div className="w-1.5 h-[100%] bg-[#E53935] rounded-full" />
              <div className="w-1.5 h-[60%] bg-[#E53935] rounded-full" />
              <div className="w-1.5 h-[80%] bg-[#E53935] rounded-full" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-white max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-[0.2em]">Local Presence Dominance Protocol v4.0</span>
          </div>

          <h1 className="font-syne text-5xl md:text-8xl leading-[0.9] mb-6 tracking-tighter uppercase font-extrabold text-white">
            UNFAIR LOCAL<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#E53935]">ADVANTAGE</span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Ads Growly engineers high-yield GMB and paid traffic systems. We don't just "manage accounts"—we seize market share for Canadian service leaders.
          </p>

          <a href="#connection-form" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E53935] to-[#D81B60] text-white px-8 py-4 rounded-xl font-syne font-bold text-base hover:scale-105 transition-transform">
            INITIALIZE CONNECTION
          </a>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[#E53935] font-mono text-xs uppercase tracking-[0.3em] mb-3 block font-bold">Core Capabilities</span>
            <h2 className="font-syne font-extrabold text-3xl md:text-5xl tracking-tighter leading-none">
              OUR GROWTH STAKED UNITS
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm text-sm md:text-base leading-relaxed">
            We deploy three distinct systems designed to interlock and multiply your local footprint.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Card 1 */}
          <div className="glass flex flex-col lg:flex-row items-stretch rounded-3xl overflow-hidden border-white/80 shadow-soft">
            <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="w-12 h-12 bg-blue-500/10 flex items-center justify-center rounded-xl mb-6 text-blue-600">
                <i className="ti ti-brand-meta text-3xl" />
              </div>
              <h3 className="font-syne font-bold text-2xl md:text-3xl mb-4">Meta Ads Engine</h3>
              <p className="text-slate-500 text-sm md:text-base mb-6 leading-relaxed">
                Hyper-granular audience segmentation combined with high-frequency creative refreshes. We don't just scroll-stop; we capture interest and convert it into direct inquiries.
              </p>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 bg-white border border-slate-100 text-[9px] font-mono text-slate-400 font-bold">RETARGETING</span>
                <span className="px-2.5 py-1 bg-white border border-slate-100 text-[9px] font-mono text-slate-400 font-bold">LTV FOCUS</span>
              </div>
            </div>
            <div className="w-full lg:w-1/2 bg-slate-100 min-h-[250px] relative overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1671519821564-ced7e41ee7ae?auto=format&w=1000&q=80&fit=crop"
                alt="3D cubes"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                decoding="async"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass flex flex-col lg:flex-row-reverse items-stretch rounded-3xl overflow-hidden border-white/80 shadow-soft">
            <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="w-12 h-12 bg-red-500/10 flex items-center justify-center rounded-xl mb-6 text-[#E53935]">
                <i className="ti ti-brand-google text-3xl" />
              </div>
              <h3 className="font-syne font-bold text-2xl md:text-3xl mb-4">Google Ads Core</h3>
              <p className="text-slate-500 text-sm md:text-base mb-6 leading-relaxed">
                Dominating the search intent lifecycle. We position your services at the exact micro-moment a lead in your service area is ready to hire. High intent, zero waste.
              </p>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 bg-white border border-slate-100 text-[9px] font-mono text-slate-400 font-bold">SEARCH DOMINANCE</span>
                <span className="px-2.5 py-1 bg-white border border-slate-100 text-[9px] font-mono text-slate-400 font-bold">CONVERSION TRACKING</span>
              </div>
            </div>
            <div className="w-full lg:w-1/2 bg-slate-100 min-h-[250px] relative overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1678189481940-59df65baf945?auto=format&w=800&q=80&fit=crop"
                alt="3D purple system blocks"
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                decoding="async"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* DEPLOYMENT SEQUENCE */}
      <section id="sequence" className="py-24 px-6 bg-[#EAF1F7]/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-2/5">
              <span className="text-[#E53935] font-mono text-xs uppercase tracking-[0.3em] mb-4 block font-bold">Operation Order</span>
              <h2 className="font-syne font-extrabold text-3xl md:text-5xl leading-none mb-6">DEPLOYMENT SEQUENCE</h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8">
                Every engagement runs through the same battle-tested four-phase protocol. No improvisation. No agency guesswork. Just a sequence engineered to compound.
              </p>
            </div>

            <div className="lg:w-3/5 space-y-6">
              {[
                { step: "PHASE_01 // RECON", title: "Deep Market Audit", text: "Full teardown of GMB profile, competitor grids, keyword demand mapping, and conversion leak diagnosis across Canada.", time: "WEEK 1", icon: "ti-radar-2" },
                { step: "PHASE_02 // BUILD", title: "System Construction", text: "GMB optimization, campaign structure, review pipelines, and custom landing pages built to print appointments.", time: "WEEK 2-3", icon: "ti-stack-2" },
                { step: "PHASE_03 // IGNITE", title: "Controlled Launch", text: "Meta and Google campaigns go live in a learning sprint, testing bids and monitoring CPL indexes.", time: "WEEK 4", icon: "ti-flame" },
                { step: "PHASE_04 // EXPAND", title: "Scale & Lock Out", text: "Scaling ad budgets into clear winners and locking competitors out of search packs.", time: "MONTH 2+", icon: "ti-chart-arrows-vertical" }
              ].map((ph, idx) => (
                <div key={idx} className="flex gap-4 md:gap-6">
                  <div className="w-10 h-10 shrink-0 bg-white border border-[#E53935] flex items-center justify-center rounded-xl font-bold text-xs text-[#E53935] shadow">
                    <i className={`ti ${ph.icon}`} />
                  </div>
                  <div className="glass p-6 md:p-8 rounded-[1.5rem] flex-1 shadow-soft">
                    <div className="flex justify-between items-center mb-2 font-mono text-[9px] font-bold">
                      <span className="text-[#E53935]">{ph.step}</span>
                      <span className="text-slate-400">{ph.time}</span>
                    </div>
                    <h3 className="font-syne font-bold text-xl mb-2">{ph.title}</h3>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{ph.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIVE DATA FIELD */}
      <section className="relative h-[560px] overflow-hidden bg-slate-900 flex items-center justify-center">
        <video
          src="https://videos.pexels.com/video-files/29397255/12662082_640_360_30fps.mp4"
          poster="https://images.pexels.com/videos/29397255/abstract-animation-colorful-neon-gradient-background-29397255.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4F7F6] via-transparent to-[#F4F7F6]" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-center text-center">
          <span className="font-mono text-[9px] text-[#1E88E5] uppercase tracking-[0.4em] mb-8 px-4 py-2 border border-white/30 bg-white/70 backdrop-blur-sm rounded-full font-bold shadow-sm">
            LIVE DATA FIELD — NORTHERN GRID
          </span>
          <h2 className="font-syne font-extrabold text-3xl md:text-6xl tracking-tighter leading-[0.95] mb-10 max-w-4xl text-slate-900 uppercase">
            YOUR MARKET MOVES LIKE WEATHER.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#E53935]">WE FORECAST IT.</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="glass px-8 py-5 rounded-2xl flex items-center gap-4 border-white/60 shadow-soft">
              <i className="ti ti-activity text-blue-600 text-2xl" />
              <div className="text-left">
                <div className="font-syne font-bold text-xl leading-none text-slate-800">2.4M+</div>
                <div className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mt-1">Signals Processed / Day</div>
              </div>
            </div>
            <div className="glass px-8 py-5 rounded-2xl flex items-center gap-4 border-white/60 shadow-soft">
              <i className="ti ti-clock-bolt text-[#E53935] text-2xl" />
              <div className="text-left">
                <div className="font-syne font-bold text-xl leading-none text-slate-800">&lt; 6 HRS</div>
                <div className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mt-1">Trend Reaction Time</div>
              </div>
            </div>
            <div className="glass px-8 py-5 rounded-2xl flex items-center gap-4 border-white/60 shadow-soft">
              <i className="ti ti-shield-lock text-blue-600 text-2xl" />
              <div className="text-left">
                <div className="font-syne font-bold text-xl leading-none text-slate-800">24/7</div>
                <div className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mt-1">Grid Defense Active</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESTIMATOR SECTION */}
      <section id="sectors" className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-syne font-extrabold text-3xl md:text-6xl mb-4 uppercase tracking-tighter leading-none text-slate-900">
              CALCULATE YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#E53935]">MARKET SHARE</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto font-medium">
              Input your target monthly media budget to see what our systems can extract from your local Canadian market.
            </p>
          </div>

          <div className="glass rounded-3xl border-white/80 overflow-hidden shadow-glass">
            <div className="bg-white/40 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold">ads-growly-estimator-v2.bin</span>
            </div>

            <div className="p-8 md:p-16">
              <div className="flex items-center gap-6 mb-12 border-b border-slate-100 pb-6">
                <span className="font-mono text-[#E53935] text-2xl md:text-3xl font-bold">$</span>
                <input
                  type="text"
                  value={estimateGoal}
                  onChange={(e) => setEstimateGoal(e.target.value)}
                  placeholder="ENTER TARGET BUDGET..."
                  className="bg-transparent border-none outline-none font-mono text-xl md:text-3xl text-[#111111] w-full placeholder:text-slate-200 font-bold focus:ring-0"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 border border-slate-100 bg-[#F4F7F6]/50 rounded-2xl hover:border-blue-500/30 transition-colors group">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em] mb-4 block font-bold">Est. Monthly Leads</span>
                  <div className="text-4xl md:text-5xl font-syne font-black text-blue-600 tracking-tighter group-hover:scale-105 transition-transform origin-left">
                    {(parseFloat(estimateGoal.replace(/[^0-9.]/g, "")) > 0 ? Math.round(parseFloat(estimateGoal.replace(/[^0-9.]/g, "")) / 15.2) : 0).toLocaleString()}<span className="text-xl ml-1 text-slate-300">+</span>
                  </div>
                </div>
                <div className="p-8 border border-slate-100 bg-[#F4F7F6]/50 rounded-2xl hover:border-blue-500/30 transition-colors group">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em] mb-4 block font-bold">Avg. Cost Per Lead</span>
                  <div className="text-4xl md:text-5xl font-syne font-black text-[#111111] tracking-tighter group-hover:scale-105 transition-transform origin-left">
                    {parseFloat(estimateGoal.replace(/[^0-9.]/g, "")) > 0 ? "$15.20" : "$0.00"}
                  </div>
                </div>
                <div className="p-8 border border-slate-100 bg-[#F4F7F6]/50 rounded-2xl hover:border-blue-500/30 transition-colors group">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em] mb-4 block font-bold">Projected Net ROI</span>
                  <div className="text-4xl md:text-5xl font-syne font-black text-[#E53935] tracking-tighter group-hover:scale-105 transition-transform origin-left">
                    {parseFloat(estimateGoal.replace(/[^0-9.]/g, "")) > 0 ? "840%" : "0%"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERTICALS TARGETS */}
      <section className="py-24 px-6 bg-[#F4F7F6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
            <div>
              <span className="text-[#E53935] font-mono text-xs uppercase tracking-[0.3em] mb-4 block font-bold">Verticals In Scope</span>
              <h2 className="font-syne font-extrabold text-4xl md:text-6xl tracking-tighter leading-[0.9] uppercase">
                SECTOR<br />
                <span className="text-slate-400">TARGETS</span>
              </h2>
            </div>
            <p className="font-inter text-slate-500 max-w-md text-sm md:text-base leading-relaxed font-medium">
              We specialize in high-ticket Canadian service categories where one captured lead pays for the entire month.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "HVAC", icon: "ti-air-conditioning", desc: "SECTOR_01 // AVG TICKET $8K" },
              { label: "ROOFING", icon: "ti-home-bolt", desc: "SECTOR_02 // AVG TICKET $14K" },
              { label: "DENTAL", icon: "ti-dental", desc: "SECTOR_03 // AVG LTV $6K" },
              { label: "LEGAL", icon: "ti-scale", desc: "SECTOR_04 // AVG LTV $11K" },
              { label: "REAL ESTATE", icon: "ti-building-community", desc: "SECTOR_05 // COMMISSIONS $15K+" },
              { label: "AUTO SERVICES", icon: "ti-car", desc: "SECTOR_06 // RECURRING REVENUE" }
            ].map((sec, idx) => (
              <div key={idx} className="glass bg-white/60 p-8 md:p-12 rounded-3xl flex flex-col items-start gap-6 hover:border-blue-500/30 transition-colors group">
                <i className={`ti ${sec.icon} text-4xl text-slate-400 group-hover:text-blue-500 transition-colors`} />
                <div>
                  <div className="font-syne font-bold text-xl md:text-2xl tracking-tight text-slate-700 group-hover:text-slate-900 transition-colors">{sec.label}</div>
                  <div className="font-mono text-[9px] text-slate-400 uppercase tracking-[0.25em] mt-2">{sec.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONAL CTA FORM */}
      <section id="connection-form" className="py-24 px-6 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 space-y-4">
            <span className="text-[#E53935] font-mono text-xs uppercase tracking-[0.3em] mb-2 block font-bold font-mono">Secure Your Grid</span>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl uppercase leading-none tracking-tight">DOMINATE YOUR REGION</h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              Ready to initialize the Local Presence Dominance Protocol? Secure your area code before your competitors lock you out.
            </p>
          </div>

          <div className="w-full lg:w-1/2 glass p-8 md:p-10 rounded-[2rem] border-white/80 shadow-glass relative bg-white/40">
            {formSuccess ? (
              <div className="text-center py-8 space-y-4">
                <i className="ti ti-circle-check text-5xl text-green-500 block" />
                <h3 className="text-xl font-syne font-bold text-slate-800">Connection Initialized!</h3>
                <p className="text-slate-500 text-xs">Commander node connected. Report queued for inbox delivery.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6 font-mono text-xs">
                <div className="border-b border-slate-200 py-3 flex items-center gap-3">
                  <i className="ti ti-user text-slate-400 text-lg" />
                  <input
                    type="text"
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={handleInputChange}
                    required
                    placeholder="COMMANDER NAME..."
                    className="bg-transparent border-none outline-none text-[#111111] placeholder:text-slate-300 w-full focus:ring-0 font-bold"
                  />
                </div>
                <div className="border-b border-slate-200 py-3 flex items-center gap-3">
                  <i className="ti ti-mail text-slate-400 text-lg" />
                  <input
                    type="email"
                    name="contact_email"
                    value={formData.contact_email}
                    onChange={handleInputChange}
                    required
                    placeholder="SECURE EMAIL NODE..."
                    className="bg-transparent border-none outline-none text-[#111111] placeholder:text-slate-300 w-full focus:ring-0 font-bold"
                  />
                </div>
                <div className="border-b border-slate-200 py-3 flex items-center gap-3">
                  <i className="ti ti-phone text-slate-400 text-lg" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="DIRECT CONTACT VECTOR..."
                    className="bg-transparent border-none outline-none text-[#111111] placeholder:text-slate-300 w-full focus:ring-0 font-bold"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full py-4 bg-[#111111] text-white font-syne font-bold hover:bg-slate-900 transition-all uppercase tracking-wider text-xs rounded-xl shadow-lg disabled:opacity-50"
                >
                  {formSubmitting ? "Initializing..." : "Initialize Connection"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Logo size={32} />
              <span className="font-syne text-lg font-bold">ADS GROWLY</span>
            </div>
            <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest leading-relaxed">
              Local Presence Dominance Protocol v4.0<br />
              Engineered in Ontario, Canada.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 text-xs text-slate-500 font-mono">
            <div className="flex flex-col gap-2">
              <span className="text-[#E53935] uppercase tracking-widest text-[9px] font-bold">Navigation</span>
              <Link href="/#toolkit" className="hover:text-slate-900">Strategy</Link>
              <a href="#sequence" className="hover:text-slate-900">Sequence</a>
              <a href="#sectors" className="hover:text-slate-900">Sectors</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-blue-600 uppercase tracking-widest text-[9px] font-bold">System Status</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] text-green-600">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
