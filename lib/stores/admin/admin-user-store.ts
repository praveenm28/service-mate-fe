import { UserResponse } from "@/lib/types/UserResponse";

interface UserState {
    users: UserResponse[];
    userLoading: boolean;
    error: string | null;
    setUsers: (data: UserResponse[]) => Promise<void>;
    setUserLoading: (data: boolean) => Promise<void>;
    setError: (data: string | null) => Promise<void>;
}