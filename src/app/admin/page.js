"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Eye,
  Lock,
  LogOut,
  Mail,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import Logo from "@/components/Logo";

const statusOptions = ["pending", "contacted", "qualified", "closed"];

const statusLabels = {
  pending: "Pending",
  contacted: "Contacted",
  qualified: "Qualified",
  closed: "Closed",
};

function formatDate(value) {
  if (!value) return "Not recorded";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <article className="admin-stat">
      <Icon size={26} />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

function LoginPanel({ mode, onLogin }) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to unlock admin panel.");
      }

      setPasscode("");
      onLogin();
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-shell">
      <Link href="/" className="brand-link admin-login-brand">
        <Logo size={40} />
        <span>Ads Growly</span>
      </Link>

      <section className="admin-login-panel">
        <span className="login-lock">
          <Lock size={32} />
        </span>
        <h1>Admin panel</h1>
        <p>Enter passcode to continue</p>

        <form onSubmit={submitLogin}>
          <label>
            Passcode
            <input
              type="password"
              value={passcode}
              onChange={(event) => setPasscode(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="button button-primary submit-button" type="submit" disabled={loading}>
            {loading ? "Unlocking..." : "Unlock"}
          </button>
        </form>
      </section>

      {mode === "local-preview" && (
        <p className="admin-dev-note">
          Local preview passcode: <strong>local-preview</strong>. Set <code>ADMIN_PASSCODE</code>{" "}
          before deploying.
        </p>
      )}
    </main>
  );
}

function EmptyState() {
  return (
    <div className="admin-empty-state">
      <span>
        <Mail size={36} />
      </span>
      <h2>No submissions yet</h2>
      <p>New form submissions will appear here.</p>
    </div>
  );
}

