import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isWithinInterval, parseISO, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const formatDateDisplay = (date: Date): string => {
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};

export const getTodayString = (): string => {
  return formatDate(new Date());
};

export const getWeekRange = (date: Date = new Date()) => {
  return {
    start: startOfWeek(date, { weekStartsOn: 0 }),
    end: endOfWeek(date, { weekStartsOn: 0 }),
  };
};

export const getMonthRange = (date: Date = new Date()) => {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
  };
};

export const getDaysInRange = (start: Date, end: Date): Date[] => {
  return eachDayOfInterval({ start, end });
};

export const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
  return isWithinInterval(date, { start, end });
};

export const parseDateString = (dateStr: string): Date => {
  return parseISO(dateStr);
};

export const getDaysDifference = (date1: Date, date2: Date): number => {
  return differenceInDays(date1, date2);
};
