"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function AdminServiceStats() {
  const { theme } = useTheme()
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is a placeholder for a real chart implementation
    // In a real app, you would use a charting library like Chart.js, Recharts, or ApexCharts
    if (chartRef.current) {
      const ctx = chartRef.current

      // Clear previous content
      ctx.innerHTML = ""

      // Create a simple placeholder chart
      const isDark = theme === "dark"
      const textColor = isDark ? "#e2e8f0" : "#1e293b"

      // Sample data for service categories
      const data = [
        { category: "Cleaning", bookings: 124, color: "#3b82f6" },
        { category: "Plumbing", bookings: 98, color: "#10b981" },
        { category: "Electrical", bookings: 87, color: "#f59e0b" },
        { category: "Landscaping", bookings: 156, color: "#8b5cf6" },
        { category: "Assembly", bookings: 65, color: "#ec4899" },
        { category: "Painting", bookings: 78, color: "#ef4444" },
      ]

      // Sort data by bookings (descending)
      data.sort((a, b) => b.bookings - a.bookings)

      // Calculate total bookings
      const totalBookings = data.reduce((sum, item) => sum + item.bookings, 0)

      // Create chart container
      const chartContainer = document.createElement("div")
      chartContainer.className = "w-full space-y-4"

      // Create bars
      data.forEach((item) => {
        const row = document.createElement("div")
        row.className = "flex items-center gap-2"

        const labelContainer = document.createElement("div")
        labelContainer.className = "w-24 text-sm"
        labelContainer.style.color = textColor
        labelContainer.textContent = item.category

        const barContainer = document.createElement("div")
        barContainer.className = "flex-1 h-4 bg-muted rounded-full overflow-hidden"

        const bar = document.createElement("div")
        const width = (item.bookings / totalBookings) * 100
        bar.className = "h-full rounded-full"
        bar.style.width = `${width}%`
        bar.style.backgroundColor = item.color

        const value = document.createElement("div")
        value.className = "w-12 text-sm text-right"
        value.style.color = textColor
        value.textContent = item.bookings.toString()

        barContainer.appendChild(bar)
        row.appendChild(labelContainer)
        row.appendChild(barContainer)
        row.appendChild(value)
        chartContainer.appendChild(row)
      })

      ctx.appendChild(chartContainer)
    }
  }, [theme])

  return (
    <div ref={chartRef} className="w-full h-[250px]">
      {/* Chart will be rendered here */}
    </div>
  )
}
