const addZero = int => {
  if (int < 10) {
    return `0${int}`;
  }

  return `${int}`;
};

export const parseTimestamp = (timestamp, format = false) => {
  // just in case
  var clearedtTimestamp = Math.floor(timestamp);
  var date = new Date(clearedtTimestamp * 1000);
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  switch (format) {
    case "fullDate":
      return `${addZero(month)}.${addZero(day)} ${addZero(hours)}:${addZero(min)}:${addZero(sec)}`;
    case "agendaFormat":
      return `${date.getFullYear()}-${addZero(month)}-${addZero(day)}`;
    case "fromHours":
      return `${addZero(hours)}:${addZero(min)}:${addZero(sec)}`;
    default:
      return new Date(timestamp * 1e3).toISOString().slice(-13, -5);
      // https://stackoverflow.com/a/35890537
  };
};

export default {
  parseTimestamp
};
