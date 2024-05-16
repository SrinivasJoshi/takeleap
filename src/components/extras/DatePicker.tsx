"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ProfessionalExperience } from "@/app/mentor-form/page"

interface DatePickerProps { 
    handleExperienceChange : (index: number, field: keyof ProfessionalExperience, value: string | Date | number) => void,
    field: 'startDate' | 'endDate',
    index : number
}

export function DatePicker(props:DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  React.useEffect(() => {
    props.handleExperienceChange(props.index,props.field,date ? date.toLocaleString() : '');
  }, [date])
  

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
