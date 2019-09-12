import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout";
import { connect } from 'react-redux'
import "katex/dist/katex.min.css"
import {
  onSidebarContentSelected,
  onSetSidebarContentEntry,
  onSetSidebarHide,
  onSetAnchorHide,
  onSetAnchorOpen,
  onSetSidebarOpen
} from '../actions/layout'

function Template({
  data, // this prop will be injected by the GraphQL query below.
  onSidebarContentSelected,
  onSetSidebarContentEntry,
  onSetAnchorHide,
  onSetSidebarHide,
  onSetAnchorOpen,
  onSetSidebarOpen,
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html, id } = markdownRemark
  const anchorHide = (frontmatter.hideAnchor === null) ? false : frontmatter.hideAnchor

  if (frontmatter.sidebar) onSetSidebarHide(false)
  else onSetSidebarHide(true)
  onSetAnchorHide(anchorHide)
  onSidebarContentSelected(id)
  onSetSidebarContentEntry(frontmatter.sidebar)
  onSetSidebarOpen(false)
  onSetAnchorOpen(false)

  return (
    <Layout onPostPage={true}>
    <div className="blog-post-container">
      <div className="blog-post">
        { frontmatter.showTitle ? <h1 align="center">{frontmatter.title}</h1> : null }
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
    </Layout>
  )
}

const mapDispatchToProps = {
  onSidebarContentSelected,
  onSetSidebarContentEntry,
  onSetAnchorHide,
  onSetSidebarHide,
  onSetAnchorOpen,
  onSetSidebarOpen,
}

export default connect(()=>({}), mapDispatchToProps) (Template)

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path} }) {
      fields {
        slug
      }
      id
      html
      frontmatter {
        title
        sidebar
        showTitle
        hideAnchor
      }
    }
  }
`