// mm/dd/yy h:mm:ss tt
function convertToCustomDateTime(parsedDate) {
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const year = parsedDate.getFullYear();

  let hours = parsedDate.getHours();
  const minutes = String(parsedDate.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? String(hours).padStart(2, "0") : "12";

  return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
}

module.exports = convertToCustomDateTime;
