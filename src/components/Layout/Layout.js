import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Header from '../Header/Header'
import './Layout.css'
import ResponsiveSidebar from '../ResponsiveSidebar';
import Container from '../Container';
import ResponsiveAnchor from '../ResponsiveAnchor';
import ResponsiveTopBar from '../ResponsiveTopBar';
import { pathPrefix } from '../../../gatsby-config'
import MediaQuery from "react-responsive";
import { default as AntdLayout } from 'antd/lib/layout';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col'
import { getContentState } from '../../store/selectors';
import { setPostPageState } from '../../actions/layout'
import { connect } from 'react-redux'

class Layout extends Component {
  setPostPageState = (state) => {
    this.props.setPostPageState(state)
  }

  render () {
    const {
      children,
      sidebarRoot,
      onPostPage,
    } = this.props

    return (
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `}
      render={data => {
        const allPosts = data.allMarkdownRemark.edges.map(edge => edge.node.fields.slug)
        if (typeof window !== 'undefined') {
          let path;
          if (pathPrefix.endsWith('/')) {
            path = window.location.pathname.replace(pathPrefix.slice(0, -1), "")
          } else {
            path = window.location.pathname.replace(pathPrefix, "")
          }
          if (allPosts.indexOf(path) >= 0 || allPosts.indexOf(path.slice(0, -1)) >= 0) {
            this.setPostPageState(true)
          } else {
            this.setPostPageState(false)
          }
        }

        return (
          <MediaQuery
            maxWidth={1000}
          >
            {(matches) => (
              <>
                <Helmet
                  title={data.site.siteMetadata.title}
                  meta={[
                    { name: 'description', content: 'Sample' },
                    { name: 'keywords', content: 'sample, something' },
                  ]}
                >
                  <html lang="en" />
                </Helmet>
                <AntdLayout>
                  <AntdLayout.Header
                    style={{
                      position: 'fixed',
                      top: 0,
                      width: '100%',
                      overflow: 'hidden',
                      zIndex: 100,
                    }}
                  >
                    <Row>
                      <Col>
                        <Header siteTitle={data.site.siteMetadata.title} sidebarDocked={!matches}/>
                      </Col>
                      <Col>
                        {(matches && onPostPage) ?
                          <ResponsiveTopBar root={sidebarRoot} />
                          : null
                        }
                      </Col>
                    </Row>
                  </AntdLayout.Header>

                  {(!matches && onPostPage) ?
                    <AntdLayout>
                      <AntdLayout.Sider>
                        <ResponsiveSidebar root={sidebarRoot} />
                      </AntdLayout.Sider>
                      <AntdLayout.Content
                        style={{
                          position: "absolute",
                          left: "20%",
                          right: "15%",
                        }}
                      >
                        <Container sidebarDocked={!matches} >
                          {children}
                        </Container>
                      </AntdLayout.Content>
                      <AntdLayout.Sider>
                        <ResponsiveAnchor />
                      </AntdLayout.Sider>
                    </AntdLayout>
                    :
                    <AntdLayout.Content>
                      <Container sidebarDocked={!matches} >
                        {children}
                      </Container>
                    </AntdLayout.Content>
                  }
                </AntdLayout>
              </>)
            }
          </MediaQuery>
        )
      }}
    />
  )
    }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const mapStateToProps = (state) => {
  return {
    onPostPage: getContentState(state).onPostPage
  }
}

const mapDispatchToProps = {
  setPostPageState,
}

export default connect(mapStateToProps, mapDispatchToProps) (Layout)
