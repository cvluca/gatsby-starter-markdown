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
import MediaQuery from "react-responsive";
import { default as AntdLayout } from 'antd/lib/layout';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col'

class Layout extends Component {
  setPostPageState = (state) => {
    this.props.setPostPageState(state)
  }

  render () {
    const {
      children,
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
      }
    `}
      render={data => {
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
                      zIndex: 100,
                    }}
                  >
                    <Row>
                      <Col>
                        <Header siteTitle={data.site.siteMetadata.title} sidebarDocked={!matches}/>
                      </Col>
                      <Col>
                        {(matches && onPostPage) ?
                          <ResponsiveTopBar/>
                          : null
                        }
                      </Col>
                    </Row>
                  </AntdLayout.Header>
                  { !sidebarHide && !matches && onPostPage &&
                    <AntdLayout.Sider>
                      <ResponsiveSidebar/>
                    </AntdLayout.Sider>
                  }
                  <AntdLayout.Content
                    style={{
                      position: "absolute",
                      left: (sidebarHide || matches) ? 0 : "20%",
                      right: (anchorHide || matches) ? 0 : "15%",
                    }}
                  >
                    <Container sidebarDocked={!matches} onPostPage={onPostPage}>
                      {children}
                    </Container>
                  </AntdLayout.Content>
                  { !anchorHide && !matches && onPostPage &&
                    <AntdLayout.Sider>
                      <ResponsiveAnchor />
                    </AntdLayout.Sider>
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

export default Layout
