export const dateFormatter = (date: string) => {
  const validDate = new Date(date);

  // Extract year, month, and day components
  const year = validDate.getFullYear();
  const month = String(validDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(validDate.getDate()).padStart(2, "0");

  // Concatenate components to form the desired format
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const dateFormatterWithTime = (date: string) => {
  const validDate = new Date(date);
  // Extract year, month, day, hour, minute, and second components
  const year = validDate.getFullYear();
  const month = String(validDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(validDate.getDate()).padStart(2, "0");
  const hour = String(validDate.getHours()).padStart(2, "0");
  const minute = String(validDate.getMinutes()).padStart(2, "0");

  // Concatenate components to form the desired format
  const formattedDate = `${year}-${month}-${day} (${hour}:${minute})`;
  return formattedDate;
};
