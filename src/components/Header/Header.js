import React, { Component } from 'react'
import { Link } from 'gatsby';
import Menu from '../Menu';

class Header extends Component {

  render() {
    const { siteTitle, sidebarDocked } = this.props
    return (
      <div
        style={{
          //   position: "fixed",
          //   top: 0,
          width: "100%",
          height: '60px',
          zIndex: 1000,
          marginBottom: '1.45rem',
          background: 'cornflowerblue',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            maxWidth: 1360,
            padding: '1.4rem 1.0875rem',
          }}
        >
          <div style={{
            float: 'left',
            marginBottom: '0.8em',
          }}>
            <h1 style={{ margin: 0, fontSize: "1.25rem" }}>
              <Link
                to="/"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                {siteTitle}
              </Link>
            </h1>
          </div>
          <Menu show={sidebarDocked}/>
        </div>
      </div>
    )
  }
}

export default Header;
