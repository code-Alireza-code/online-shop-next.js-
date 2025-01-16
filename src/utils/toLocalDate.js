export function toLocalDateString(date, options = {}) {
  return new Date(date).toLocaleDateString("fa-IR", options);
}
