export interface IClient {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: string;
    status: "new" | "followed-up" | "in-progress" | "completed"
}
