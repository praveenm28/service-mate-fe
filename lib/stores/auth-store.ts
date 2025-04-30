import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  name: string
  email: string
  role: "consumer" | "provider"
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, role: "consumer" | "provider") => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: async (email, password) => {
        try {
          // In a real app, you would call an API to authenticate
          // const response = await axios.post('/api/auth/login', { email, password })

          // Mock successful login
          const mockUser = {
            id: "user_123",
            name: "John Doe",
            email,
            role: "consumer" as const,
          }

          set({ isAuthenticated: true, user: mockUser })
          return true
        } catch (error) {
          console.error("Login failed:", error)
          return false
        }
      },

      register: async (name, email, password, role) => {
        try {
          // In a real app, you would call an API to register
          // const response = await axios.post('/api/auth/register', { name, email, password, role })

          // Mock successful registration
          const mockUser = {
            id: "user_" + Math.random().toString(36).substring(2, 9),
            name,
            email,
            role,
          }

          set({ isAuthenticated: true, user: mockUser })
          return true
        } catch (error) {
          console.error("Registration failed:", error)
          return false
        }
      },

      logout: () => {
        // In a real app, you would call an API to logout
        // await axios.post('/api/auth/logout')

        set({ isAuthenticated: false, user: null })
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
