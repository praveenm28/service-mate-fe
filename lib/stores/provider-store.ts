import { create } from "zustand";
import { ServiceProvider } from "../types/ServiceProvider";

interface ProviderState {
  providers: ServiceProvider[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    pageCount: number;
    pageSize: number;
  };
  // fetchProviders: (filters?: Record<string, any>) => Promise<void>;
  getProviderById: (id: number) => ServiceProvider | undefined;
  setProviders: (data: {
    pageCount: number;
    pageSize: number;
    records: ServiceProvider[];
  }) => Promise<void>;
}

export const useProviderStore = create<ProviderState>((set, get) => ({
  providers: [],
  isLoading: false,
  error: null,
  pagination: {
    pageCount: 1,
    pageSize: 10,
  },

  // fetchProviders: async (filters = {}) => {
  //   try {
  //     set({ isLoading: true, error: null });

  //     // In a real app, you would call an API to fetch providers
  //     // const response = await axios.get('/api/providers', { params: filters })
  //     // const data = response.data

  //     // Mock data
  //     const mockProviders: ServiceProvider[] = [
  //       {
  //         id: "p1",
  //         name: "CleanPro Services",
  //         description:
  //           "Professional cleaning services for homes and offices with eco-friendly products.",
  //         categories: ["Cleaning", "Home Organization"],
  //         rating: 4.8,
  //         completedJobs: 124,
  //         location: "New York, NY",
  //         verified: true,
  //         image: "/placeholder.svg?height=80&width=80",
  //         joinDate: "2022-05-15",
  //       },
  //       {
  //         id: "p2",
  //         name: "Quick Fix Plumbers",
  //         description:
  //           "Emergency and scheduled plumbing services with 24/7 availability.",
  //         categories: ["Plumbing", "Emergency Repairs"],
  //         rating: 4.7,
  //         completedJobs: 98,
  //         location: "Chicago, IL",
  //         verified: true,
  //         image: "/placeholder.svg?height=80&width=80",
  //         joinDate: "2022-06-20",
  //       },
  //       {
  //         id: "p3",
  //         name: "Green Thumb Gardens",
  //         description:
  //           "Complete lawn care, landscaping, and garden maintenance services.",
  //         categories: ["Landscaping", "Garden Design"],
  //         rating: 4.9,
  //         completedJobs: 156,
  //         location: "Austin, TX",
  //         verified: true,
  //         image: "/placeholder.svg?height=80&width=80",
  //         joinDate: "2022-03-10",
  //       },
  //       {
  //         id: "p4",
  //         name: "PowerTech Electric",
  //         description:
  //           "Licensed electricians for residential and commercial electrical services.",
  //         categories: ["Electrical", "Lighting Installation"],
  //         rating: 4.6,
  //         completedJobs: 87,
  //         location: "Seattle, WA",
  //         verified: true,
  //         image: "/placeholder.svg?height=80&width=80",
  //         joinDate: "2022-07-05",
  //       },
  //       {
  //         id: "p5",
  //         name: "Assembly Pros",
  //         description:
  //           "Expert furniture assembly and installation services for home and office.",
  //         categories: ["Assembly", "Furniture Setup"],
  //         rating: 4.5,
  //         completedJobs: 65,
  //         location: "Denver, CO",
  //         verified: false,
  //         image: "/placeholder.svg?height=80&width=80",
  //         joinDate: "2022-08-12",
  //       },
  //       {
  //         id: "p6",
  //         name: "Color Masters",
  //         description:
  //           "Professional painting services for interior and exterior projects.",
  //         categories: ["Painting", "Wall Repair"],
  //         rating: 4.7,
  //         completedJobs: 78,
  //         location: "Miami, FL",
  //         verified: true,
  //         image: "/placeholder.svg?height=80&width=80",
  //         joinDate: "2022-04-28",
  //       },
  //       {
  //         id: "p7",
  //         name: "Handy Home Services",
  //         description:
  //           "General handyman services for all your home repair and maintenance needs.",
  //         categories: ["Handyman", "Home Repairs", "Maintenance"],
  //         rating: 4.4,
  //         completedJobs: 112,
  //         location: "Portland, OR",
  //         verified: true,
  //         image: "/placeholder.svg?height=80&width=80",
  //         joinDate: "2022-09-15",
  //       },
  //       {
  //         id: "p8",
  //         name: "Tech Connect",
  //         description:
  //           "Home technology installation and troubleshooting services.",
  //         categories: ["Technology", "Smart Home", "TV Mounting"],
  //         rating: 4.8,
  //         completedJobs: 93,
  //         location: "San Francisco, CA",
  //         verified: true,
  //         image: "/placeholder.svg?height=80&width=80",
  //         joinDate: "2022-10-03",
  //       },
  //       {
  //         id: "p9",
  //         name: "Secure Lock & Key",
  //         description:
  //           "Professional locksmith services for residential and commercial properties.",
  //         categories: ["Locksmith", "Security"],
  //         rating: 4.9,
  //         completedJobs: 67,
  //         location: "Boston, MA",
  //         verified: true,
  //         image: "/placeholder.svg?height=80&width=80",
  //         joinDate: "2022-11-20",
  //       },
  //       {
  //         id: "p10",
  //         name: "Clear View Window Cleaning",
  //         description:
  //           "Professional window cleaning services for homes and businesses.",
  //         categories: ["Cleaning", "Window Services"],
  //         rating: 4.6,
  //         completedJobs: 82,
  //         location: "Philadelphia, PA",
  //         verified: false,
  //         image: "/placeholder.svg?height=80&width=80",
  //         joinDate: "2022-07-14",
  //       },
  //       {
  //         id: "p11",
  //         name: "Comfort HVAC Solutions",
  //         description:
  //           "Heating, ventilation, and air conditioning services and repairs.",
  //         categories: ["HVAC", "Heating", "Air Conditioning"],
  //         rating: 4.7,
  //         completedJobs: 104,
  //         location: "Phoenix, AZ",
  //         verified: true,
  //         image: "/placeholder.svg?height=80&width=80",
  //         joinDate: "2022-05-30",
  //       },
  //       {
  //         id: "p12",
  //         name: "Pest Control Experts",
  //         description: "Comprehensive pest control and prevention services.",
  //         categories: ["Pest Control", "Extermination"],
  //         rating: 4.5,
  //         completedJobs: 76,
  //         location: "Atlanta, GA",
  //         verified: true,
  //         image: "/placeholder.svg?height=80&width=80",
  //         joinDate: "2022-08-05",
  //       },
  //     ];

  //     // Apply filters if any
  //     let filteredProviders = [...mockProviders];

  //     if (filters.category) {
  //       filteredProviders = filteredProviders.filter((provider) =>
  //         provider.categories.includes(filters.category)
  //       );
  //     }

  //     if (filters.rating) {
  //       const minRating =
  //         filters.rating === "4plus"
  //           ? 4
  //           : filters.rating === "4.5plus"
  //           ? 4.5
  //           : filters.rating === "5"
  //           ? 5
  //           : 0;

  //       filteredProviders = filteredProviders.filter(
  //         (provider) => provider.rating >= minRating
  //       );
  //     }

  //     // Add a small delay to simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 500));

  //     set({ providers: filteredProviders, isLoading: false });
  //   } catch (error) {
  //     console.error("Error fetching providers:", error);
  //     set({
  //       error: "Failed to fetch providers. Please try again later.",
  //       isLoading: false,
  //     });
  //   }
  // },

  setProviders: async (data) => {
    console.log("🚀 ~ setProviders: ~ data:", data);
    try {
      set({ isLoading: true, error: null });
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ providers: data.records, isLoading: false });
    } catch (error) {
      console.error("Error fetching providers:", error);
      set({
        error: "Failed to fetch providers. Please try again later.",
        isLoading: false,
      });
    }
  },

  getProviderById: (id) => {
    return get().providers.find((provider) => provider.id === id);
  },
}));
