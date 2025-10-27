import type { Incident, IncidentUpdate, Priority, Status } from "../types";


const seedIncidents: Incident[] = [
    {
        id: "inc_001",
        title: "EU checkout latency spike",
        description: "Elevated p95 latency observed in EU region affecting checkout service. Initial investigation points to DB connection pool saturation.",
        tags: ["checkout", "eu", "database"], priority: "P1", status: "Mitigating",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        lastUpdatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        updates: [
            { id: "u1", at: new Date(Date.now() - 1000 * 60 * 60 * 3.5).toISOString(), message: "Declared P1. Notified on-call. Scoped impact to EU region.", author: "alex@company.com" },
            { id: "u2", at: new Date(Date.now() - 1000 * 60 * 55).toISOString(), message: "Connection pool limits increased. Latency improving.", author: "sam@company.com" },
        ],
    },
    {
        id: "inc_002",
        title: "Auth gateway token issuance failures",
        description: "Intermittent 5xx from auth gateway for mobile clients. Potential network egress throttling.",
        tags: ["auth", "mobile", "network"], priority: "P0", status: "Open",
        createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        lastUpdatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        updates: [{ id: "u1", at: new Date(Date.now() - 1000 * 60 * 80).toISOString(), message: "Paging SRE + NetOps. Impacting token issuance for ~35% of requests.", author: "nina@company.com" }],
    },
];


function fakeId(prefix: string) { return `${prefix}_${Math.random().toString(36).slice(2, 8)}`; }


export const api = {
    async listIncidents(): Promise<Incident[]> { return Promise.resolve(structuredClone(seedIncidents)); },
    async createIncident(payload: Omit<Incident, "id" | "lastUpdatedAt" | "updates">): Promise<Incident> {
        const newIncident: Incident = { ...payload, id: fakeId("inc"), lastUpdatedAt: payload.createdAt, updates: [] };
        seedIncidents.unshift(newIncident); return Promise.resolve(structuredClone(newIncident));
    },
    async appendUpdate(incidentId: string, update: Omit<IncidentUpdate, "id">): Promise<Incident> {
        const found = seedIncidents.find((i) => i.id === incidentId); if (!found) throw new Error("Incident not found");
        const entry: IncidentUpdate = { id: fakeId("upd"), ...update }; found.updates.push(entry); found.lastUpdatedAt = entry.at;
        return Promise.resolve(structuredClone(found));
    },
    async searchIncidents(query: string, filters: Partial<{ priority: Priority; status: Status; tag: string }>): Promise<Incident[]> {
        const q = query.toLowerCase();
        return Promise.resolve(seedIncidents.filter((i) => {
            const matchesQ = !q || i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.tags.some((t) => t.toLowerCase().includes(q));
            const matchesPriority = !filters.priority || i.priority === filters.priority;
            const matchesStatus = !filters.status || i.status === filters.status;
            const matchesTag = !filters.tag || i.tags.includes(filters.tag!);
            return matchesQ && matchesPriority && matchesStatus && matchesTag;
        }));
    },
};