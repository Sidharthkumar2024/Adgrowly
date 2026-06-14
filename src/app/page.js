"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Database,
  ExternalLink,
  FormInput,
  Globe2,
  LayoutDashboard,
  MapPin,
  Megaphone,
  MousePointerClick,
  Rocket,
  Search,
  ShieldCheck,
  Target,
} from "lucide-react";
import Logo from "@/components/Logo";

const systems = [
  {
    title: "Google Business Profile",
    description:
      "Profile structure, local content, review workflows, and map visibility checks for high-intent local searches.",
    icon: MapPin,
    items: ["Profile optimization", "Local posts and updates", "Review request flow", "Visibility tracking"],
  },
  {
    title: "Google Ads",
    description:
      "Intent-led search campaigns with location targeting, call tracking, and landing pages built around booked jobs.",
    icon: Search,
    items: ["Search campaigns", "Location targeting", "Call and form tracking", "Budget pacing"],
  },
  {
    title: "Meta campaigns",
    description:
      "Audience-led campaigns for demand creation, retargeting, and service offers that move prospects into your pipeline.",
    icon: Megaphone,
    items: ["Lead generation", "Retargeting", "Creative testing", "Cost tracking"],
  },
];

const processSteps = [
  {
    title: "Intake",
    copy: "You submit business details, market goals, current setup, and contact information.",
    icon: FormInput,
  },
  {
    title: "Plan",
    copy: "We map the local growth system: profile work, campaigns, tracking, and conversion pages.",
    icon: Target,
  },
  {
    title: "Launch",
    copy: "Campaigns, forms, calls, and routing go live with clean measurement from day one.",
    icon: Rocket,
  },
  {
    title: "Optimize",
    copy: "Results are reviewed, budgets are adjusted, and the system improves around booked jobs.",
    icon: BarChart3,
  },
];

const initialForm = {
  business_name: "",
  business_vertical: "",
  website_url: "",
  ad_budget: "",
  contact_name: "",
  contact_email: "",
  phone: "",
  gmb_status: "",
};

