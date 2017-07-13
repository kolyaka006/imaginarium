// ------------------------------------
// Constants
// ------------------------------------
export const SEND_START = 'SEND_START'
export const SEND_START_NEWS = 'SEND_START_NEWS'
export const SEND_START_AVATAR = 'SEND_START_AVATAR'
export const GET_NEWS = 'GET_NEWS'
export const ADD_NEWS = 'ADD_NEWS'
export const CHANGE_AVATAR = 'CHANGE_AVATAR'
export const EDIT_USER_INFO = 'EDIT_USER_INFO'
export const STATUS_EDIT = 'STATUS_EDIT'
export const SEND_REQUEST = 'SEND_REQUEST'
export const CHECK_LOGIN = 'CHECK_LOGIN'
export const LOGOUT = 'LOGOUT'

// ------------------------------------
// Actions
// ------------------------------------
export const getNews = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: SEND_START,
      load: true
    })
    fetch(`/api/news?id=${id}`)
      .then(json => json.json())
      .then(resp => {
        dispatch({
          type: GET_NEWS,
          load: false,
          news: resp
        })
      })
  }
}
export const changeAvatar = (id, file) => {
  return (dispatch, getState) => {
    dispatch({
      type: SEND_START_AVATAR,
      load: true
    })
    fetch(`/api/upload/${id}/0`, {
      method: 'POST',
      body: file
    }).then(json => json.json())
      .then(resp => {
        dispatch({
          type: CHANGE_AVATAR,
          load: false,
          avatar: resp.avatar
        })
      })
  }
}

export const add = (news, id, poster) => {
  return (dispatch, getState) => {
    dispatch({
      type: SEND_START_NEWS,
      load: true
    })
    fetch('/api/news', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ news: news, id: id, poster: poster ? poster.type : false })
    }).then(json => json.json())
      .then(resp => {
        if (poster) {
          fetch(`/api/upload/${resp.news.id}/1`, {
            method: 'POST',
            body: poster.data
          })
            .then(json => json.json())
            .then(resp2 => {
              dispatch({
                type: ADD_NEWS,
                load: false,
                news: resp.news
              })
            })
        } else {
          dispatch({
            type: ADD_NEWS,
            load: false,
            news: resp.news
          })
        }
      })
  }
}

export const checkLogin = (login, password) => {
  return (dispatch, getState) => {
    dispatch({
      type: SEND_REQUEST,
      load: true,
    })
    fetch(`/api/login?login=${login}&password=${password}`)
      .then(json => json.json())
      .then(resp => {
        dispatch({
          type: CHECK_LOGIN,
          load: false,
          isLogin: true,
          user: resp
        })
      })
  }
}

export const changeUserInfo = (info, id) => {
  return (dispatch, getState) => {
    dispatch({
      type: SEND_START,
      load: true
    })
    fetch(`/api/user/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ info: info })
    }).then(json => json.json())
      .then(resp => {
        dispatch({
          type: EDIT_USER_INFO,
          load: false,
          edit: false,
          info: resp.info
        })
      })
  }
}

export const editStatus = () => {
  return (dispatch, getState) => {
    dispatch({
      type: STATUS_EDIT,
      edit: !getState().edit
    })
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    dispatch({
      type: LOGOUT,
      isLogin: false
    })
  }
}

export const actions = {
  getNews,
  add,
  checkLogin,
  changeAvatar,
  editStatus,
  changeUserInfo,
  logout
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SEND_START]: (state, action) => {
    return Object.assign({}, state, { load: action.load })
  },
  [SEND_START_AVATAR]: (state, action) => {
    return Object.assign({}, state, { loadAvatar: action.load })
  },
  [GET_NEWS]: (state, action) => {
    return Object.assign({}, state, { news: action.news, load: action.load })
  },
  [STATUS_EDIT]: (state, action) => {
    return Object.assign({}, state, { edit: action.edit })
  },
  [SEND_REQUEST]: (state, action) => {
    return Object.assign({}, state, { load: action.load })
  },
  [CHANGE_AVATAR]: (state, action) => {
    return Object.assign({}, state, { avatar: action.avatar, loadAvatar: action.load })
  },
  [CHECK_LOGIN]: (state, action) => {
    return Object.assign({}, state, action.user, {
      isLogin: action.isLogin,
      load: action.load
    })
  },
  [EDIT_USER_INFO]: (state, action) => {
    return Object.assign({}, state, action.info, { edit: action.edit })
  },
  [LOGOUT]: (state, action) => {
    console.log('.....testLOGOUT', state, action)
    return Object.assign({}, { isLogin: action.isLogin })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { news: [], edit: false }
export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
