import * as React from "react"
// import { Link } from "gatsby"
import Layout from "../components/layout"

// styles
const pageStyles = {
  color: "white",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  margin: "auto",
  maxWidth: "1024px",
  backgroundColor: "#474747",
  fontSize: "150%",
}

const center = {
  textAlign: "center"
}

const largerCenter = {
  textAlign: "center",
  fontSize: "200%",
}

// markup
const IndexPage = () => {
  return (
    <Layout pageInfo={{ pageName: "index" }}>
      <main style={pageStyles}>
        <div style={largerCenter}>stuff with the thing</div>
      </main>
    </Layout>
  )
}

export default IndexPage
