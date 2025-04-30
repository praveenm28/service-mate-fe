import { create } from "zustand"

interface Service {
  id: string
  title: string
  description: string
  provider: {
    id: string
    name: string
  }
  category: string
  price: number
  rating: number
  reviewCount: number
  image: string
}

interface ServiceState {
  services: Service[]
  isLoading: boolean
  error: string | null
  fetchServices: (filters?: Record<string, any>) => Promise<void>
  getServiceById: (id: string) => Service | undefined
}

export const useServiceStore = create<ServiceState>((set, get) => ({
  services: [],
  isLoading: false,
  error: null,

  fetchServices: async (filters = {}) => {
    try {
      set({ isLoading: true, error: null })

      // In a real app, you would call an API to fetch services
      // const response = await axios.get('/api/services', { params: filters })
      // const data = response.data

      // Mock data
      const mockServices: Service[] = [
        {
          id: "1",
          title: "Home Cleaning",
          description: "Professional home cleaning service",
          provider: {
            id: "provider_1",
            name: "CleanPro Services",
          },
          category: "cleaning",
          price: 80,
          rating: 4.8,
          reviewCount: 124,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "2",
          title: "Plumbing Repair",
          description: "Expert plumbing repair and installation",
          provider: {
            id: "provider_2",
            name: "Quick Fix Plumbers",
          },
          category: "plumbing",
          price: 95,
          rating: 4.7,
          reviewCount: 98,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "3",
          title: "Lawn Maintenance",
          description: "Complete lawn care and maintenance",
          provider: {
            id: "provider_3",
            name: "Green Thumb Gardens",
          },
          category: "landscaping",
          price: 60,
          rating: 4.9,
          reviewCount: 156,
          image: "/placeholder.svg?height=200&width=300",
        },
      ]

      // Apply filters if any
      let filteredServices = [...mockServices]

      if (filters.category) {
        filteredServices = filteredServices.filter((service) => service.category === filters.category)
      }

      if (filters.minPrice) {
        filteredServices = filteredServices.filter((service) => service.price >= filters.minPrice)
      }

      if (filters.maxPrice) {
        filteredServices = filteredServices.filter((service) => service.price <= filters.maxPrice)
      }

      if (filters.minRating) {
        filteredServices = filteredServices.filter((service) => service.rating >= filters.minRating)
      }

      set({ services: filteredServices, isLoading: false })
    } catch (error) {
      console.error("Error fetching services:", error)
      set({
        error: "Failed to fetch services. Please try again later.",
        isLoading: false,
      })
    }
  },

  getServiceById: (id) => {
    return get().services.find((service) => service.id === id)
  },
}))
