export function toLocalDateString(date, options = null) {
  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("fa-IR", options || defaultOptions);
}
