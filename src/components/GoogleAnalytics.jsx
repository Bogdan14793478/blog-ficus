import React from "react"
import { withRouter } from "react-router-dom"

class GoogleAnalytics extends React.Component {
  // eslint-disable-next-line react/no-deprecated
  componentWillUpdate({ location, history }) {
    const gtag = window.gtad
    // eslint-disable-next-line react/destructuring-assignment
    if (location.pathname === this.props.location.pathname) {
      return
    }
    if (history.action === "PUSH" && typeof gtag === "function") {
      gtag("config", "G-8WK88VZ9XF", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      })
    }
  }

  render() {
    return null
  }
}
// eslint-disable-next-line import/no-default-export
export default withRouter(GoogleAnalytics)
