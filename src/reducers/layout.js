import { 
  SET_ANCHOR_OPEN,
  SET_SIDEBAR_OPEN, 
  SET_SIDEBAR_DOCKED,
  ON_SIDEBAR_CONTENT_EXPAND,
  ON_CHANGE_MENU_STATE,
} from "../actions/actionTypes";

const initialState = {
  header: { height: 0 },
  anchor: { open: false },
  sidebar: {
    docked: false,
    open: false,
    expandedKey: '',
    searchValue: '',
    autoExpandParent: true,
  },
  menu : { open : false },
}

export default function(state=initialState, action) {
  switch (action.type) {

    // anchor
    case SET_ANCHOR_OPEN: {
      return {
        ...state,
        anchor: { 
          ...state.anchor,
          open: action.payload.anchorOpen 
        }
      }
    }
    // sidebar
    case SET_SIDEBAR_OPEN: {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          open: action.payload.sidebarOpen
        }
      }
    }
    case SET_SIDEBAR_DOCKED: {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          docked: action.payload.sidebarDocked,
          open: action.payload.sidebarOpen
        }
      }
    }
    case ON_SIDEBAR_CONTENT_EXPAND: {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          expandedKey: action.payload.expandedKey,
          autoExpandParent: action.payload.autoExpandParent
        }
      }
    }
    //menu
    case ON_CHANGE_MENU_STATE: {
      return {
        ...state,
        menu: {
          open: !state.menu.open,
          nItem: action.payload.nItem,
        }
      }
    }
    default: return state
  }
}