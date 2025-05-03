import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

const daysOfWeek = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

interface DayTimeSelectorProps {
  value: { day: string; startTime: string; endTime: string }[];
  onChange: (
    value: { day: string; startTime: string; endTime: string }[]
  ) => void;
}

export function DayTimeSelector({ value, onChange }: DayTimeSelectorProps) {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<
    Record<string, { startTime: string; endTime: string }>
  >({});

  // Initialize with existing values
  useEffect(() => {
    if (value && value.length > 0) {
      const days = value.map((item) => item.day);
      const slots = value.reduce((acc, item) => {
        acc[item.day] = { startTime: item.startTime, endTime: item.endTime };
        return acc;
      }, {} as Record<string, { startTime: string; endTime: string }>);

      setSelectedDays(days);
      setTimeSlots(slots);
    }
  }, [value]);

  const handleDayToggle = (day: string) => {
    const newSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];

    setSelectedDays(newSelectedDays);
    updateWorkingTimes(newSelectedDays, timeSlots);
  };

  const handleTimeChange = (
    day: string,
    field: "startTime" | "endTime",
    time: string
  ) => {
    const newTimeSlots = {
      ...timeSlots,
      [day]: {
        ...(timeSlots[day] || { startTime: "09:00", endTime: "17:00" }),
        [field]: time,
      },
    };

    setTimeSlots(newTimeSlots);
    updateWorkingTimes(selectedDays, newTimeSlots);
  };

  const updateWorkingTimes = (
    days: string[],
    slots: Record<string, { startTime: string; endTime: string }>
  ) => {
    const newWorkingTimes = days.map((day) => ({
      day,
      startTime: slots[day]?.startTime || "09:00",
      endTime: slots[day]?.endTime || "17:00",
    }));

    onChange(newWorkingTimes);
  };

  return (
    <div className="space-y-4">
      <Label>Working Days & Hours</Label>
      <div className="flex flex-wrap gap-2 mb-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="flex items-center space-x-2">
            <Checkbox
              id={`day-${day}`}
              checked={selectedDays.includes(day)}
              onCheckedChange={() => handleDayToggle(day)}
            />
            <Label htmlFor={`day-${day}`} className="capitalize">
              {day.toLowerCase()}
            </Label>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {selectedDays.map((day) => (
          <div key={day} className="grid grid-cols-3 gap-4 items-center">
            <Label className="capitalize">{day.toLowerCase()}</Label>
            <Input
              type="time"
              value={timeSlots[day]?.startTime || "09:00"}
              onChange={(e) =>
                handleTimeChange(day, "startTime", e.target.value)
              }
            />
            <Input
              type="time"
              value={timeSlots[day]?.endTime || "17:00"}
              onChange={(e) => handleTimeChange(day, "endTime", e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
