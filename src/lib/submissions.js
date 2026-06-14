import { createClient } from "@supabase/supabase-js";

const allowedStatuses = new Set(["pending", "contacted", "qualified", "closed"]);

let publicClient = null;
let adminClient = null;

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
}

function getSecretKey() {
  return process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

function getSupabaseClient({ admin = false } = {}) {
  const url = getSupabaseUrl();
  const key = admin ? getSecretKey() : getSecretKey();

  if (!url || !key) {
    return null;
  }

  if (admin) {
    if (!adminClient) {
      adminClient = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
    }
    return adminClient;
  }

  if (!publicClient) {
    publicClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return publicClient;
}

function localSubmissions() {
  if (!globalThis.__adgrowlySubmissions) {
    globalThis.__adgrowlySubmissions = [];
  }

  return globalThis.__adgrowlySubmissions;
}

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeUrl(value) {
  const input = cleanString(value);
  if (!input) return "";
  if (/^https?:\/\//i.test(input)) return input;
  return `https://${input}`;
}

function normalizeSubmission(input) {
  const submission = {
    business_name: cleanString(input.business_name),
    business_vertical: cleanString(input.business_vertical),
    website_url: normalizeUrl(input.website_url),
    ad_budget: cleanString(input.ad_budget),
    contact_name: cleanString(input.contact_name),
    contact_email: cleanString(input.contact_email).toLowerCase(),
    phone: cleanString(input.phone),
    gmb_status: cleanString(input.gmb_status),
    status: allowedStatuses.has(input.status) ? input.status : "pending",
  };

  if (!submission.business_name) {
    throw new Error("Business name is required.");
  }
  if (!submission.contact_name) {
    throw new Error("Contact name is required.");
  }
  if (!submission.contact_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.contact_email)) {
    throw new Error("A valid work email is required.");
  }
  if (!submission.ad_budget) {
    throw new Error("Monthly ad budget is required.");
  }
  if (!submission.gmb_status) {
    throw new Error("Google Business Profile status is required.");
  }

  return submission;
}

function serializeSupabaseError(error) {
  if (!error) return "Supabase request failed.";
  return error.message || error.details || "Supabase request failed.";
}

export function getDataMode() {
  return getSupabaseClient({ admin: true }) ? "supabase" : "local-preview";
}

export async function createSubmission(input) {
  const submission = normalizeSubmission(input);
  const client = getSupabaseClient();

  if (!client) {
    const localRecord = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...submission,
    };
    localSubmissions().unshift(localRecord);
    return localRecord;
  }

  const { data, error } = await client.from("submissions").insert(submission).select("*").single();

  if (error) {
    throw new Error(serializeSupabaseError(error));
  }

  return data;
}

export async function listSubmissions() {
  const client = getSupabaseClient({ admin: true });

  if (!client) {
    return localSubmissions();
  }

  const { data, error } = await client
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(serializeSupabaseError(error));
  }

  return data || [];
}

export async function updateSubmissionStatus(id, status) {
  if (!allowedStatuses.has(status)) {
    throw new Error("Invalid status.");
  }

  const client = getSupabaseClient({ admin: true });

  if (!client) {
    const rows = localSubmissions();
    const index = rows.findIndex((submission) => submission.id === id);
    if (index === -1) throw new Error("Submission not found.");
    rows[index] = { ...rows[index], status, updated_at: new Date().toISOString() };
    return rows[index];
  }

  const { data, error } = await client
    .from("submissions")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(serializeSupabaseError(error));
  }

  return data;
}

export async function deleteSubmission(id) {
  const client = getSupabaseClient({ admin: true });

  if (!client) {
    const rows = localSubmissions();
    const nextRows = rows.filter((submission) => submission.id !== id);
    globalThis.__adgrowlySubmissions = nextRows;
    return { id };
  }

  const { error } = await client.from("submissions").delete().eq("id", id);

  if (error) {
    throw new Error(serializeSupabaseError(error));
  }

  return { id };
}
