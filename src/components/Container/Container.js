import React, { Component } from 'react';

class Container extends Component {
  render() {
    const {
      sidebarDocked,
      onPostPage,
    } = this.props;

    return (
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '0px 1.0875rem 1.45rem',
          paddingTop: (!sidebarDocked && onPostPage) ? 40 : 0,
          // overflow: !sidebarDocked ? "auto" : "visible",
        }}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Container;