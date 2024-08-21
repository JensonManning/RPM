export interface AppUserDetail {
    id: string;
    email: string;
    fullName: string;
    roles: string[];
    userPhone: string;
    userRole: string;
    twoFactorEnabled: boolean;
    accessFailedCount: number;
}