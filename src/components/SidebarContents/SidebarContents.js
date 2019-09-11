import React, { Component } from 'react'
import { graphql, StaticQuery, Link } from "gatsby"
import { connect } from "react-redux"
import { getSidebarState } from '../../store/selectors';
import { onSetSidebarOpen } from '../../actions/layout'
import Menu from 'antd/lib/menu'
import 'antd/lib/menu/style/css'
import './SidebarContents.css'

const SubMenu = Menu.SubMenu


class SidebarContents extends Component {
  onSetSidebarOpen = () => {
    this.props.onSetSidebarOpen(false)
  }

  render() {
    const { expandedKey, entry } = this.props.sidebar

    return (
      <StaticQuery
        query={graphql`
          query sidebarContentQuery {
            allMarkdownRemark(sort: { order: ASC, fields: [fields___slug] }) {
              nodes {
                fields {
                  slug
                }
                id
                frontmatter {
                  title
                }
              }
            }
            allSidebarsJson {
              nodes {
                id
                name
                entry
                child_entries
                items
              }
            }
          }
        `}
        render={data => {
          const entries = data.allSidebarsJson.nodes
          const pages = data.allMarkdownRemark.nodes
          let defaultOpenKeys = []
          const selectedKeys = [expandedKey]

          const convertToTree = (entry) => {
            const rootEntry = getEntry(entry)
            const child_dir = rootEntry.child_entries ?
              rootEntry.child_entries.map(item => convertToTree(item)) : null
            let children = itemToNode(rootEntry)
            if (children && child_dir) children = children.concat(child_dir)
            else if (children === null) children = child_dir
            return {
              key: rootEntry.id,
              title: rootEntry.name,
              children: children
            }
          }

          const getEntry = (entry) => {
            for (let item in entries) {
              if (entries[item].name === entry) return entries[item]
            }
            return null
          }

          const itemToNode = (entry) => {
            if (entry.items == null) return null
            return entry.items.map(item => {
              return getPage("/" + item, entry.id)
            })
          }

          const getPage = (path, parent) => {
            for (let item in pages) {
              if (pages[item].fields.slug === path) {
                if (pages[item].id === expandedKey) defaultOpenKeys.push(parent)
                return ({
                  path: pages[item].fields.slug,
                  key: pages[item].id,
                  title: pages[item].frontmatter.title,
                })
              }
            }
            return null
          }
          const tree = convertToTree(entry)

          const loop = root => {
            if (root.children) {
              return root.children.map(item => {
                if (item.path) {
                  return (
                    <Menu.Item key={item.key}>
                      <Link to={item.path} onClick={this.onSetSidebarOpen}>{item.title}</Link>
                    </Menu.Item>
                  )
                }
                return (
                  <SubMenu key={item.key} title={<span style={{fontWeight:900}}>{item.title}</span>}>
                    {loop(item)}
                  </SubMenu>
                )
              })
            }
          }
          return (
            <Menu 
              mode="inline"
              defaultOpenKeys={defaultOpenKeys}
              selectedKeys={selectedKeys}
              inlineIndent={12}
            >
              {loop(tree)}
            </Menu>
          )
        }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sidebar: getSidebarState(state),
  }
}

const mapDispatchToProps = {
  onSetSidebarOpen
}

export default connect(mapStateToProps, mapDispatchToProps) (SidebarContents)