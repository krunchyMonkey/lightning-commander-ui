export type Priority = "P0" | "P1" | "P2" | "P3";
export type Status = "Open" | "Mitigating" | "Monitoring" | "Resolved";
export interface IncidentUpdate { id: string; at: string; message: string; author: string; }
export interface Incident {
    id: string; title: string; description: string; tags: string[]; priority: Priority; status: Status;
    createdAt: string; lastUpdatedAt: string; updates: IncidentUpdate[];
}