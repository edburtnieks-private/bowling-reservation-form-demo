const formatDateAndTime = (date: Date, startTime: number): string => {
  return `${date.toLocaleDateString("en", {
    month: "long",
    day: "numeric"
  })}, ${startTime}:00`;
};

const getStartDate = (startHour: number, endHour: number): Date => {
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));

  if (today.getHours() >= startHour && today.getHours() < endHour) {
    return today;
  } else {
    return tomorrow;
  }
};

const getStartTime = (startHour: number, endHour: number): number => {
  const nextHour = new Date().getHours() + 1;

  if (nextHour >= startHour && nextHour < endHour) {
    return nextHour;
  } else {
    return startHour;
  }
};

const availableTimes = (startHour: number, endHour: number): number[] => {
  return Array.from(
    { length: endHour - startHour },
    (_, index) => startHour + index
  );
};

const getDuration = (duration: number, maxDuration: number): number => {
  if (duration > maxDuration) {
    return maxDuration;
  } else {
    return duration;
  }
};

const getMaxDuration = (startTime: number, maxDuration: number): number => {
  const availableDuration = 24 - startTime;

  if (availableDuration < maxDuration) {
    return availableDuration;
  } else {
    return maxDuration;
  }
};

export {
  formatDateAndTime,
  getStartDate,
  getStartTime,
  availableTimes,
  getDuration,
  getMaxDuration
};
