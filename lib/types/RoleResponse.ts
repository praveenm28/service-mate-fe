import { PermissionResponse } from "./PermissionResponse";

export interface RoleResponse {
    id: number;
    name: string;
    permissionResponses: PermissionResponse[];
}