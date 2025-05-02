import { SubmitHandler } from "react-hook-form";

// Your form data type that defines the structure of the form data
export interface ServiceProviderRegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  bio: string;
  qualification: string;
  experience: string;
  licenceNo: string;
  paymentPerHour: number;
  cityIds: number[];
  categoryIds: number[];
  tagIds: number[];
  isAvailableForEmergency: boolean;
  workingTimes: any[];
}


export interface ServiceProviderFormProps {
  onSubmit: SubmitHandler<ServiceProviderRegistrationFormData>; 
  submitting?: boolean;
}
