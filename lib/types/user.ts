export interface UserUpdateData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNo: string;
    dateOfBirth: string; 
    gender: "male" | "female" | "other"; 
    role: number; 
  }