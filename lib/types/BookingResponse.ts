import { ServiceProvider } from "./ServiceProvider";
import { UserResponse } from "./UserResponse";

export interface BookingResponse {
    id: number;
    bookingTime: string; 
    serviceProviderResponse: ServiceProvider;
    userResponse: UserResponse;
    bookingDate: string; 
    bookingStatus: 'CONFIRMED' | 'CANCELED' | 'COMPLETED' | 'PENDING';
    reason: string;
    note: string;
    createdDate: string; 
    updatedDate: string; 
    referenceNo: string;
    cancelReason: string;
    paymentStatus: 'PENDING' | 'COMPLETED' | 'CANCELED' | 'REFUND';
    emergency: boolean;
    emergencyReason: string;
    guest: boolean;
    documents: string[];
    transactionId: string;
  }
  