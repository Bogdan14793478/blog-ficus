// types for google analytic
interface ParamGtag {
  page_title: string
  page_location: string
  page_path: string
}

declare function gtag(type: string, action: string, values: ParamGtag): void
