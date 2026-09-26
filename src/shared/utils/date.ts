/** Returns whether a date falls in the current Monday-to-Sunday week. */
export const isDateInCurrentWeek = (
  date: Date,
  referenceDate: Date = new Date(),
): boolean => {
  const timestamp = date.getTime();
  const referenceTimestamp = referenceDate.getTime();

  if (Number.isNaN(timestamp) || Number.isNaN(referenceTimestamp)) {
    return false;
  }

  const startOfWeek = new Date(referenceDate);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(
    referenceDate.getDate() - ((referenceDate.getDay() + 6) % 7),
  );

  return date >= startOfWeek && date <= referenceDate;
};
