import { 
  SET_ANCHOR_OPEN,
  SET_SIDEBAR_OPEN, 
  SET_SIDEBAR_DOCKED, 
  ON_SIDEBAR_CONTENT_EXPAND, 
  ON_CHANGE_MENU_STATE,
  SET_SIDEBAR_ENTRY,
} from "./actionTypes";

// anchor
export const onSetAnchorOpen = (open) => ({
  type: SET_ANCHOR_OPEN,
  payload: {
    anchorOpen: open
  }
})

// sidebar
export const onSetSidebarOpen = (open) => ({
  type: SET_SIDEBAR_OPEN,
  payload: { sidebarOpen: open }
})

export const onSetSidebarDocked = (docked) => ({
  type: SET_SIDEBAR_DOCKED,
  payload: {
    sidebarDocked: docked,
  }
})

export const onSetSidebarEntry = (entry) => ({
  type: SET_SIDEBAR_ENTRY,
  payload: { sidebarEntry: entry }
})

export const onSidebarContentExpand = (expandedKey) => ({
  type: ON_SIDEBAR_CONTENT_EXPAND,
  payload: {
    expandedKey,
    autoExpandParent: false
  }
})

// menu
export const onChangeMenuState = (nItem) => ({
  type: ON_CHANGE_MENU_STATE,
  payload: {
    nItem: nItem,
  }
})