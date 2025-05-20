// Calculates the number of days left until a deadline
export const daysLeft = (deadline: string | Date): string => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

// Calculates percentage of goal completed
export const calculateBarPercentage = (
  goal: number,
  raisedAmount: number
): number => {
  if (goal === 0) return 0;
  return Math.round((raisedAmount * 100) / goal);
};

// Checks if a given URL is a valid image
export const checkIfImage = (
  url: string,
  callback: (isImage: boolean) => void
): void => {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  }
};
