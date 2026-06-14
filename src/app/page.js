"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";
import { supabase } from "@/lib/supabase";

export default function Home() {
  // GMB Geogrid Simulator States
  const [geogridVertical, setGeogridVertical] = useState("roofing");
  const [geogridState, setGeogridState] = useState("standby"); // standby, scanning, scanned, boosting, boosted
  const [geogridNodes, setGeogridNodes] = useState(Array(9).fill("--"));
  const [geogridAvg, setGeogridAvg] = useState("--");
  const [geogridDom, setGeogridDom] = useState("--");

  const scanData = {
    roofing: {
      before: { nodes: [8, 11, 14, 9, 6, 12, 11, 7, 15], avg: "10.3", dom: "0% (Invisible)" },
      after: { nodes: [1, 1, 2, 1, 2, 1, 2, 1, 3], avg: "1.5", dom: "100% (Leader)" }
    },
    hvac: {
      before: { nodes: [6, 9, 11, 7, 5, 8, 9, 12, 10], avg: "8.5", dom: "0% (Invisible)" },
      after: { nodes: [1, 2, 1, 1, 1, 2, 1, 3, 1], avg: "1.4", dom: "100% (Leader)" }
    },
    dental: {
      before: { nodes: [9, 12, 16, 11, 7, 13, 10, 8, 14], avg: "11.1", dom: "0% (Invisible)" },
      after: { nodes: [2, 1, 1, 1, 2, 1, 3, 1, 2], avg: "1.5", dom: "100% (Leader)" }
    },
    legal: {
      before: { nodes: [12, 15, 18, 14, 9, 16, 13, 11, 19], avg: "14.2", dom: "0% (Invisible)" },
      after: { nodes: [1, 1, 2, 2, 1, 1, 1, 2, 3], avg: "1.5", dom: "100% (Leader)" }
    }
  };

  const runGeogridScan = () => {
    setGeogridState("scanning");
    setGeogridNodes(Array(9).fill("--"));
    setGeogridAvg("--");
    setGeogridDom("--");

    setTimeout(() => {
      const data = scanData[geogridVertical].before;
      setGeogridNodes(data.nodes);
      setGeogridAvg(data.avg);
      setGeogridDom(data.dom);
      setGeogridState("scanned");
    }, 1500);
  };

  const runGeogridBoost = () => {
    setGeogridState("boosting");

    setTimeout(() => {
      const data = scanData[geogridVertical].after;
      setGeogridNodes(data.nodes);
      setGeogridAvg(data.avg);
      setGeogridDom(data.dom);
      setGeogridState("boosted");
    }, 1200);
  };

  // ROI Calculator States
  const [roiVertical, setRoiVertical] = useState("roofing");
  const [roiBudget, setRoiBudget] = useState(7500);
  const [calcLeads, setCalcLeads] = useState("0+");
  const [calcCpl, setCalcCpl] = useState("$0.00");
  const [calcRoi, setCalcRoi] = useState("0%");

  const sectorMetrics = {
    roofing: { cpl: 48, ticket: 14000 },
    hvac: { cpl: 28, ticket: 8000 },
    plumbing: { cpl: 22, ticket: 3500 },
    dental: { cpl: 35, ticket: 6000 },
    legal: { cpl: 65, ticket: 11000 }
  };

  useEffect(() => {
    const metrics = sectorMetrics[roiVertical];
    const leads = Math.round(roiBudget / metrics.cpl);
    const sales = leads * 0.15;
    const projectedRevenue = sales * metrics.ticket;
    const netProfit = projectedRevenue - roiBudget;
    const roi = Math.round((netProfit / roiBudget) * 100);

    setCalcLeads(leads.toLocaleString() + "+");
    setCalcCpl("$" + metrics.cpl.toFixed(2));
    setCalcRoi((roi > 0 ? roi : 0).toLocaleString() + "%");
  }, [roiVertical, roiBudget]);

  // Pricing Toggle States
  const [pricingQuarterly, setPricingQuarterly] = useState(false);

  // Multi-step Intake Form States
  const [formStep, setFormStep] = useState(1);
  const [formGmb, setFormGmb] = useState("yes");
  const [formData, setFormData] = useState({
    business_name: "",
    business_vertical: "roofing",
    website_url: "",
    ad_budget: "starter",
    contact_name: "",
    contact_email: "",
    phone: ""
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formLoadingTitle, setFormLoadingTitle] = useState("");
  const [formLoadingStatus, setFormLoadingStatus] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormNext = () => {
    if (formStep === 1) {
      if (!formData.business_name.trim()) {
        alert("Please enter your Business Name.");
        return;
      }
    }
    setFormStep(formStep + 1);
  };

  const handleFormBack = () => {
    setFormStep(formStep - 1);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.contact_name.trim() || !formData.contact_email.trim()) {
      alert("Please fill out your contact details.");
      return;
    }

    setFormLoading(true);
    setFormLoadingTitle("Analyzing local markets...");
    setFormLoadingStatus("Analyzing Google Business Profile citations...");

    // Submission payload matching API requirements
    const payload = {
      business_name: formData.business_name,
      website_url: formData.website_url,
      ad_budget: formData.ad_budget,
      contact_name: formData.contact_name,
      contact_email: formData.contact_email,
      phone: formData.phone,
      gmb_status: formGmb
    };

    // Chain loading text prompts as visually impressive animations
    setTimeout(() => {
      setFormLoadingTitle("Building Heatmap...");
      setFormLoadingStatus("Generating local search geogrid coordinates...");

      setTimeout(() => {
        setFormLoadingTitle("Generating website skeleton...");
        setFormLoadingStatus("Waiving setup fees and preparing landing page layout...");
      }, 1000);
    }, 1000);

    try {
      const { data, error } = await supabase
        .from("submissions")
        .insert([payload]);

      if (error) {
        throw new Error(error.message || "Failed to submit request.");
      }

      setTimeout(() => {
        setFormLoading(false);
        setFormSuccess(true);
      }, 3000);

    } catch (err) {
      console.error(err);
      alert("An error occurred during submission: " + err.message);
      setFormLoading(false);
    }
  };

  const handleFormReset = () => {
    setFormData({
      business_name: "",
      business_vertical: "roofing",
      website_url: "",
      ad_budget: "starter",
      contact_name: "",
      contact_email: "",
      phone: ""
    });
    setFormGmb("yes");
    setFormStep(1);
    setFormSuccess(false);
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* Background ambient radial flows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100/30 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] left-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* NAVIGATION */}
      <nav className="relative w-full z-50 px-6 md:px-10 py-6 flex justify-between items-center bg-white/30 backdrop-blur-md border-b border-slate-200/50">
        <Link href="/" className="flex items-center gap-3">
          <Logo size={40} />
          <span className="text-xl md:text-2xl font-extrabold tracking-tighter text-[#111111] font-syne">
            Ads growly<span className="text-[#E53935]">.</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
          <a href="#toolkit" className="text-slate-600 hover:text-[#111111] transition-colors">Our Systems</a>
          <a href="#gmb-engine" className="text-slate-600 hover:text-[#111111] transition-colors">GMB Local Engine</a>
          <a href="#free-website" className="text-slate-600 hover:text-[#111111] transition-colors">Free Website</a>
          <a href="#pricing" className="text-slate-600 hover:text-[#111111] transition-colors">Pricing</a>
          <Link href="/showcase" className="text-blue-600 hover:text-blue-800 transition-colors font-bold flex items-center gap-1">
            Showcase <i className="ti ti-device-laptop text-base"></i>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-xs font-mono font-bold text-slate-500 hover:text-slate-900 border border-slate-200 bg-white/60 px-4 py-2 rounded-xl transition-all hidden sm:block">
            Dashboard
          </Link>
          <a href="#audit-form" className="glass px-6 py-2.5 rounded-xl text-xs font-bold shadow-soft hover:bg-white transition-all border-slate-200/50">
            Audit Your Brand
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-24 px-6 flex flex-col items-center">
        <div className="max-w-4xl text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-100 shadow-soft mb-8">
            <span className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 font-mono">Engineered for Canada's Top Service Brands</span>
          </div>
          <h1 className="text-[2.5rem] md:text-[5rem] font-syne font-extrabold text-[#111111] leading-[0.95] tracking-tighter mb-8 uppercase">
            Growth Systems for <br />
            <span className="text-[#1E88E5] italic">Local Dominance.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            We design premium GMB rank acceleration maps, high-yielding Meta funnels, and Google Search campaigns — paired with a <strong className="text-[#111111]">Free Custom Website</strong> built to convert ad traffic at 3x industry rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#audit-form" className="bg-[#111111] text-white px-8 py-4.5 rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform">
              Claim Free Website & Audit
            </a>
            <a href="#toolkit" className="glass text-[#111111] px-8 py-4.5 rounded-2xl font-bold shadow-soft hover:bg-white transition-all">
              Explore Our Work
            </a>
          </div>

          {/* Partners Badges */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-x-10 gap-y-4 opacity-80 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <i className="ti ti-brand-meta text-2xl text-[#0668E1]" />
              <span className="text-xs font-black tracking-wider text-slate-600 uppercase font-mono">Meta Business Partner</span>
            </div>
            <div className="h-4 w-px bg-slate-300 hidden md:block" />
            <div className="flex items-center gap-2">
              <i className="ti ti-brand-google text-2xl text-[#4285F4]" />
              <span className="text-xs font-black tracking-wider text-slate-600 uppercase font-mono">Google Partner</span>
            </div>
            <div className="h-4 w-px bg-slate-300 hidden md:block" />
            <div className="flex items-center gap-2">
              <i className="ti ti-map-pin text-2xl text-[#EA4335]" />
              <span className="text-xs font-black tracking-wider text-slate-600 uppercase font-mono">GMB Verified Engine</span>
            </div>
          </div>
        </div>

        {/* Video / Graphic Shell */}
        <div className="w-full max-w-6xl mt-16 relative px-4">
          <div className="glass p-3 md:p-4 rounded-[2rem] md:rounded-[2.5rem] shadow-glass relative overflow-hidden aspect-[16/9] md:aspect-[21/9]">
            <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative border border-slate-200/50 bg-[#EAF1F7]">
              {/* Autoplay Video Background */}
              <video
                src="https://videos.pexels.com/video-files/16655800/16655800-hd_1080_1920_30fps.mp4"
                poster="https://images.pexels.com/videos/16655800/3d-color-digital-fractal-16655800.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover brightness-105 saturate-[1.05]"
              />

              {/* Float Cards */}
              <div className="absolute top-6 left-6 glass p-4 rounded-xl hidden md:flex items-center gap-4 shadow-2xl border-white/60 z-10">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-inner">
                  <i className="ti ti-brand-google-filled text-[#4285F4] text-2xl" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest font-mono">Local Rank</div>
                  <div className="text-lg font-black text-slate-800 leading-none">Top 3 Pack</div>
                  <div className="flex gap-0.5 text-[#FBBC05] mt-1">
                    <i className="ti ti-star-filled text-[10px]" />
                    <i class="ti ti-star-filled text-[10px]" />
                    <i className="ti ti-star-filled text-[10px]" />
                    <i className="ti ti-star-filled text-[10px]" />
                    <i className="ti ti-star-filled text-[10px]" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 glass p-4 rounded-xl hidden md:flex items-center gap-4 shadow-2xl border-white/60 z-10">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-inner">
                  <i className="ti ti-trending-up text-[#E53935] text-2xl" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest font-mono">Meta ROAS</div>
                  <div className="text-lg font-black text-slate-800 leading-none">4.82x Avg.</div>
                  <div className="text-[9px] font-bold text-green-600 mt-1 font-mono">+22% MoM Increase</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE TOOLKIT */}
      <section id="toolkit" className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-[#E53935] font-black uppercase text-xs tracking-widest mb-4 block font-mono">The Toolkit</span>
              <h2 className="text-3xl md:text-5xl font-syne font-extrabold leading-tight">
                Everything you need to <span className="text-slate-400 font-medium italic">own the market.</span>
              </h2>
            </div>
            <div className="pb-2">
              <p className="text-slate-500 font-medium text-sm md:text-base">
                Full-funnel execution across Canada's most critical customer touchpoints.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px] md:auto-rows-[340px]">
            {/* GMB Bento Block */}
            <div className="md:col-span-2 md:row-span-2 bento-card rounded-[2.5rem] md:rounded-[3.5rem] bg-gradient-to-br from-[#F4F7F6] to-white p-8 md:p-12 flex flex-col justify-between overflow-hidden relative border border-slate-100/50">
              <div className="z-10 relative">
                <div className="inline-flex px-3 py-1 bg-[#1E88E5]/10 rounded-full border border-[#1E88E5]/20 mb-6">
                  <span className="text-[10px] font-black uppercase tracking-tighter text-[#1E88E5] font-mono">Google Business Profile</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  The AI-Powered <br /> Local Engine.
                </h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xs font-medium">
                  We don't just manage your GMB; we weaponize it. Automatic review responses, localized posts, and Rank Tracking.
                </p>
              </div>

              {/* Simulated phone UI in bento card */}
              <div className="absolute -right-6 -bottom-10 w-64 h-[380px] bg-[#111111] rounded-[2.5rem] border-[8px] border-[#222] p-4 flex flex-col gap-3 transition-transform hover:translate-y-[-8px] duration-500 shadow-2xl">
                <div className="w-16 h-3 bg-zinc-800 rounded-full mx-auto" />
                <div className="w-full h-24 bg-zinc-900 rounded-xl relative overflow-hidden flex items-center justify-center">
                  <i className="ti ti-map-pin-filled text-[#1E88E5] text-3xl" />
                </div>
                <div className="space-y-2 text-white px-1 font-sans">
                  <div className="h-4 w-3/4 bg-zinc-800 rounded" />
                  <div className="flex gap-0.5 text-amber-400">
                    <i className="ti ti-star-filled text-[8px]" />
                    <i className="ti ti-star-filled text-[8px]" />
                    <i className="ti ti-star-filled text-[8px]" />
                    <i className="ti ti-star-filled text-[8px]" />
                    <i className="ti ti-star-filled text-[8px]" />
                  </div>
                  <div className="h-2 w-1/2 bg-zinc-800 rounded" />
                  <div className="h-2 w-5/6 bg-zinc-800 rounded" />
                </div>
              </div>
            </div>

            {/* Paid Social Bento Card */}
            <div className="md:col-span-2 bento-card rounded-[2.5rem] md:rounded-[3.5rem] bg-gradient-to-br from-purple-50 to-pink-50 p-8 md:p-10 flex flex-col justify-center relative border border-purple-100 overflow-hidden">
              <div className="relative z-10">
                <i className="ti ti-player-play-filled text-3xl md:text-4xl text-purple-600 mb-6 block" />
                <h3 className="text-xl md:text-2xl font-bold mb-2">Scroll-Stopping Meta Creative</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  UGC-style assets and static creatives engineered for local attention and 3x industry conversion rates.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex -space-x-3 overflow-hidden">
                    <img src="https://i.pravatar.cc/100?u=1" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="Client avatar" decoding="async" loading="lazy" />
                    <img src="https://i.pravatar.cc/100?u=2" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="Client avatar" decoding="async" loading="lazy" />
                    <img src="https://i.pravatar.cc/100?u=3" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="Client avatar" decoding="async" loading="lazy" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 font-mono">Used by 40+ Top Brands</span>
                </div>
              </div>
            </div>

            {/* Bento Card Small 1 */}
            <div className="bento-card rounded-[2.5rem] bg-[#111111] p-8 flex flex-col justify-between text-white border border-slate-800">
              <i className="ti ti-search text-3xl md:text-4xl text-[#E53935]" />
              <div>
                <h3 class="text-xl font-bold mb-1 tracking-tight">High-Intent Capture</h3>
                <p className="text-slate-400 text-xs md:text-sm">Snatching customers exactly when they need you most.</p>
              </div>
            </div>

            {/* Bento Card Small 2 */}
            <div className="bento-card rounded-[2.5rem] bg-[#F4F7F6] p-8 flex flex-col justify-between border border-slate-200/50">
              <i className="ti ti-refresh text-3xl md:text-4xl text-slate-400" />
              <div>
                <h3 className="text-xl font-bold mb-1 tracking-tight">Keep the lights on.</h3>
                <p className="text-slate-500 text-xs md:text-sm">24/7 Monitoring, testing, and proactive optimization.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLIGHT PLAN */}
      <section className="py-24 px-6 bg-[#F4F7F6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#E53935] font-black uppercase text-xs tracking-widest mb-4 block font-mono">The Flight Plan</span>
            <h2 className="text-4xl md:text-6xl font-syne font-extrabold tracking-tighter mb-4">
              How we launch in <span className="text-[#1E88E5]">14 days.</span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              A proven 4-step sprint that takes you from invisible to unavoidable in your local Canadian market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-[88px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#E53935]/30 via-[#1E88E5]/30 to-[#E53935]/30 -z-10" />

            <div className="glass rounded-[2rem] p-8 shadow-glass relative border-white/60 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#E53935] text-white flex items-center justify-center font-black text-lg shadow-lg mb-6">01</div>
              <i className="ti ti-zoom-scan text-3xl text-[#1E88E5] mb-4 block" />
              <h3 className="text-lg font-bold mb-2">Audit</h3>
              <p className="text-slate-500 leading-relaxed text-xs font-medium">Deep teardown of your GMB, ads history, competitors, and zip-code demand. We find the leaks before spending a dollar.</p>
              <div className="mt-6 text-[9px] font-black uppercase tracking-widest text-slate-400 font-mono">Days 1–3</div>
            </div>

            <div className="glass rounded-[2rem] p-8 shadow-glass relative border-white/60 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#E53935] text-white flex items-center justify-center font-black text-lg shadow-lg mb-6">02</div>
              <i className="ti ti-tools text-3xl text-[#1E88E5] mb-4 block" />
              <h3 className="text-lg font-bold mb-2">Build</h3>
              <p className="text-slate-500 leading-relaxed text-xs font-medium">Landing pages, tracking, creative angles, GMB optimization, and CRM routing — assembled into one connected system.</p>
              <div className="mt-6 text-[9px] font-black uppercase tracking-widest text-slate-400 font-mono">Days 4–9</div>
            </div>

            <div className="glass rounded-[2rem] p-8 shadow-glass relative border-white/60 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#E53935] text-white flex items-center justify-center font-black text-lg shadow-lg mb-6">03</div>
              <i className="ti ti-rocket text-3xl text-[#1E88E5] mb-4 block" />
              <h3 className="text-lg font-bold mb-2">Launch</h3>
              <p className="text-slate-500 leading-relaxed text-xs font-medium">Meta + Google campaigns go live with conservative bids. Every call, form, and direction request is tracked from minute one.</p>
              <div className="mt-6 text-[9px] font-black uppercase tracking-widest text-slate-400 font-mono">Days 10–14</div>
            </div>

            <div className="glass rounded-[2rem] p-8 shadow-glass relative border-white/60 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#111111] text-white flex items-center justify-center font-black text-lg shadow-lg mb-6">04</div>
              <i className="ti ti-chart-arrows-vertical text-3xl text-[#E53935] mb-4 block" />
              <h3 className="text-lg font-bold mb-2">Scale</h3>
              <p className="text-slate-500 leading-relaxed text-xs font-medium">Weekly learning loops. Winning angles get budget; losers get cut. Your cost per booked job drops month over month.</p>
              <div className="mt-6 text-[9px] font-black uppercase tracking-widest text-[#E53935] font-mono">Ongoing</div>
            </div>
          </div>
        </div>
      </section>

      {/* GMB GEOGRID SIMULATOR */}
      <section id="gmb-engine" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 bg-[#E53935]/10 rounded-full mb-6">
                <span className="text-[10px] font-black uppercase text-[#E53935] tracking-widest font-mono">Neighborhood Conquest</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-syne font-extrabold mb-6 leading-tight">
                Own your <br /><span className="text-[#1E88E5]">local map pack.</span>
              </h2>
              <p className="text-base md:text-lg text-slate-500 mb-8 leading-relaxed">
                We push your Google Business Profile to the top 3 pack, guaranteed. Stop letting competitors steal the high-intent organic traffic in your target zip codes.
              </p>

              <div className="space-y-6 bg-[#F4F7F6]/60 p-6 md:p-8 rounded-3xl border border-slate-100/80 mb-8">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 font-mono">Select Local Keyword Playbook</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      value={geogridVertical}
                      onChange={(e) => {
                        setGeogridVertical(e.target.value);
                        setGeogridState("standby");
                        setGeogridNodes(Array(9).fill("--"));
                        setGeogridAvg("--");
                        setGeogridDom("--");
                      }}
                      className="flex-grow appearance-none bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold shadow-soft focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer"
                    >
                      <option value="roofing">Residential Roof Replacement</option>
                      <option value="hvac">Emergency AC Repair Service</option>
                      <option value="dental">Emergency Dental Implants</option>
                      <option value="legal">Personal Injury Law Firms</option>
                    </select>
                    <button
                      onClick={runGeogridScan}
                      disabled={geogridState === "scanning" || geogridState === "boosting"}
                      className="bg-[#111111] text-white px-6 py-4 rounded-2xl font-bold shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all text-sm whitespace-nowrap disabled:opacity-50"
                    >
                      {geogridState === "scanning" ? "Scanning..." : "Run Audit Scan"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-5 rounded-2xl border-white/60">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1 font-mono">Average Map Rank</span>
                  <div className="text-2xl md:text-3xl font-syne font-black text-slate-700">{geogridAvg}</div>
                </div>
                <div className="glass p-5 rounded-2xl border-white/60">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1 font-mono">Search Dominance</span>
                  <div className="text-lg md:text-xl font-syne font-black text-slate-700 leading-normal">{geogridDom}</div>
                </div>
              </div>
            </div>

            {/* Geogrid Simulator Canvas Widget */}
            <div className="relative group">
              <div className="absolute -top-12 -left-12 w-72 h-72 bg-blue-100/40 rounded-full blur-[100px] -z-10" />
              <div className="glass p-6 md:p-8 rounded-[2.5rem] shadow-glass border-white/80 relative overflow-hidden">
                {/* Sonar scanning overlay */}
                {geogridState === "scanning" && (
                  <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-[1px] flex items-center justify-center z-30">
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-blue-400 opacity-30" />
                      <i className="ti ti-radar text-4xl text-blue-600 animate-spin" style={{ animationDuration: "3s" }} />
                    </div>
                  </div>
                )}

                {/* Laser Sweep bar */}
                {geogridState === "boosting" && (
                  <div className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#E53935] to-transparent shadow-[0_0_15px_#E53935] z-20 pointer-events-none animate-[pulse_1s_infinite] opacity-100" style={{ top: "50%" }} />
                )}

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-1 font-mono">Interactive GMB Geogrid</span>
                    <span className="text-xs font-bold text-slate-600 font-mono">
                      State: {geogridState === "standby" ? "Standby" : geogridState === "scanning" ? "Scanning..." : geogridState === "scanned" ? "Scan Complete (Out of 3-Pack)" : geogridState === "boosting" ? "Deploying loops..." : "Map pack dominance established"}
                    </span>
                  </div>
                  <div className={`w-3.5 h-3.5 rounded-full ${geogridState === "standby" ? "bg-slate-300" : geogridState === "scanning" ? "bg-amber-500 animate-pulse" : geogridState === "scanned" ? "bg-red-500" : geogridState === "boosting" ? "bg-blue-500 animate-pulse" : "bg-green-500 animate-pulse"}`} />
                </div>

                {/* Geogrid map nodes */}
                <div className="relative aspect-square bg-[#EAF1F7]/40 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between overflow-hidden shadow-inner mb-6">
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <i className="ti ti-map-2 text-[200px]" />
                  </div>

                  <div className="flex justify-between items-center relative z-10">
                    {[0, 1, 2].map((idx) => (
                      <div
                        key={idx}
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-syne font-bold text-base md:text-lg border transition-all duration-500 ${
                          geogridNodes[idx] === "--"
                            ? "bg-white border-slate-200 text-slate-400"
                            : geogridState === "scanned"
                            ? "bg-red-500/10 text-red-600 border-red-500/30"
                            : "bg-green-500 text-white border-green-500 shadow-md shadow-green-200 scale-105"
                        }`}
                      >
                        {geogridNodes[idx]}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center relative z-10">
                    {[3, 4, 5].map((idx) => (
                      <div
                        key={idx}
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-syne font-bold text-base md:text-lg border transition-all duration-500 ${
                          geogridNodes[idx] === "--"
                            ? "bg-white border-slate-200 text-slate-400"
                            : geogridState === "scanned"
                            ? "bg-red-500/10 text-red-600 border-red-500/30"
                            : "bg-green-500 text-white border-green-500 shadow-md shadow-green-200 scale-105"
                        }`}
                      >
                        {geogridNodes[idx]}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center relative z-10">
                    {[6, 7, 8].map((idx) => (
                      <div
                        key={idx}
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-syne font-bold text-base md:text-lg border transition-all duration-500 ${
                          geogridNodes[idx] === "--"
                            ? "bg-white border-slate-200 text-slate-400"
                            : geogridState === "scanned"
                            ? "bg-red-500/10 text-red-600 border-red-500/30"
                            : "bg-green-500 text-white border-green-500 shadow-md shadow-green-200 scale-105"
                        }`}
                      >
                        {geogridNodes[idx]}
                      </div>
                    ))}
                  </div>
                </div>

                {geogridState === "scanned" && (
                  <button
                    onClick={runGeogridBoost}
                    className="w-full py-4 bg-gradient-to-r from-[#1E88E5] to-[#1565C0] text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    Deploy GMB Engine Boost <i className="ti ti-sparkles" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUILT FOR CANADIAN SERVICE PROS */}
      <section className="py-24 px-6 bg-[#F4F7F6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
            <div>
              <div className="mb-12">
                <span className="text-[#E53935] font-black uppercase text-xs tracking-widest mb-4 block font-mono">Verticals</span>
                <h2 className="text-4xl md:text-6xl font-syne font-extrabold tracking-tighter mb-4 leading-none uppercase">
                  Built for Canadian <br /><span className="text-[#1E88E5]">service pros.</span>
                </h2>
                <p className="text-base md:text-lg text-slate-500 max-w-xl font-medium">
                  Each vertical gets its own playbook — offers, ad angles, and booking flows tuned to how your customers actually buy.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bento-card rounded-[2rem] bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 p-6 md:p-8">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-soft flex items-center justify-center mb-6">
                    <i className="ti ti-temperature-sun text-2xl text-orange-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">HVAC & Cooling</h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">Emergency call campaigns + seasonal demand surfing for furnace and AC pros.</p>
                </div>
                <div className="bento-card rounded-[2rem] bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 p-6 md:p-8">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-soft flex items-center justify-center mb-6">
                    <i className="ti ti-home-shield text-2xl text-[#1E88E5]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Roofing</h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">Storm-response funnels and financing-led offers for high-ticket replacements.</p>
                </div>
                <div className="bento-card rounded-[2rem] bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 p-6 md:p-8">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-soft flex items-center justify-center mb-6">
                    <i className="ti ti-dental text-2xl text-teal-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Dental Clinics</h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">Implant & invisalign patient pipelines with review-velocity systems.</p>
                </div>
                <div className="bento-card rounded-[2rem] bg-gradient-to-br from-slate-50 to-zinc-100 border border-slate-200 p-6 md:p-8">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-soft flex items-center justify-center mb-6">
                    <i className="ti ti-scale text-2xl text-slate-700" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Legal</h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">High-intent case capture for personal injury, family, and immigration law.</p>
                </div>
                <div className="bento-card rounded-[2rem] bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 p-6 md:p-8">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-soft flex items-center justify-center mb-6">
                    <i className="ti ti-building-community text-2xl text-[#E53935]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Real Estate</h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">Listing-launch ads, brochure funnels, and agent-routing automation.</p>
                </div>
                <div className="bento-card rounded-[2rem] bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 p-6 md:p-8">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-soft flex items-center justify-center mb-6">
                    <i className="ti ti-car text-2xl text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Auto Services</h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">Bay-filling booking flows for detailing, repair, and tire-season spikes.</p>
                </div>
              </div>
                     {/* Static vector side panel */}
            <div className="hidden lg:flex flex-col items-center gap-8 pt-16">
              <div className="relative animate-floaty">
                <div className="glass p-3 rounded-[2rem] shadow-glass border-white/70">
                  <div className="w-[280px] h-[360px] rounded-[1.5rem] relative overflow-hidden flex items-center justify-center">
                    <img
                      src="https://images.pexels.com/photos/9436715/pexels-photo-9436715.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"
                      alt="3D render of glossy cubes"
                      className="w-full h-full object-cover rounded-[1.5rem]"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-6 glass px-5 py-3.5 rounded-xl shadow-2xl border-white/70 animate-floaty2">
                  <div className="text-[8px] font-black uppercase tracking-widest text-slate-400 font-mono">Avg. across verticals</div>
                  <div className="text-xl font-black text-[#E53935] font-mono">-38% CPL</div>
                </div>
              </div>
            </div>      </div>
          </div>
        </div>
      </section>

      {/* FREE CUSTOM WEBSITE OFFER */}
      <section id="free-website" className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="glass-dark text-white p-8 md:p-16 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 bg-gradient-to-br from-[#111111] via-[#0A0B10] to-[#111111] relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 shadow-2xl">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="lg:w-3/5 relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-[#64B5F6] text-[10px] font-mono uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Premium Growth Hook
              </div>
              <h2 className="text-3xl md:text-5xl font-syne font-extrabold leading-tight tracking-tight uppercase">
                We Build Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-[#E53935]">Custom Website</span> <br />
                For Free.
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
                Why would we waive a $5,000 design fee? Because <strong>90% of local ad spend is wasted</strong> on slow, outdated websites that fail to convert traffic. To guarantee our GMB and ads campaigns succeed, we build your brand a high-converting, lightning-fast acquisition site at zero cost.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <i className="ti ti-check text-green-400" />
                  <span className="text-slate-300">Full CRM & Lead Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ti ti-check text-green-400" />
                  <span className="text-slate-300">95+ PageSpeed Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ti ti-check text-green-400" />
                  <span className="text-slate-300">Local SEO Schema Built-in</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ti ti-check text-green-400" />
                  <span className="text-slate-300">Zero Maintenance Setup Fees</span>
                </div>
              </div>
            </div>

            <div className="lg:w-2/5 w-full flex flex-col items-center justify-center relative z-10">
              <div className="glass p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] w-full border-white/10 text-center max-w-xs bg-white/5 backdrop-blur-md shadow-2xl">
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block mb-2">Waived Project Setup Value</span>
                <div className="text-3xl md:text-4xl font-mono font-extrabold text-white mb-2 tracking-tight">$4,800<span className="text-sm text-slate-400 font-sans font-normal"> CAD</span></div>
                <div className="h-0.5 w-2/3 bg-[#E53935] mx-auto my-3 rounded" />
                <div className="text-xs text-green-400 font-bold uppercase tracking-wider mb-6">100% Waived with Ads Plan</div>
                <a href="#audit-form" className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl block text-center shadow-lg shadow-blue-500/20">
                  Claim Free Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="py-24 px-6 bg-[#F4F7F6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-syne font-extrabold mb-4 leading-tight uppercase">
              Stress-test the funnel <br /><span className="text-[#E53935]">before you spend.</span>
            </h2>
            <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto font-medium">
              Stop guessing. We use 5 years of Canadian service sector data to project your ROI before we launch a single ad.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 font-mono">Your Industry Vertical</label>
                <div className="relative">
                  <select
                    value={roiVertical}
                    onChange={(e) => setRoiVertical(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-200/60 rounded-2xl px-6 py-4 text-base font-bold focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer shadow-soft"
                  >
                    <option value="roofing">Residential Roofing</option>
                    <option value="hvac">HVAC & Cooling</option>
                    <option value="plumbing">Emergency Plumbing</option>
                    <option value="dental">Dental Implants</option>
                    <option value="legal">Personal Injury Law</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                    <i className="ti ti-chevron-down text-slate-400 text-lg" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest font-mono">Monthly Media Budget</label>
                  <span className="text-xl font-black text-[#E53935] font-mono">${roiBudget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={roiBudget}
                  onChange={(e) => setRoiBudget(parseInt(e.target.value))}
                  className="mb-4 w-full"
                />
                <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase font-mono">
                  <span>$1k/mo</span>
                  <span>Scale-up</span>
                  <span>$50k/mo</span>
                </div>
              </div>
            </div>

            {/* ROI Outputs */}
            <div className="space-y-4 bg-white/40 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-white/60 shadow-glass">
              <span className="text-[#E53935] font-black uppercase text-xs tracking-widest block mb-4 font-mono">Projections Vector</span>
              <div className="grid grid-cols-1 gap-4">
                <div className="glass p-5 rounded-xl border-white/80">
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1 font-mono">Projected Monthly Leads</div>
                  <div className="text-3xl md:text-4xl font-syne font-black text-[#1E88E5]">{calcLeads}</div>
                  <div className="text-[9px] text-slate-400 mt-1">Based on local area search density</div>
                </div>
                <div className="glass p-5 rounded-xl border-white/80">
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1 font-mono">Estimated Cost Per Lead</div>
                  <div className="text-3xl md:text-4xl font-syne font-black text-slate-700">{calcCpl}</div>
                  <div className="text-[9px] text-slate-400 mt-1">Historical regional averages</div>
                </div>
                <div className="glass p-5 rounded-xl border-white/80">
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1 font-mono">Projected Net ROI</div>
                  <div className="text-3xl md:text-4xl font-syne font-black text-[#E53935]">{calcRoi}</div>
                  <div className="text-[9px] text-slate-400 mt-1">Estimated lead-to-job conversion rate: 15%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 bg-[#F4F7F6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#E53935] font-black uppercase text-xs tracking-widest mb-4 block font-mono">Fair & High-Yield Packages</span>
            <h2 className="text-3xl md:text-5xl font-syne font-extrabold text-[#111111] mb-4 leading-none uppercase">
              Growth packages <br />built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#E53935]">dominance.</span>
            </h2>
            <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto font-medium">
              No hidden fees, no complex setup fees, no lock-in contracts. Waived website setups included in traffic plans.
            </p>

            <div className="mt-8 inline-flex items-center gap-4 bg-white/60 p-2 rounded-xl shadow-soft border border-slate-100">
              <span className={`text-xs font-bold ${!pricingQuarterly ? "text-[#111111]" : "text-slate-400"}`}>Monthly</span>
              <button
                onClick={() => setPricingQuarterly(!pricingQuarterly)}
                className="w-12 h-6 bg-[#111111] rounded-full relative p-0.5 transition-all duration-300 focus:outline-none"
              >
                <span className={`w-5 h-5 bg-white rounded-full block transition-transform ${pricingQuarterly ? "translate-x-6" : "translate-x-0"}`} />
              </button>
              <span className={`text-xs font-bold ${pricingQuarterly ? "text-[#111111]" : "text-slate-400"}`}>
                Quarterly <span className="text-[9px] text-green-600 bg-green-100 px-2 py-0.5 rounded-full ml-1 font-black uppercase font-mono">Save 15%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Package 1 */}
            <div className="glass p-8 md:p-10 rounded-[2rem] border-white/60 flex flex-col justify-between shadow-soft hover:-translate-y-1 transition-transform duration-300">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1 font-mono">Tier 01</span>
                  <h3 class="text-xl font-syne font-bold">Local Starter</h3>
                  <p className="text-xs text-slate-400 mt-1">Perfect for single-location service providers.</p>
                </div>
                <div className="py-4 border-y border-slate-100 flex items-baseline gap-1.5 font-mono">
                  <span className="text-3xl md:text-4xl font-syne font-black text-slate-900">
                    {pricingQuarterly ? "$1,265" : "$1,490"}
                  </span>
                  <span className="text-xs font-bold text-slate-400">/ mo</span>
                </div>
                <ul className="space-y-3 text-xs md:text-sm font-semibold text-slate-600">
                  <li className="flex items-center gap-2"><i className="ti ti-circle-check text-blue-500 text-base" /> GMB Engine Core Optimization</li>
                  <li className="flex items-center gap-2"><i className="ti ti-circle-check text-blue-500 text-base" /> Google Map Pack geogrid tracking</li>
                  <li className="flex items-center gap-2"><i className="ti ti-circle-check text-blue-500 text-base" /> Automated review generation campaign</li>
                  <li className="flex items-center gap-2"><i className="ti ti-circle-check text-blue-500 text-base" /> Google Search Ads management</li>
                  <li className="flex items-center gap-2 text-green-600 font-bold"><i className="ti ti-gift text-base text-green-500" /> Free 1-Page Custom Landing Page</li>
                </ul>
              </div>
              <a href="#audit-form" className="mt-8 w-full py-3.5 text-center bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all block font-mono">
                Get Local Starter
              </a>
            </div>

            {/* Package 2 */}
            <div className="glass p-8 md:p-10 rounded-[2rem] border-blue-500/30 bg-gradient-to-br from-white/70 to-blue-50/20 relative flex flex-col justify-between shadow-glass hover:-translate-y-1 transition-transform duration-300 scale-105 border-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E53935] text-white text-[8px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg font-mono">
                Most Popular
              </div>
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest block mb-1 font-mono">Tier 02</span>
                  <h3 className="text-xl font-syne font-bold">Market Leader</h3>
                  <p className="text-xs text-slate-400 mt-1">Complete zip-code conquest and paid funnel lead generation.</p>
                </div>
                <div className="py-4 border-y border-blue-100 flex items-baseline gap-1.5 font-mono">
                  <span className="text-3xl md:text-4xl font-syne font-black text-slate-900">
                    {pricingQuarterly ? "$2,450" : "$2,890"}
                  </span>
                  <span className="text-xs font-bold text-slate-400">/ mo</span>
                </div>
                <ul className="space-y-3 text-xs md:text-sm font-semibold text-slate-700">
                  <li className="flex items-center gap-2"><i className="ti ti-circle-check text-blue-600 text-base" /> Complete GMB Geogrid Dominance</li>
                  <li className="flex items-center gap-2"><i className="ti ti-circle-check text-blue-600 text-base" /> Meta Ads and Retargeting pipelines</li>
                  <li className="flex items-center gap-2"><i className="ti ti-circle-check text-blue-600 text-base" /> Scroll-stopping Meta creative assets</li>
                  <li className="flex items-center gap-2"><i className="ti ti-circle-check text-blue-600 text-base" /> High-intent Google Search funnel</li>
                  <li className="flex items-center gap-2 text-green-600 font-bold"><i className="ti ti-gift text-base text-green-500" /> Free Custom Website (Up to 5 Pages)</li>
                  <li className="flex items-center gap-2"><i className="ti ti-circle-check text-blue-600 text-base" /> CRM & lead-routing automation</li>
                </ul>
              </div>
              <a href="#audit-form" className="mt-8 w-full py-3.5 text-center bg-[#111111] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all block shadow-lg font-mono">
                Conquer Your Market
              </a>
            </div>

            {/* Package 3 */}
            <div className="glass p-8 md:p-10 rounded-[2rem] border-white/60 flex flex-col justify-between shadow-soft hover:-translate-y-1 transition-transform duration-300">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1 font-mono">Tier 03</span>
                  <h3 className="text-xl font-syne font-bold">Enterprise Scale</h3>
                  <p className="text-xs text-slate-400 mt-1">Custom multi-location packages for franchises and major networks.</p>
                </div>
                <div className="py-4 border-y border-slate-100 flex items-baseline gap-1.5 font-mono">
                  <span className="text-3xl font-syne font-black text-slate-900">Custom</span>
                </div>
                <ul className="space-y-3 text-xs md:text-sm font-semibold text-slate-600">
                  <li className="flex items-center gap-2"><i className="ti ti-circle-check text-blue-500 text-base" /> Multi-location geogrid reporting</li>
                  <li className="flex items-center gap-2"><i className="ti ti-circle-check text-blue-500 text-base" /> Dedicated ad creative content sprints</li>
                  <li className="flex items-center gap-2"><i className="ti ti-circle-check text-blue-500 text-base" /> Custom CRM integrations & API hooks</li>
                  <li className="flex items-center gap-2"><i className="ti ti-circle-check text-blue-500 text-base" /> Dedicated account director (24/7)</li>
                  <li className="flex items-center gap-2 text-green-600 font-bold"><i className="ti ti-gift text-base text-green-500" /> Free Multi-Location Directory Site</li>
                </ul>
              </div>
              <a href="#audit-form" className="mt-8 w-full py-3.5 text-center bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all block font-mono">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE AUDIT FORM */}
      <section id="audit-form" className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="text-[#E53935] font-black uppercase text-xs tracking-widest mb-4 block font-mono">Engine Intake</span>
            <h2 className="text-4xl md:text-5xl font-syne font-extrabold text-[#111111] mb-4 leading-none uppercase">
              Claim your free <br />audit & website.
            </h2>
            <p className="text-base md:text-lg text-slate-500 font-medium">
              Get a complete local heatmap audit, keyword roadmap, and custom conversion landing page blueprint — 100% free.
            </p>
          </div>

          {/* Multi-step Form Card */}
          <div className="glass p-6 md:p-10 rounded-[2.5rem] border-white/80 shadow-glass relative bg-white/40 backdrop-blur-md">
            {/* Step Indicators */}
            <div className="flex justify-between items-center mb-10 max-w-sm mx-auto relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${(formStep - 1) * 50}%` }}
              />

              {[1, 2, 3].map((step) => (
                <div key={step} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full font-syne font-bold text-xs flex items-center justify-center transition-colors ${
                      formStep >= step ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {step}
                  </div>
                  <span className="text-[8px] font-black uppercase text-slate-400 mt-2 tracking-widest font-mono">
                    {step === 1 ? "Business" : step === 2 ? "Needs" : "Contact"}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* STEP 1 */}
              {formStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Business Name</label>
                      <input
                        type="text"
                        name="business_name"
                        value={formData.business_name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Paramount Roofing"
                        className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold shadow-soft outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Industry Vertical</label>
                      <select
                        name="business_vertical"
                        value={formData.business_vertical}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold shadow-soft outline-none focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer"
                      >
                        <option value="roofing">Residential Roofing</option>
                        <option value="hvac">HVAC & Cooling</option>
                        <option value="plumbing">Plumbing & Drains</option>
                        <option value="dental">Dental & Invisalign</option>
                        <option value="legal">Personal Injury Law</option>
                        <option value="other">Other Local Service</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Do you currently have a Google Map Listing (GMB)?</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormGmb("yes")}
                        className={`py-3.5 rounded-2xl font-bold text-xs transition-all focus:outline-none uppercase tracking-wider ${
                          formGmb === "yes" ? "bg-blue-50 border-2 border-blue-500 text-blue-600" : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        Yes, verified
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormGmb("no")}
                        className={`py-3.5 rounded-2xl font-bold text-xs transition-all focus:outline-none uppercase tracking-wider ${
                          formGmb === "no" ? "bg-blue-50 border-2 border-blue-500 text-blue-600" : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        No / not sure
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {formStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Current Website URL</label>
                    <input
                      type="url"
                      name="website_url"
                      value={formData.website_url}
                      onChange={handleInputChange}
                      placeholder="e.g. www.paramountroofing.ca"
                      className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold shadow-soft outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                    />
                    <span className="text-[9px] text-slate-400 font-bold mt-2 block font-mono">If none, we build your new landing page for free!</span>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Target Monthly Ad Budget</label>
                    <select
                      name="ad_budget"
                      value={formData.ad_budget}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold shadow-soft outline-none focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer"
                    >
                      <option value="starter">Under $2,500 / mo</option>
                      <option value="growth">$2,500 - $5,000 / mo</option>
                      <option value="scale">$5,000 - $10,000 / mo</option>
                      <option value="enterprise">Over $10,000 / mo</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {formStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Full Name</label>
                    <input
                      type="text"
                      name="contact_name"
                      value={formData.contact_name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                      className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold shadow-soft outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Work Email Address</label>
                      <input
                        type="email"
                        name="contact_email"
                        value={formData.contact_email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@paramountroofing.ca"
                        className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold shadow-soft outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(647) 555-0199"
                        className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold shadow-soft outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Control Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleFormBack}
                  disabled={formStep === 1}
                  className="px-6 py-2.5 border border-slate-200 text-slate-500 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-slate-50 disabled:opacity-50 transition-all font-mono"
                >
                  Back
                </button>
                {formStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleFormNext}
                    className="bg-[#111111] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform shadow-md font-mono"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#E53935] to-[#D81B60] text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-red-100 font-mono animate-pulse"
                  >
                    Claim Free Audit
                  </button>
                )}
              </div>
            </form>

            {/* Loading Overlay */}
            {formLoading && (
              <div className="absolute inset-0 bg-white/95 rounded-[2.5rem] z-30 flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
                <div className="relative flex items-center justify-center mb-6">
                  <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-blue-400 opacity-20" />
                  <i className="ti ti-loader text-4xl text-blue-500 animate-spin" />
                </div>
                <h4 className="text-xl font-syne font-bold mb-2">{formLoadingTitle}</h4>
                <p className="text-slate-400 text-xs font-mono">{formLoadingStatus}</p>
              </div>
            )}

            {/* Success Overlay */}
            {formSuccess && (
              <div className="absolute inset-0 bg-white/95 rounded-[2.5rem] z-30 flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fadeIn">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-500 shadow-md">
                  <i className="ti ti-circle-check text-2xl" />
                </div>
                <h4 className="text-2xl font-syne font-black text-slate-800">Engine Claimed!</h4>
                <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                  A GMB Geogrid rank audit and custom website wireframe blueprint have been queued for generation. Check your inbox at <span className="font-bold text-blue-600">{formData.contact_email}</span> in 15 minutes for our detailed report.
                </p>
                <button
                  type="button"
                  onClick={handleFormReset}
                  className="px-6 py-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all font-bold text-xs uppercase tracking-widest rounded-xl font-mono"
                >
                  Submit Another
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 relative z-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Logo size={32} />
              <span className="text-lg font-extrabold tracking-tighter font-syne">
                Ads growly<span className="text-[#E53935]">.</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              Premium local acquisition engines.<br />
              Serving key Canadian metropolitan hubs.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 text-xs text-slate-500 font-semibold font-mono">
            <div className="flex flex-col gap-3">
              <span className="text-[#E53935] uppercase tracking-widest text-[9px] font-black">Our Work</span>
              <a href="#toolkit" className="hover:text-slate-900 transition-colors">Our Systems</a>
              <a href="#gmb-engine" className="hover:text-slate-900 transition-colors">GMB Engine</a>
              <a href="#free-website" className="hover:text-slate-900 transition-colors">Free Website</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[#1E88E5] uppercase tracking-widest text-[9px] font-black">Connect</span>
              <a href="#audit-form" className="hover:text-slate-900 transition-colors">Audit Form</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Ontario HQ</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-slate-400 uppercase tracking-widest text-[9px] font-black">System Pulse</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-semibold text-slate-400 font-mono">
          <span>© 2026 Ads Growly. Absolute Dominance Protocol.</span>
          <span>Security Code: AES-GCM-256</span>
        </div>
      </footer>
    </div>
  );
}
