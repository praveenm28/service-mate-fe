import { RoleResponse } from "./RoleResponse";

export interface UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    dateOfBirth: string;
    gender: string;
    preSignedUrl: string;
    createdDate: string;
    updatedDate: string;
    online: boolean;
    role: RoleResponse;
    serviceProviderId: number;
    active: boolean;
}