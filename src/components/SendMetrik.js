/* eslint-disable dot-notation */
export const sentMetrik = (action, category, label, value) => {
  const values = {}
  if (typeof category !== "undefined") {
    values["event_category"] = category
  }
  if (typeof label !== "undefined") {
    values["event_label"] = label
  }
  if (typeof value !== "undefined") {
    values["value"] = value
    // eslint-disable-next-line brace-style
  }
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    // eslint-disable-next-line prettier/prettier
    window.gtag("event", action, values)
  } else {
    // eslint-disable-next-line no-console
    console.log("event", action, values)
  }
}
