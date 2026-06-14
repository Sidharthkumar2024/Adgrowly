"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Code2,
  Database,
  ExternalLink,
  FileText,
  FormInput,
  HelpCircle,
  Layers,
  LayoutDashboard,
  Mail,
  MapPin,
  Megaphone,
  Monitor,
  Phone,
  Rocket,
  Search,
  Settings,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import Logo from "@/components/Logo";

const connectedSystems = [
  {
    title: "Conversion websites",
    description: "Fast service pages, offer pages, and landing pages built to turn paid and organic traffic into booked conversations.",
    icon: Monitor,
    items: ["Clear service positioning", "Mobile-first page flow", "Lead capture routing", "Speed and technical setup"],
  },
  {
    title: "Local SEO",
    description: "Google Business Profile, service-area signals, reviews, and location pages aligned to the searches that matter.",
    icon: MapPin,
    items: ["Profile optimization", "Local content calendar", "Review request loops", "Visibility checks"],
  },
  {
    title: "Paid acquisition",
    description: "Google and Meta campaigns connected to pages, tracking, and follow-up so every channel has a job.",
    icon: Megaphone,
    items: ["Search intent campaigns", "Meta lead campaigns", "Retargeting paths", "Budget pacing"],
  },
];

const stackItems = [
  { title: "Tracking", copy: "Calls, forms, clicks, and sources are tagged before campaigns scale.", icon: Database },
  { title: "Automation", copy: "New inquiries are routed quickly so speed-to-lead does not leak revenue.", icon: Zap },
  { title: "Creative", copy: "Offers, ad angles, and page modules are refreshed around real service demand.", icon: Layers },
  { title: "Reporting", copy: "A simple command view shows what is live, what is working, and what needs attention.", icon: BarChart3 },
];

const industries = ["Roofing", "HVAC", "Plumbing", "Dental", "Legal", "Med spas", "Home services", "Local franchises"];

const tools = [
  { title: "Local visibility scanner", copy: "See where your profile is strong, weak, or missing across a target service area." },
  { title: "Budget planner", copy: "Model a practical launch budget by service type, market size, and expected lead flow." },
  { title: "Page audit checklist", copy: "Review the conversion points that should exist before traffic is sent to a website." },
];

const websiteStack = [
  "Next.js pages for speed and clean deployment",
  "Structured intake forms connected to admin",
  "Supabase-ready lead database",
  "Tracking-ready layout for ads and local SEO",
  "Reusable page sections for future services",
  "Vercel-friendly project configuration",
];

const blueprints = [
  {
    title: "Service area site",
    copy: "A clean website for one local business with core services, city pages, and a direct intake path.",
  },
  {
    title: "Campaign landing page",
    copy: "A focused page for one offer, one audience, and one conversion goal.",
  },
  {
    title: "Local authority hub",
    copy: "A deeper structure for businesses building search visibility across many services or locations.",
  },
];

const processSteps = [
  {
    title: "Map",
    copy: "We collect your business details, service area, current website, ad budget, and Google profile status.",
    icon: FormInput,
  },
  {
    title: "Build",
    copy: "We shape the site, tracking, local search assets, campaign structure, and lead routing.",
    icon: Wrench,
  },
  {
    title: "Launch",
    copy: "Pages, forms, Google profile work, and paid campaigns go live as one operating system.",
    icon: Rocket,
  },
  {
    title: "Improve",
    copy: "We use lead quality, cost, and search visibility to keep refining the system.",
    icon: BarChart3,
  },
];

const pricingPlans = [
  {
    title: "Launch",
    price: "Starter build",
    copy: "For a local business that needs a clean website, intake flow, and first growth system.",
    items: ["Core website sections", "Lead intake form", "Local SEO setup plan", "Admin lead view"],
  },
  {
    title: "Growth",
    price: "Managed system",
    copy: "For teams ready to connect ads, search visibility, website care, and monthly optimization.",
    items: ["Everything in Launch", "Google and Meta campaign setup", "Tracking review", "Monthly improvement plan"],
  },
  {
    title: "Scale",
    price: "Multi-location",
    copy: "For service brands that need repeatable pages, reporting, and campaign systems across markets.",
    items: ["Location/page blueprint", "Advanced routing plan", "Service-area SEO structure", "Performance dashboard"],
  },
];

