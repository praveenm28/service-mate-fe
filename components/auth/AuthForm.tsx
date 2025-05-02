"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ArrowRight, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Schemas
const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const registerSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Confirm password must be at least 8 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const AuthForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [authMode, setAuthMode] = useState<"login" | "register" | "forgotPassword">("login");
    const router = useRouter();

    const loginForm = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const registerForm = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    });

    const forgotPasswordForm = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const onLoginSubmit = (data: LoginFormValues) => {
        console.log("Login data:", data);
        toast.success("Login successful!");
        router.push("/dashboard");
    };

    const onRegisterSubmit = (data: RegisterFormValues) => {
        console.log("Register data:", data);
        toast.success("Registration successful! Please check your email to verify your account.");
        setAuthMode("login");
    };

    const onForgotPasswordSubmit = (data: ForgotPasswordFormValues) => {
        console.log("Forgot password data:", data);
        toast.success("Password reset link sent to your email!");
        setAuthMode("login");
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div>
            <div className="text-center space-y-1">
                <h1 className="text-2xl font-bold text-primary">Service Mate</h1>
                <p className="text-muted-foreground text-sm">
                    {authMode === "login"
                        ? "Login to your account"
                        : authMode === "register"
                            ? "Create your new account"
                            : "Reset your password"}
                </p>
            </div>

            <hr />
            <div className="py-4">
                {authMode === "login" && (
                    <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                            <FormField
                                control={loginForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                <Input placeholder="you@example.com" className="pl-10" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={loginForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    className="pl-10"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                    className="absolute right-3 top-2.5"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-muted-foreground" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="text-right text-sm">
                                <button
                                    type="button"
                                    onClick={() => setAuthMode("forgotPassword")}
                                    className="text-primary hover:underline font-medium"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <Button type="submit" className="w-full">
                                Sign In <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </Form>
                )}

                {authMode === "register" && (
                    <Form {...registerForm}>
                        <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                            <FormField
                                control={registerForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                <Input placeholder="John Doe" className="pl-10" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={registerForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                <Input placeholder="you@example.com" className="pl-10" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={registerForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    className="pl-10"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                    className="absolute right-3 top-2.5"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-muted-foreground" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={registerForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                <Input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    className="pl-10"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={toggleConfirmPasswordVisibility}
                                                    className="absolute right-3 top-2.5"
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-muted-foreground" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Create Account <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </Form>
                )}

                {authMode === "forgotPassword" && (
                    <Form {...forgotPasswordForm}>
                        <form
                            onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={forgotPasswordForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                <Input placeholder="you@example.com" className="pl-10" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Send Reset Link <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </Form>
                )}
            </div>

            <DialogFooter>
                <div className="text-center w-full text-sm">
                    {authMode === "login" ? (
                        <>
                            Don't have an account?{" "}
                            <button
                                onClick={() => setAuthMode("register")}
                                className="text-primary hover:underline font-medium"
                            >
                                Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                onClick={() => setAuthMode("login")}
                                className="text-primary hover:underline font-medium"
                            >
                                Sign in
                            </button>
                        </>
                    )}
                </div>
            </DialogFooter>

        </div>
    );
};

export default AuthForm;