function PipelineVisual() {
  const flow = [
    { label: "Google Business Profile", detail: "Visibility", icon: Globe2 },
    { label: "Google Ads", detail: "Intent clicks", icon: MousePointerClick },
    { label: "Meta campaigns", detail: "Demand", icon: Megaphone },
    { label: "Leads", detail: "Booked jobs", icon: Database },
  ];

  return (
    <div className="hero-visual" aria-label="Ads Growly local growth pipeline preview">
      <div className="map-panel" aria-hidden="true">
        <div className="map-river" />
        <div className="map-focus" />
        {[12, 34, 53, 68, 82].map((top, index) => (
          <span
            key={top}
            className="map-pin"
            style={{
              top: `${top}%`,
              left: `${index % 2 === 0 ? 18 + index * 12 : 56 + index * 5}%`,
            }}
          >
            <MapPin size={22} strokeWidth={2.8} />
          </span>
        ))}
      </div>
      <div className="pipeline-panel">
        {flow.map((item, index) => {
          const Icon = item.icon;
          return (
            <div className="pipeline-row" key={item.label}>
              <div className={`pipeline-icon ${index === flow.length - 1 ? "pipeline-icon-red" : ""}`}>
                <Icon size={20} strokeWidth={2.4} />
              </div>
              <div>
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </div>
              {index < flow.length - 1 && <ArrowRight className="pipeline-arrow" size={16} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SystemCard({ system }) {
  const Icon = system.icon;

  return (
    <article className="system-card">
      <div className="system-card-header">
        <span className="icon-box">
          <Icon size={24} strokeWidth={2.4} />
        </span>
        <h3>{system.title}</h3>
      </div>
      <p>{system.description}</p>
      <ul>
        {system.items.map((item) => (
          <li key={item}>
            <CheckCircle2 size={16} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ProcessStep({ step, index }) {
  const Icon = step.icon;

  return (
    <article className="process-step">
      <span className="step-number">{index + 1}</span>
      <span className="process-icon">
        <Icon size={26} strokeWidth={2.2} />
      </span>
      <h3>{step.title}</h3>
      <p>{step.copy}</p>
    </article>
  );
}

export default function Home() {
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submittedLead, setSubmittedLead] = useState(null);

  const submittedRows = useMemo(() => {
    if (!submittedLead) return [];
    return [
      ["Business", submittedLead.business_name],
      ["Contact", submittedLead.contact_name],
      ["Email", submittedLead.contact_email],
      ["Budget", submittedLead.ad_budget],
      ["Google profile", submittedLead.gmb_status],
    ].filter(([, value]) => value);
  }, [submittedLead]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setSubmittedLead(null);
    setError("");
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit intake right now.");
      }

      setSubmittedLead(result.submission);
      setFormData(initialForm);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="site-shell">
      <header className="site-header">
        <Link href="/" className="brand-link" aria-label="Ads Growly home">
          <Logo size={38} />
          <span>Ads Growly</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#systems">Systems</a>
          <a href="#process">Process</a>
          <a href="#intake">Intake</a>
          <Link href="/admin">Admin</Link>
        </nav>

        <a href="#intake" className="header-cta">
          Start intake
        </a>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <h1 aria-label="Local growth systems for service businesses">
            <span>Local growth</span>
            <span>systems for</span>
            <span className="hero-title-last">
              <span>service</span>
              <span>businesses</span>
            </span>
          </h1>
          <p>
            Google Business Profile, Google Ads, Meta campaigns, and conversion pages built as one
            connected pipeline.
          </p>
          <div className="hero-actions">
            <a href="#intake" className="button button-primary">
              Start intake
              <ArrowRight size={18} />
            </a>
            <a href="#process" className="button button-secondary">
              View process
            </a>
          </div>
        </div>
        <PipelineVisual />
      </section>

      <section id="systems" className="section-block systems-section">
        <div className="section-heading">
          <h2>Systems</h2>
          <p>Three core systems working together to generate consistent local growth.</p>
        </div>
        <div className="systems-grid">
          {systems.map((system) => (
            <SystemCard key={system.title} system={system} />
          ))}
        </div>
      </section>

      <section id="process" className="section-block process-section">
        <div className="section-heading">
          <h2>Process</h2>
          <p>A clear path from business intake to measured campaign improvement.</p>
        </div>
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <ProcessStep key={step.title} step={step} index={index} />
          ))}
        </div>
      </section>

      <section id="intake" className="intake-section">
        <div className="intake-copy">
          <h2>Start your intake</h2>
          <p>
            Submit your details once. The same submission is stored for the admin panel, so you can
            test the flow locally before connecting Supabase.
          </p>
          <div className="privacy-list">
            <div>
              <ShieldCheck size={22} />
              <span>Server-side submission route</span>
            </div>
            <div>
              <ClipboardCheck size={22} />
              <span>Shown instantly in the admin panel</span>
            </div>
            <div>
              <LayoutDashboard size={22} />
              <span>Ready for Vercel and Supabase env vars</span>
            </div>
          </div>
        </div>

        <div className="intake-card">
          {submittedLead ? (
            <div className="submission-result">
              <CheckCircle2 size={42} />
              <h3>Submission received</h3>
              <p>This lead is now available in the admin panel.</p>
              <dl>
                {submittedRows.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="result-actions">
                <Link href="/admin" className="button button-primary">
                  Open admin
                  <ExternalLink size={17} />
                </Link>
                <button className="button button-secondary" type="button" onClick={resetForm}>
                  Add another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submitForm} className="intake-form">
              <div className="form-grid">
                <label>
                  Business name <span>*</span>
                  <input
                    name="business_name"
                    value={formData.business_name}
                    onChange={updateField}
                    autoComplete="organization"
                    required
                  />
                </label>
                <label>
                  Service type
                  <input
                    name="business_vertical"
                    value={formData.business_vertical}
                    onChange={updateField}
                    autoComplete="off"
                  />
                </label>
                <label>
                  Website URL
                  <input
                    name="website_url"
                    value={formData.website_url}
                    onChange={updateField}
                    inputMode="url"
                    autoComplete="url"
                  />
                </label>
                <label>
                  Monthly ad budget <span>*</span>
                  <select name="ad_budget" value={formData.ad_budget} onChange={updateField} required>
                    <option value="">Select budget</option>
                    <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                    <option value="$3,000 - $7,500">$3,000 - $7,500</option>
                    <option value="$7,500 - $15,000">$7,500 - $15,000</option>
                    <option value="$15,000+">$15,000+</option>
                  </select>
                </label>
                <label>
                  Contact name <span>*</span>
                  <input
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={updateField}
                    autoComplete="name"
                    required
                  />
                </label>
                <label>
                  Work email <span>*</span>
                  <input
                    type="email"
                    name="contact_email"
                    value={formData.contact_email}
                    onChange={updateField}
                    autoComplete="email"
                    required
                  />
                </label>
                <label>
                  Phone
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={updateField}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </label>
                <label>
                  Google Business Profile status <span>*</span>
                  <select name="gmb_status" value={formData.gmb_status} onChange={updateField} required>
                    <option value="">Select status</option>
                    <option value="Verified">Verified</option>
                    <option value="Not verified">Not verified</option>
                    <option value="Not sure">Not sure</option>
                    <option value="No profile yet">No profile yet</option>
                  </select>
                </label>
              </div>

              {error && <p className="form-error">{error}</p>}

              <button className="button button-primary submit-button" type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit intake"}
                {!submitting && <ArrowRight size={18} />}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="site-footer">
        <Link href="/" className="brand-link">
          <Logo size={34} />
          <span>Ads Growly</span>
        </Link>
        <span>© {new Date().getFullYear()} Ads Growly. All rights reserved.</span>
      </footer>
    </main>
  );
}
