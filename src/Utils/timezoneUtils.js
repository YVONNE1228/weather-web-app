const customFormat = require("./customDateTimeUtils");

function convertToOffsetTime(date, offsetInSeconds) {
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  const localTime = new Date(utcTime + offsetInSeconds * 1000);

  const convert = customFormat(localTime);
  let result = convert.toLocaleString("en-US", {
    timeZone: "UTC",
    hour12: true,
  });

  return result;
}

module.exports = convertToOffsetTime;
