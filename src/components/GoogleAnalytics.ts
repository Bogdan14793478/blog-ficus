/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useCallback } from "react"
import { useLocation, useHistory } from "react-router-dom"

export const GoogleAnalytics = () => {
  const idStrim = `${process.env.REACT_APP_ID_POTOK_GOOGLE_ANALYTIC}`
  const location = useLocation()
  const history = useHistory()

  const analytics = useCallback(() => {
    if (history.action === "PUSH") {
      window.gtag("config", idStrim, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      })
    }
  }, [history.action, idStrim, location.pathname])

  useEffect(() => {
    analytics()
  }, [history, location, analytics])

  return null
}
