// helper method to convert hour to string
export const hourToString = (
  hour: number,
  isAM: boolean = true,
  showMeridian: boolean = false
) => {
  let str = "";
  str += hour > 9 ? `${hour}:00 ` : `0${hour}:00 `;
  if (showMeridian) str += isAM ? "PM" : "AM";
  return str;
};
