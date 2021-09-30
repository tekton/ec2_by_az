import * as React from "react"
import Header from "./header"
import "./styles.scss"
import CustomNavbar from "./navbar"

export default function Layout({ width, children, pageInfo }) {

  var size = width
  if (size == null) {
    size = 1024
  }

  return (
    <div style={{ margin: `0 auto`, maxWidth: size, padding: `0 1em` }}>
    <Header siteTitle="ec2 by az" />
    <CustomNavbar pageInfo={pageInfo} />
      {children}
    </div>
  )
}