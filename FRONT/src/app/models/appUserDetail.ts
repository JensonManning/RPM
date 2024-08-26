export interface AppUserDetail {
    id: string;
    email: string;
    fullName: string;
    roles: string[];
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    accessFailedCount: number;
}