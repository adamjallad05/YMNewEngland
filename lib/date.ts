const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric"
});

const TIME_FORMAT = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit"
});

const MONTH_LABEL = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric"
});

const WEEKDAY_LABEL = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric"
});

export function formatDate(value: string) {
  return DATE_FORMAT.format(new Date(value));
}

export function formatTime(value: string) {
  return TIME_FORMAT.format(new Date(value));
}

export function formatDateRange(start: string, end: string) {
  return `${formatDate(start)} • ${formatTime(start)} - ${formatTime(end)}`;
}

export function monthLabel(date: Date) {
  return MONTH_LABEL.format(date);
}

export function weekLabel(date: Date) {
  return WEEKDAY_LABEL.format(date);
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function startOfWeek(date: Date) {
  const copy = new Date(date);
  const day = copy.getDay();
  copy.setDate(copy.getDate() - day);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function addDays(date: Date, days: number) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

export function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export function toDateInputValue(date: Date) {
  return date.toISOString().split("T")[0];
}

export function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function threeMonthsAhead() {
  const future = new Date();
  future.setMonth(future.getMonth() + 3);
  return future;
}
