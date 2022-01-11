import { useEffect, useCallback } from "react"
import { useLocation, useHistory } from "react-router-dom"

export const GoogleAnalytics = () => {
  const idStream = `${process.env.ID_STRIMREACT_APP_ID_STREAM_GOOGLE_ANALYTIC}`
  const location = useLocation()
  const history = useHistory()

  const analytics = useCallback(() => {
    if (history.action === "PUSH") {
      window.gtag("config", idStream, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      })
    }
  }, [history.action, idStream, location.pathname])

  useEffect(() => {
    analytics()
  }, [history, location, analytics])

  return null
}
