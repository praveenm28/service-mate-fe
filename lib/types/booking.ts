export interface BookingData {
    userId: number;
    serviceProviderId: number;
    bookingDate: string; 
    appointmentTime: string; 
    reason: string;
    note?: string;
    isEmergency: boolean;
    emergencyReason?: string | null;
    actress?: string;
  }