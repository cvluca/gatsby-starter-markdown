import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMenuState } from '../../store/selectors';

class Container extends Component {
  render() {
    const {
      sidebarDocked,
      onPostPage,
      menuOpen,
      nMenuItem,
    } = this.props;

    return (
        <div
          style={{
            position: "absolute",
            top: (!sidebarDocked && onPostPage) ? 
              (menuOpen ? nMenuItem*32 + 90 : 95): (menuOpen ? nMenuItem*32 + 75 : 80),
            left: 0,
            right: 0,
            bottom: 0,
            overflow: !sidebarDocked ? "auto" : "visible",
          }}
        >
          <div
            style={{
              margin: '0 auto',
              maxWidth: 960,
              padding: '0px 1.0875rem 1.45rem',
              paddingTop: (!sidebarDocked && onPostPage) ? 40 : 0,
            }}
          >
            {this.props.children}
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    menuOpen: getMenuState(state).open,
    nMenuItem: getMenuState(state).nItem,
  }
}

export default connect(mapStateToProps) (Container);