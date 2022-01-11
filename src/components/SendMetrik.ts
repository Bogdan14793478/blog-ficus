interface Initial {
  event?: string
}

export const sentMetrik = (action: string, text: string) => {
  const values: Initial = {}
  values.event = text
  window.gtag("event", action, values)
  console.log("event", action, values)
}
