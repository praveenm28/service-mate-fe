import { SubmitHandler } from "react-hook-form";

// lib-types-authForm.ts

// Login Form Data type
export type LoginFormValues = {
  email: string;
  password: string;
};

// Register Form Data type
export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Forgot Password Form Data type
export type ForgotPasswordFormValues = {
  email: string;
};

// Main AuthFormProps interface
export interface AuthFormProps {
  // Define the onSubmit handler that takes the form values (you can modify this based on your form's needs)
  onSubmit: SubmitHandler<LoginFormValues | RegisterFormValues | ForgotPasswordFormValues>;
  submitting?: boolean;
}
