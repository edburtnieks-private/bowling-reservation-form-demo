const formatDateAndTime = (date: Date, startTime: number): string =>
  `${date.toLocaleDateString("en", {
    month: "long",
    day: "numeric"
  })}, ${startTime}:00`;

const getStartTime = (startHour: number, endHour: number): number => {
  const nextHour = new Date().getHours() + 1;

  if (nextHour >= startHour && nextHour < endHour) {
    return nextHour;
  } else {
    return startHour;
  }
};

export { formatDateAndTime, getStartTime };