function LeadMobileCard({ lead, onStatusChange, onDelete }) {
  return (
    <article className="lead-mobile-card">
      <div className="lead-card-top">
        <div>
          <h3>{lead.business_name}</h3>
          <p>{lead.contact_name}</p>
        </div>
        <span className={`status-chip status-${lead.status || "pending"}`}>
          {statusLabels[lead.status || "pending"]}
        </span>
      </div>

      <dl>
        <div>
          <dt>Email</dt>
          <dd>{lead.contact_email}</dd>
        </div>
        {lead.phone && (
          <div>
            <dt>Phone</dt>
            <dd>{lead.phone}</dd>
          </div>
        )}
        <div>
          <dt>Budget</dt>
          <dd>{lead.ad_budget || "Not provided"}</dd>
        </div>
        <div>
          <dt>Google profile</dt>
          <dd>{lead.gmb_status || "Not provided"}</dd>
        </div>
        <div>
          <dt>Received</dt>
          <dd>{formatDate(lead.created_at)}</dd>
        </div>
      </dl>

      <div className="lead-card-actions">
        <select value={lead.status || "pending"} onChange={(event) => onStatusChange(lead.id, event.target.value)}>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => onDelete(lead.id)} aria-label={`Delete ${lead.business_name}`}>
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [mode, setMode] = useState("production");
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const stats = useMemo(() => {
    return submissions.reduce(
      (current, lead) => {
        const status = lead.status || "pending";
        return {
          total: current.total + 1,
          pending: current.pending + (status === "pending" ? 1 : 0),
          contacted: current.contacted + (status === "contacted" ? 1 : 0),
          qualified: current.qualified + (status === "qualified" ? 1 : 0),
        };
      },
      { total: 0, pending: 0, contacted: 0, qualified: 0 },
    );
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return submissions.filter((lead) => {
      const matchesStatus = statusFilter === "all" || (lead.status || "pending") === statusFilter;
      const searchable = [lead.business_name, lead.contact_name, lead.contact_email, lead.phone, lead.website_url]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return matchesStatus && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [query, statusFilter, submissions]);

  const loadSubmissions = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/submissions", { cache: "no-store" });
      const result = await response.json();

      if (response.status === 401) {
        setAuthenticated(false);
        return;
      }

      if (!response.ok) {
        throw new Error(result.error || "Unable to load submissions.");
      }

      setSubmissions(result.submissions || []);
      setMode(result.mode || "production");
      setAuthenticated(true);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch("/api/admin/session", { cache: "no-store" });
        const result = await response.json();
        setMode(result.mode || "production");

        if (result.authenticated) {
          await loadSubmissions();
        }
      } finally {
        setAuthChecked(true);
      }
    }

    checkSession();
  }, []);

  const updateStatus = async (id, status) => {
    const previous = submissions;
    setSubmissions((current) => current.map((lead) => (lead.id === id ? { ...lead, status } : lead)));

    try {
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to update status.");
      }
    } catch (statusError) {
      setSubmissions(previous);
      setError(statusError.message);
    }
  };

  const deleteLead = async (id) => {
    const lead = submissions.find((submission) => submission.id === id);
    if (!window.confirm(`Delete ${lead?.business_name || "this submission"}?`)) return;

    const previous = submissions;
    setSubmissions((current) => current.filter((submission) => submission.id !== id));

    try {
      const response = await fetch(`/api/admin/submissions/${id}`, { method: "DELETE" });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to delete submission.");
      }
    } catch (deleteError) {
      setSubmissions(previous);
      setError(deleteError.message);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setSubmissions([]);
  };

  if (!authChecked) {
    return (
      <main className="admin-loading">
        <RefreshCw size={28} className="spin" />
        <span>Loading admin panel...</span>
      </main>
    );
  }

  if (!authenticated) {
    return <LoginPanel mode={mode} onLogin={loadSubmissions} />;
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <Link href="/" className="brand-link">
          <Logo size={38} />
          <span>Ads Growly</span>
        </Link>
        <div className="admin-header-actions">
          <button type="button" className="button button-secondary" onClick={loadSubmissions} disabled={loading}>
            <RefreshCw size={17} className={loading ? "spin" : ""} />
            Refresh
          </button>
          <Link href="/" className="button button-secondary">
            <ArrowLeft size={17} />
            Back to site
          </Link>
          <button type="button" className="button button-danger" onClick={logout}>
            <LogOut size={17} />
            Lock
          </button>
        </div>
      </header>

      <section className="admin-main">
        <div className="admin-title-row">
          <div>
            <h1>Admin panel</h1>
            <p>{mode === "local-preview" ? "Local preview storage is active until Supabase is connected." : "Supabase-backed submissions are ready."}</p>
          </div>
          <ShieldCheck size={30} />
        </div>

        <div className="admin-stats-grid">
          <StatCard label="Total" value={stats.total} icon={Users} />
          <StatCard label="Pending" value={stats.pending} icon={Clock3} />
          <StatCard label="Contacted" value={stats.contacted} icon={Phone} />
          <StatCard label="Qualified" value={stats.qualified} icon={CheckCircle2} />
        </div>

        <div className="admin-toolbar">
          <label className="admin-search">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search business or contact..."
            />
          </label>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="all">All status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="admin-error">{error}</p>}

        <section className="admin-table-shell">
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Business</th>
                  <th>Contact</th>
                  <th>Budget</th>
                  <th>Google profile</th>
                  <th>Received</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <strong>{lead.business_name}</strong>
                      {lead.website_url && (
                        <a href={lead.website_url} target="_blank" rel="noreferrer">
                          {lead.website_url}
                        </a>
                      )}
                    </td>
                    <td>
                      <strong>{lead.contact_name}</strong>
                      <span>{lead.contact_email}</span>
                      {lead.phone && <span>{lead.phone}</span>}
                    </td>
                    <td>{lead.ad_budget || "Not provided"}</td>
                    <td>{lead.gmb_status || "Not provided"}</td>
                    <td>{formatDate(lead.created_at)}</td>
                    <td>
                      <select
                        value={lead.status || "pending"}
                        onChange={(event) => updateStatus(lead.id, event.target.value)}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {statusLabels[status]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <div className="table-actions">
                        {lead.website_url && (
                          <a href={lead.website_url} target="_blank" rel="noreferrer" aria-label="Open website">
                            <Eye size={17} />
                          </a>
                        )}
                        <button type="button" onClick={() => deleteLead(lead.id)} aria-label={`Delete ${lead.business_name}`}>
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!loading && filteredSubmissions.length === 0 && <EmptyState />}
          {loading && (
            <div className="admin-empty-state">
              <RefreshCw size={34} className="spin" />
              <h2>Loading submissions</h2>
            </div>
          )}
        </section>

        <section className="lead-mobile-list">
          {!loading &&
            filteredSubmissions.map((lead) => (
              <LeadMobileCard key={lead.id} lead={lead} onStatusChange={updateStatus} onDelete={deleteLead} />
            ))}
          {!loading && filteredSubmissions.length === 0 && <EmptyState />}
        </section>
      </section>
    </main>
  );
}
