"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";

import { cn } from "./utils";

type CalendarProps = {
  selected?: Date;
  onSelect?: (date: Date) => void;
  modifiers?: {
    completed?: Date[];
  };
  className?: string;
};

function Calendar({ selected, onSelect, modifiers, className }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(selected ?? new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const weekdays = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];

  const isCompletedDay = (day: Date) =>
    modifiers?.completed?.some((completedDate) =>
      isSameDay(completedDate, day),
    );

  return (
    <div className={cn("w-full max-w-[500px] rounded-2xl border bg-white p-6", className)}>
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentMonth((month) => subMonths(month, 1))}
          className="flex h-12 w-12 items-center justify-center rounded-xl border bg-white text-gray-500 hover:bg-gray-50"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold capitalize">
          {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
        </h2>

        <button
          type="button"
          onClick={() => setCurrentMonth((month) => addMonths(month, 1))}
          className="flex h-12 w-12 items-center justify-center rounded-xl border bg-white text-gray-500 hover:bg-gray-50"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekdays.map((weekday) => (
          <div
            key={weekday}
            className="flex h-10 items-center justify-center text-base font-semibold text-gray-500"
          >
            {weekday}
          </div>
        ))}

        {days.map((day) => {
          const selectedDay = selected && isSameDay(day, selected);
          const completedDay = isCompletedDay(day);
          const outsideMonth = !isSameMonth(day, currentMonth);

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onSelect?.(day)}
              className={cn(
                "flex h-12 items-center justify-center rounded-xl text-lg font-medium transition",
                outsideMonth && "text-gray-400",
                !outsideMonth && "text-black hover:bg-blue-50",
                completedDay && "bg-blue-500 text-white hover:bg-blue-500",
                selectedDay && "bg-blue-500 text-white hover:bg-blue-500",
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { Calendar };