import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    User, Mail, Phone, Calendar, Award, Clock, MapPin, Tag, Plus, ArrowRight
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Time slot schema
const timeSlotSchema = z.object({
    startTime: z.string(),
    endTime: z.string(),
});

// Working time schema
const workingTimeSchema = z.object({
    day: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]),
    timeSlots: z.array(timeSlotSchema).min(1, "At least one time slot is required"),
});

// Registration schema
const serviceProviderSchema = z.object({
    registerRequest: z.object({
        firstName: z.string().min(2, "First name must be at least 2 characters"),
        lastName: z.string().min(2, "Last name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email address"),
        phoneNo: z.string().min(10, "Phone number must be at least 10 digits"),
        dateOfBirth: z.string().refine(value => {
            const date = new Date(value);
            const today = new Date();
            const minAgeDate = new Date(today);
            minAgeDate.setFullYear(today.getFullYear() - 18);
            return date <= minAgeDate;
        }, "You must be at least 18 years old"),
        gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    }),
    bio: z.string().min(10, "Bio must be at least 10 characters"),
    qualification: z.string().min(2, "Qualification must be at least 2 characters"),
    experience: z.string().min(2, "Experience must be at least 2 characters"),
    licenceNo: z.string().optional(),
    paymentPerHour: z.number().min(1, "Payment per hour must be at least 1"),
    cityIds: z.array(z.number()).min(1, "Select at least one city"),
    categoryIds: z.array(z.number()).min(1, "Select at least one category"),
    tagIds: z.array(z.number()).min(1, "Select at least one tag"),
    isAvailableForEmergency: z.boolean(),
    workingTimes: z.array(workingTimeSchema).min(1, "At least one working day is required"),
});

type ServiceProviderFormValues = z.infer<typeof serviceProviderSchema>;

// Sample data for dropdowns (in a real app, these would come from API)
const cities = [
    { id: 1, name: "New York" },
    { id: 2, name: "Los Angeles" },
    { id: 3, name: "Chicago" },
];

const categories = [
    { id: 1, name: "Makeup Artist" },
    { id: 2, name: "Hair Stylist" },
    { id: 3, name: "Plumber" },
    { id: 4, name: "Electrician" },
];

const tags = [
    { id: 1, name: "Emergency Service" },
    { id: 2, name: "Wedding Specialist" },
    { id: 3, name: "Commercial" },
    { id: 4, name: "Residential" },
];

