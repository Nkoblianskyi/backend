export interface User {
    id: number;
    email: string;
    name: string;
    phone: string;
    role: 'user' | 'admin';
}
