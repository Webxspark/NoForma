export type TUtilStatus = 'new' | 'followed-up' | 'in-progress' | 'completed'

export interface IClient {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: string;
    status: TUtilStatus;
}

export interface IMom {
    id: number;
    client_id: number;
    ai_summary: string;
    requirement_summary: string;
    requirements: string;
    status: TUtilStatus;
    notes: string;
    suggestions: string;
    created_at: string;
    updated_at: string;
    client: IClient;
}
