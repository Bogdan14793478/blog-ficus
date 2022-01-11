export const sentMetrik = (action: string, text: string) => {
  window.gtag("event", action, {
    page_title: text,
    page_location: window.location.href,
    page_path: window.location.pathname,
  })
}
