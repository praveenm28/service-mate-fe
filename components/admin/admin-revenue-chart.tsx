"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function AdminRevenueChart() {
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
      const barColor = isDark ? "#4f46e5" : "#6366f1"
      const textColor = isDark ? "#e2e8f0" : "#1e293b"
      const gridColor = isDark ? "#334155" : "#e2e8f0"

      // Create chart container
      const chartContainer = document.createElement("div")
      chartContainer.className = "w-full h-[300px] flex items-end justify-between gap-1 pt-6 relative"

      // Add grid lines
      for (let i = 0; i < 5; i++) {
        const gridLine = document.createElement("div")
        gridLine.className = "absolute w-full border-t border-dashed"
        gridLine.style.borderColor = gridColor
        gridLine.style.bottom = `${i * 25}%`
        chartContainer.appendChild(gridLine)

        // Add y-axis labels
        const label = document.createElement("div")
        label.className = "absolute -left-10 text-xs"
        label.style.color = textColor
        label.style.bottom = `${i * 25}%`
        label.style.transform = "translateY(50%)"
        label.textContent = `$${i * 5000}`
        chartContainer.appendChild(label)
      }

      // Sample data for the last 30 days
      const data = [
        4200, 4500, 5100, 3800, 4100, 4800, 5200, 4900, 5500, 6000, 5800, 5400, 5100, 5300, 5700, 6200, 6500, 6300,
        5900, 6100, 6400, 6800, 7200, 7500, 7100, 6900, 7300, 7600, 7800, 8000,
      ]

      // Create bars
      data
        .forEach((value, index) => {
          const bar = document.createElement("div")
          const height = (value / 8000) * 100
          bar.className = "flex-1 rounded-t-sm hover:opacity-80 transition-opacity"
          bar.style.height = `${height}%`
          bar.style.backgroundColor = barColor
          bar.title = `Day ${index + 1}: $${value}`

          chartContainer.appendChild(bar)
        })

        [
          // Add x-axis labels (just for a few points to avoid clutter)
          (0, 9, 19, 29)
        ].forEach((index) => {
          const label = document.createElement("div")
          label.className = "absolute text-xs"
          label.style.color = textColor
          label.style.bottom = "-20px"
          label.style.left = `${(index / 29) * 100}%`
          label.style.transform = "translateX(-50%)"
          label.textContent = `${index + 1}`
          chartContainer.appendChild(label)
        })

      ctx.appendChild(chartContainer)
    }
  }, [theme])

  return (
    <div ref={chartRef} className="w-full h-[300px]">
      {/* Chart will be rendered here */}
    </div>
  )
}
