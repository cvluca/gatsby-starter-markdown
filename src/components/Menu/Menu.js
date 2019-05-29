import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import List from 'antd/lib/List'



const Menu = (prop) => {
  const { show } = prop
  return (
    <StaticQuery
      query={graphql`
        query {
          allMenuItems {
            edges {
              node {
                name
                link
              }
            }
          }
        }
      `}
      render={data => {
        const menuItems = data.allMenuItems.edges.map(edge => edge.node).reverse()
        return (
          <div>
          {show &&
          <div>
            {menuItems.map(item => {
              return (
                <div 
                  style={{ marginLeft: "2em", float: "right" }}
                  key={menuItems.indexOf(item)}
                >
                  <p style={{ margin:0, fontSize: "1rem" }}>
                    <Link
                      to={item.link}
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      {item.name}
                    </Link>
                  </p>
                </div>
              )
            })}
          </div>
          }
          {!show &&
          <>
            <Button 
              style={{
                float: "right",
                marginTop: '-10px',
                marginRight: '-10px',
                color: 'white',
              }}
              type='link'
            >
              <Icon type="menu" />
            </Button>
          </>
          }
          </div>
        )
      }}
    />
  )
}

export default Menu