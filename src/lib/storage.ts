export type Registration = {
  id: string;
  name: string;
  phone: string;
  state: string;
  lga: string;
  community: string;
  timestamp: string;
};

export type FloodReport = {
  id: string;
  type: string;
  severity: string;
  location: string;
  description: string;
  image?: string;
  timestamp: string;
  status: "PENDING" | "VERIFIED" | "RESOLVED";
};

const REGISTRATIONS_KEY = "floodguard_registrations";
const REPORTS_KEY = "floodguard_reports";

export const storage = {
  saveRegistration: (data: Omit<Registration, "id" | "timestamp">) => {
    const registrations = storage.getRegistrations();
    const newReg: Registration = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify([...registrations, newReg]));
    return newReg;
  },

  getRegistrations: (): Registration[] => {
    const data = localStorage.getItem(REGISTRATIONS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveReport: (data: Omit<FloodReport, "id" | "timestamp" | "status">) => {
    const reports = storage.getReports();
    const newReport: FloodReport = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      status: "PENDING",
    };
    localStorage.setItem(REPORTS_KEY, JSON.stringify([...reports, newReport]));
    return newReport;
  },

  getReports: (): FloodReport[] => {
    const data = localStorage.getItem(REPORTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  updateReportStatus: (id: string, status: FloodReport["status"]) => {
    const reports = storage.getReports();
    const updated = reports.map(r => r.id === id ? { ...r, status } : r);
    localStorage.setItem(REPORTS_KEY, JSON.stringify(updated));
  }
};