const faqs = [
  ["Do you copy another agency site?", "No. Ad Growly can follow a similar high-level direction, but the copy, structure, logo, and code are original."],
  ["Will the form show inside admin?", "Yes. In local preview, submissions appear in the admin panel immediately. With Supabase connected, the same flow stores rows in your database."],
  ["Can this deploy on Vercel?", "Yes. The project is a standard Next.js app with Vercel-friendly configuration and documented environment variables."],
  ["Can we add more pages later?", "Yes. The landing page is built from reusable sections so service pages, city pages, and campaign pages can be added next."],
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

function BrandText() {
  return <span>Ad Growly</span>;
}

function CommandCenter() {
  const channels = [
    { label: "Website", detail: "Conversion pages", icon: Monitor },
    { label: "Local SEO", detail: "Map visibility", icon: MapPin },
    { label: "Google Ads", detail: "Intent capture", icon: Search },
    { label: "Meta Ads", detail: "Demand creation", icon: Megaphone },
  ];

  return (
    <div className="command-center" aria-label="Ad Growly command center preview">
      <div className="command-topline">
        <span>Growth command</span>
        <strong>Live system</strong>
      </div>
      <div className="command-grid">
        <div className="command-map" aria-hidden="true">
          <span className="scan-ring scan-ring-one" />
          <span className="scan-ring scan-ring-two" />
          <span className="scan-dot scan-dot-one" />
          <span className="scan-dot scan-dot-two" />
          <span className="scan-dot scan-dot-three" />
          <span className="scan-core" />
        </div>
        <div className="command-rows">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <div className="command-row" key={channel.label}>
                <span>
                  <Icon size={18} />
                </span>
                <div>
                  <strong>{channel.label}</strong>
                  <small>{channel.detail}</small>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="command-footer">
        <div>
          <small>Routing</small>
          <strong>Forms + calls</strong>
        </div>
        <div>
          <small>Focus</small>
          <strong>Booked jobs</strong>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ title, copy }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function FeatureCard({ item }) {
  const Icon = item.icon;

  return (
    <article className="system-card">
      <div className="system-card-header">
        <span className="icon-box">
          <Icon size={24} strokeWidth={2.4} />
        </span>
        <h3>{item.title}</h3>
      </div>
      <p>{item.description}</p>
      <ul>
        {item.items.map((line) => (
          <li key={line}>
            <CheckCircle2 size={16} />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function MiniCard({ item }) {
  const Icon = item.icon;

  return (
    <article className="mini-card">
      <span className="mini-icon">
        <Icon size={22} />
      </span>
      <h3>{item.title}</h3>
      <p>{item.copy}</p>
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
    <main className="site-shell adgrowly-longform">
      <header className="site-header">
        <Link href="/" className="brand-link" aria-label="Ad Growly home">
          <Logo size={38} />
          <BrandText />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#systems">Systems</a>
          <a href="#seo">SEO</a>
          <a href="#process">Process</a>
          <a href="#pricing">Pricing</a>
          <a href="#intake">Intake</a>
          <Link href="/admin">Admin</Link>
        </nav>

        <a href="#intake" className="header-cta">
          Start project
        </a>
      </header>

      <section className="agency-hero">
        <div className="agency-hero-media" aria-hidden="true">
          <Image
            src="/adgrowly-growth-visual.png"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-copy agency-hero-copy">
          <h1>A growth engine for local service brands</h1>
          <p>
            Ad Growly connects websites, local SEO, paid ads, automations, and conversion tracking
            into one clean operating system.
          </p>
          <div className="hero-actions">
            <a href="#intake" className="button button-primary">
              Start project
              <ArrowRight size={18} />
            </a>
            <a href="#systems" className="button button-secondary">
              View systems
            </a>
          </div>
        </div>
      </section>

      <section className="section-block command-section">
        <div className="split-section">
          <div>
            <SectionHeading
              title="Growth command center"
              copy="A single operating view for your website, search visibility, ads, and lead routing."
            />
          </div>
          <CommandCenter />
        </div>
      </section>

      <section id="systems" className="section-block systems-section">
        <SectionHeading
          title="One connected system"
          copy="Ad Growly is built around the pieces that actually influence local demand."
        />
        <div className="systems-grid">
          {connectedSystems.map((system) => (
            <FeatureCard key={system.title} item={system} />
          ))}
        </div>
      </section>

      <section className="section-block care-section">
        <div className="split-section reverse">
          <div className="maintenance-list">
            {["Keep forms working", "Refresh offers", "Watch page speed", "Review tracking"].map((line) => (
              <div key={line}>
                <CheckCircle2 size={18} />
                <span>{line}</span>
              </div>
            ))}
          </div>
          <div>
            <SectionHeading
              title="Website care"
              copy="A growth site is not a brochure. It needs care, measurement, and small improvements that compound over time."
            />
          </div>
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          title="Production stack"
          copy="The work is organized around practical operations: build, track, launch, and improve."
        />
        <div className="mini-grid">
          {stackItems.map((item) => (
            <MiniCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section id="seo" className="section-block seo-section">
        <div className="split-section">
          <div>
            <SectionHeading
              title="Local SEO engine"
              copy="Your Google profile, service pages, and review loops should tell the same story to both customers and search engines."
            />
            <div className="inline-actions">
              <a href="#intake" className="button button-primary">Request audit</a>
              <a href="#tools" className="button button-secondary">See tools</a>
            </div>
          </div>
          <div className="search-stack">
            <div>
              <Search size={20} />
              <span>Service keyword map</span>
            </div>
            <div>
              <MapPin size={20} />
              <span>Location and profile signals</span>
            </div>
            <div>
              <FileText size={20} />
              <span>Page structure and content plan</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block industries-section">
        <SectionHeading title="Industries we serve" copy="Built for teams where every lead has real job value." />
        <div className="industry-cloud">
          {industries.map((industry) => (
            <span key={industry}>
              <Building2 size={16} />
              {industry}
            </span>
          ))}
        </div>
      </section>

      <section id="tools" className="section-block tools-section">
        <SectionHeading title="Useful tools" copy="Simple planning tools that make the next move clearer before budget is wasted." />
        <div className="tools-grid">
          {tools.map((tool) => (
            <article key={tool.title}>
              <Settings size={22} />
              <h3>{tool.title}</h3>
              <p>{tool.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block build-stack-section">
        <div className="split-section reverse">
          <div className="build-list">
            {websiteStack.map((item) => (
              <div key={item}>
                <Code2 size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div>
            <SectionHeading
              title="Website build stack"
              copy="The Ad Growly site is structured for Vercel, Supabase, admin review, and future service pages."
            />
          </div>
        </div>
      </section>

      <section className="section-block blueprint-section">
        <SectionHeading title="Blueprints" copy="Choose the structure that matches the way your service business grows." />
        <div className="blueprint-grid">
          {blueprints.map((blueprint) => (
            <article key={blueprint.title}>
              <ClipboardCheck size={24} />
              <h3>{blueprint.title}</h3>
              <p>{blueprint.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="section-block process-section">
        <SectionHeading title="Process" copy="A clean path from intake to a working growth system." />
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <ProcessStep key={step.title} step={step} index={index} />
          ))}
        </div>
      </section>

      <section id="pricing" className="section-block pricing-section">
        <SectionHeading title="Pricing" copy="Start with the right system for the stage your business is in." />
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article key={plan.title} className={plan.title === "Growth" ? "featured-price" : ""}>
              <h3>{plan.title}</h3>
              <strong>{plan.price}</strong>
              <p>{plan.copy}</p>
              <ul>
                {plan.items.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block faq-section">
        <SectionHeading title="FAQ" copy="Short answers before you start the intake." />
        <div className="faq-grid">
          {faqs.map(([question, answer]) => (
            <article key={question}>
              <HelpCircle size={20} />
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="intake" className="intake-section">
        <div className="intake-copy">
          <h2>Start your intake</h2>
          <p>
            Tell us what you sell, where you serve customers, and what your current growth system
            looks like. Your submission appears in the admin panel.
          </p>
          <div className="privacy-list">
            <div>
              <ShieldCheck size={22} />
              <span>Server-side submission route</span>
            </div>
            <div>
              <LayoutDashboard size={22} />
              <span>Shown instantly in the admin panel</span>
            </div>
            <div>
              <Clock3 size={22} />
              <span>Ready for Supabase and Vercel</span>
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
          <BrandText />
        </Link>
        <div className="footer-contact">
          <span>
            <Mail size={15} />
            Intake through the form
          </span>
          <span>
            <Phone size={15} />
            Admin-ready leads
          </span>
        </div>
      </footer>
    </main>
  );
}
