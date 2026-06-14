import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl && 
                     supabaseAnonKey && 
                     !supabaseUrl.includes("placeholder-project-url") &&
                     supabaseUrl !== "";

let supabaseClient;

if (isConfigured) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Mock client implementation for demo/build/unconfigured states
  const getMockData = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ads_growly_submissions");
      return stored ? JSON.parse(stored) : [];
    }
    if (!global._mockDb) {
      global._mockDb = [];
    }
    return global._mockDb;
  };

  const saveMockData = (data) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ads_growly_submissions", JSON.stringify(data));
    }
    global._mockDb = data;
  };

  const mockFrom = (table) => {
    return {
      select: () => {
        return {
          order: (column, { ascending } = {}) => {
            let data = [...getMockData()];
            data.sort((a, b) => {
              const valA = a[column];
              const valB = b[column];
              if (ascending) {
                return valA > valB ? 1 : -1;
              } else {
                return valA < valB ? 1 : -1;
              }
            });
            return Promise.resolve({ data, error: null });
          },
          then: (resolve) => {
            resolve({ data: getMockData(), error: null });
            return Promise.resolve({ data: getMockData(), error: null });
          }
        };
      },
      insert: (records) => {
        const current = getMockData();
        const newRecords = records.map(r => ({
          id: Math.random().toString(36).substr(2, 9),
          created_at: new Date().toISOString(),
          status: "pending",
          ...r
        }));
        const updated = [...current, ...newRecords];
        saveMockData(updated);
        return {
          select: () => ({
            then: (resolve) => {
              resolve({ data: newRecords, error: null });
              return Promise.resolve({ data: newRecords, error: null });
            }
          }),
          then: (resolve) => {
            resolve({ data: newRecords, error: null });
            return Promise.resolve({ data: newRecords, error: null });
          }
        };
      },
      update: (fields) => {
        return {
          eq: (key, val) => {
            const current = getMockData();
            const updated = current.map(item => {
              if (item[key] === val) {
                return { ...item, ...fields };
              }
              return item;
            });
            saveMockData(updated);
            return Promise.resolve({ data: updated.filter(item => item[key] === val), error: null });
          }
        };
      },
      delete: () => {
        return {
          eq: (key, val) => {
            const current = getMockData();
            const updated = current.filter(item => item[key] !== val);
            saveMockData(updated);
            return Promise.resolve({ data: [], error: null });
          }
        };
      }
    };
  };

  supabaseClient = {
    from: mockFrom
  };
}

export const supabase = supabaseClient;


