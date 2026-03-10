function sanitizeText(value, options = {}) {
  const maxLength = options.maxLength || 500;
  const allowEmpty = options.allowEmpty || false;

  const normalized = String(value || "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!allowEmpty && !normalized) {
    return { value: "", error: "This field is required." };
  }

  if (normalized.length > maxLength) {
    return { value: normalized.slice(0, maxLength), error: `Maximum length is ${maxLength} characters.` };
  }

  return { value: normalized, error: null };
}

function sanitizeCsvList(value, options = {}) {
  const maxItemLength = options.maxItemLength || 80;
  const maxItems = options.maxItems || 20;

  const items = String(value || "")
    .split(",")
    .map((entry) => sanitizeText(entry, { maxLength: maxItemLength, allowEmpty: true }).value)
    .filter(Boolean)
    .slice(0, maxItems);

  return items;
}

function parseOrder(value) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0 || parsed > 100000) {
    return { value: 0, error: "Order must be an integer between 0 and 100000." };
  }
  return { value: parsed, error: null };
}

function sanitizeUrl(value, options = {}) {
  const allowEmpty = options.allowEmpty || false;
  const { value: sanitized } = sanitizeText(value, { maxLength: 500, allowEmpty: true });

  if (!sanitized) {
    if (allowEmpty) return { value: "", error: null };
    return { value: "", error: "URL is required." };
  }

  if (sanitized.startsWith("/")) {
    return { value: sanitized, error: null };
  }

  try {
    const parsed = new URL(sanitized);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { value: sanitized, error: "URL must start with http://, https://, or /." };
    }
    return { value: sanitized, error: null };
  } catch {
    return { value: sanitized, error: "Invalid URL format." };
  }
}

function toPublishedFlag(value) {
  return value === "on" || value === true || value === "true";
}

function collectErrors(results) {
  return Object.values(results)
    .map((entry) => entry && entry.error)
    .filter(Boolean);
}

module.exports = {
  sanitizeText,
  sanitizeCsvList,
  parseOrder,
  sanitizeUrl,
  toPublishedFlag,
  collectErrors,
};
