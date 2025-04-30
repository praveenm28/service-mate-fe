import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function AdminRecentUsers() {
  // Mock data - in a real app, this would come from an API
  const recentUsers = [
    {
      id: "u1",
      name: "John Smith",
      email: "john.smith@example.com",
      role: "consumer",
      joinDate: "2023-10-28",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "u2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "provider",
      joinDate: "2023-10-25",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "u3",
      name: "Michael Brown",
      email: "michael.b@example.com",
      role: "consumer",
      joinDate: "2023-10-22",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "u4",
      name: "Emily Davis",
      email: "emily.d@example.com",
      role: "provider",
      joinDate: "2023-10-20",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "u5",
      name: "Robert Wilson",
      email: "robert.w@example.com",
      role: "consumer",
      joinDate: "2023-10-18",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  return (
    <div className="space-y-4">
      {recentUsers.map((user) => (
        <div key={user.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">
              {user.role}
            </Badge>
            <span className="text-xs text-muted-foreground">{new Date(user.joinDate).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
