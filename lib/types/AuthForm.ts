import { SubmitHandler } from "react-hook-form";

export interface AuthFormProps {
  onSubmit: SubmitHandler<{ userName: string; password: string }>;
  submitting?: boolean;
}
