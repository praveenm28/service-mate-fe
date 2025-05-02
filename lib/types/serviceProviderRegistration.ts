import { SubmitHandler } from "react-hook-form";
import { ServiceProviderRegistrationForm } from "@/components/auth/ServiceProviderRegistration";


export interface ServiceProviderFormProps {
  onSubmit: SubmitHandler<ServiceProviderRegistrationForm>;
  submitting?: boolean;
}