const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

 export const ServiceProviderRegistration = () => {
    const router = useRouter();
    const [showDialog, setShowDialog] = useState(true);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selectedCities, setSelectedCities] = useState<number[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [workingTimes, setWorkingTimes] = useState<any[]>([]);

    const form = useForm<ServiceProviderFormValues>({
        resolver: zodResolver(serviceProviderSchema),
        defaultValues: {
            registerRequest: {
                firstName: "",
                lastName: "",
                email: "",
                phoneNo: "",
                dateOfBirth: "",
                gender: "MALE",
            },
            bio: "",
            qualification: "",
            experience: "",
            licenceNo: "",
            paymentPerHour: 0,
            cityIds: [],
            categoryIds: [],
            tagIds: [],
            isAvailableForEmergency: false,
            workingTimes: [],
        },
    });

    const addTimeSlot = () => {
        if (!selectedDay || !startTime || !endTime) {
            toast.error("Please select day, start time and end time");
            return;
        }

        const start = new Date(`2000-01-01T${startTime}`);
        const end = new Date(`2000-01-01T${endTime}`);

        if (start >= end) {
            toast.error("End time must be after start time");
            return;
        }

        const existingDayIndex = workingTimes.findIndex(wt => wt.day === selectedDay);

        if (existingDayIndex >= 0) {
            const updatedWorkingTimes = [...workingTimes];
            updatedWorkingTimes[existingDayIndex].timeSlots.push({
                startTime,
                endTime,
            });
            setWorkingTimes(updatedWorkingTimes);
        } else {
            setWorkingTimes([
                ...workingTimes,
                {
                    day: selectedDay,
                    timeSlots: [{ startTime, endTime }],
                },
            ]);
        }

        // Reset inputs
        setStartTime("");
        setEndTime("");
    };

    const toggleCity = (cityId: number) => {
        setSelectedCities(prev => {
            if (prev.includes(cityId)) {
                return prev.filter(id => id !== cityId);
            } else {
                return [...prev, cityId];
            }
        });
    };

    const toggleCategory = (categoryId: number) => {
        setSelectedCategories(prev => {
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId);
            } else {
                return [...prev, categoryId];
            }
        });
    };

    const toggleTag = (tagId: number) => {
        setSelectedTags(prev => {
            if (prev.includes(tagId)) {
                return prev.filter(id => id !== tagId);
            } else {
                return [...prev, tagId];
            }
        });
    };

    const onSubmit = (data: ServiceProviderFormValues) => {
        // Add the selected data to form data
        data.cityIds = selectedCities;
        data.categoryIds = selectedCategories;
        data.tagIds = selectedTags;
        data.workingTimes = workingTimes;

        console.log("Form data:", data);
        toast.success("Registration successful! Your application is under review.");
        router.push("/dashboard");
    };

    return (
       
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh] bg-">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold tracking-tight">Service Provider Registration</DialogTitle>
                        <DialogDescription>
                            Complete your profile to start offering services through Service Mate
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Personal Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="registerRequest.firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                        <Input placeholder="John" className="pl-10" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="registerRequest.lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                        <Input placeholder="Doe" className="pl-10" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="registerRequest.email"
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
                                        control={form.control}
                                        name="registerRequest.phoneNo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                        <Input placeholder="1234567890" className="pl-10" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="registerRequest.dateOfBirth"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date of Birth</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                        <Input type="date" className="pl-10" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="registerRequest.gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select gender" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="MALE">Male</SelectItem>
                                                        <SelectItem value="FEMALE">Female</SelectItem>
                                                        <SelectItem value="OTHER">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Professional Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem className="col-span-1 md:col-span-2">
                                                <FormLabel>Bio</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us about yourself and your services"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="qualification"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Qualifications</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Award className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                        <Input placeholder="Diploma in Makeup Artistry" className="pl-10" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="experience"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Experience</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Clock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                        <Input placeholder="5 years" className="pl-10" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="licenceNo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>License Number (if applicable)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="MAKEUP123" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="paymentPerHour"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Payment Per Hour</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="50"
                                                        {...field}
                                                        onChange={e => field.onChange(parseFloat(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Service Details</h2>

                                <div>
                                    <h3 className="text-md font-medium mb-2">Cities You Serve</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {cities.map(city => (
                                            <div key={city.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`city-${city.id}`}
                                                    checked={selectedCities.includes(city.id)}
                                                    onCheckedChange={() => toggleCity(city.id)}
                                                />
                                                <label
                                                    htmlFor={`city-${city.id}`}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {city.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {selectedCities.length === 0 && form.formState.isSubmitted && (
                                        <p className="text-sm font-medium text-destructive mt-1">
                                            Select at least one city
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-md font-medium mb-2">Categories</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {categories.map(category => (
                                            <div key={category.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`category-${category.id}`}
                                                    checked={selectedCategories.includes(category.id)}
                                                    onCheckedChange={() => toggleCategory(category.id)}
                                                />
                                                <label
                                                    htmlFor={`category-${category.id}`}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {category.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {selectedCategories.length === 0 && form.formState.isSubmitted && (
                                        <p className="text-sm font-medium text-destructive mt-1">
                                            Select at least one category
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-md font-medium mb-2">Tags</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {tags.map(tag => (
                                            <div key={tag.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`tag-${tag.id}`}
                                                    checked={selectedTags.includes(tag.id)}
                                                    onCheckedChange={() => toggleTag(tag.id)}
                                                />
                                                <label
                                                    htmlFor={`tag-${tag.id}`}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {tag.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {selectedTags.length === 0 && form.formState.isSubmitted && (
                                        <p className="text-sm font-medium text-destructive mt-1">
                                            Select at least one tag
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-md font-medium mb-2">Emergency Availability</h3>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="emergency"
                                            onCheckedChange={(checked) => {
                                                form.setValue("isAvailableForEmergency", checked === true);
                                            }}
                                        />
                                        <label
                                            htmlFor="emergency"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Available for emergency calls
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Working Hours</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-sm font-medium">Day</label>
                                        <Select onValueChange={setSelectedDay}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select day" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {days.map((day) => (
                                                    <SelectItem key={day} value={day}>
                                                        {day.charAt(0) + day.slice(1).toLowerCase()}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Start Time</label>
                                        <Input
                                            type="time"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">End Time</label>
                                        <Input
                                            type="time"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    onClick={addTimeSlot}
                                    variant="outline"
                                    className="w-full"
                                >
                                    <Plus className="mr-2 h-4 w-4" /> Add Time Slot
                                </Button>

                                {workingTimes.length > 0 && (
                                    <div className="border rounded-md p-4">
                                        <h3 className="font-medium mb-2">Added Working Hours:</h3>
                                        <div className="space-y-2">
                                            {workingTimes.map((workDay, dayIndex) => (
                                                <div key={dayIndex} className="border-b pb-2">
                                                    <p className="font-medium">{workDay.day.charAt(0) + workDay.day.slice(1).toLowerCase()}</p>
                                                    <div className="grid grid-cols-2 gap-2 mt-1">
                                                        {workDay.timeSlots.map((slot: any, slotIndex: number) => (
                                                            <div key={slotIndex} className="text-sm bg-gray-50 p-2 rounded">
                                                                {slot.startTime} - {slot.endTime}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {workingTimes.length === 0 && form.formState.isSubmitted && (
                                    <p className="text-sm font-medium text-destructive">
                                        Add at least one working time slot
                                    </p>
                                )}
                            </div>

                            <DialogFooter>
                                <Button type="submit" className="w-full md:w-auto">
                                    Register as Service Provider <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
       
    );
};

export default ServiceProviderRegistration;