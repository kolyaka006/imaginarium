// ------------------------------------
// Constants
// ------------------------------------
export const SEND_START = 'SEND_START'
export const GET_NEWS = 'GET_NEWS'
export const ADD_NEWS = 'ADD_NEWS'
export const CHANGE_AVATAR = 'CHANGE_AVATAR'
export const EDIT_USER_INFO = 'EDIT_USER_INFO'
export const STATUS_EDIT = 'STATUS_EDIT'
export const SEND_REQUEST = 'SEND_REQUEST'
export const CHECK_LOGIN = 'CHECK_LOGIN'

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
      type: SEND_START,
      load: true
    })
    fetch(`/api/upload/${id}`, {
      method: 'POST',
      body: file })
    .then(json => json.json())
    .then(resp => {
      dispatch({
        type: CHANGE_AVATAR,
        load: false,
        avatar: resp.avatar
      })
    })
  }
}

export const add = (news, id) => {
  return (dispatch, getState) => {
    dispatch({
      type: SEND_START,
      load: true
    })
    fetch('/api/news', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ news: news, id: id })
    }).then(json => json.json())
      .then(resp => {
        console.log('.....resp', resp)
        dispatch({
          type: ADD_NEWS,
          load: false,
          news: resp.news
        })
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
        console.log('.....resp ', resp )
        dispatch({
          type: CHECK_LOGIN,
          load: false,
          isLogin: true,
          user: resp
        })
      })
  }
}

export const changeUserInfo = (info) => {
  return (dispatch, getState) => {
    dispatch({
      type: EDIT_USER_INFO,
      info: info
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

export const actions = {
  getNews,
  add,
  checkLogin,
  changeAvatar,
  editStatus,
  changeUserInfo
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SEND_START]: (state, action) => {
    return Object.assign({}, state, { load: action.load })
  },
  [GET_NEWS]: (state, action) => {
    console.log('.....state user', state)
    return Object.assign({}, state, { news: action.news, load: action.load })
  },
  [STATUS_EDIT]: (state, action) => {
    console.log('.....state user', state)
    return Object.assign({}, state, { edit: action.edit })
  },
  [SEND_REQUEST]: (state, action) => {
    console.log('.....SEND_REQUEST', state, action)
    return Object.assign({}, state, { load: action.load })
  },
  [CHANGE_AVATAR]: (state, action) => {
    console.log('.....SEND_REQUEST', state, action)
    return Object.assign({}, state, { avatar: action.avatar, load: action.load })
  },
  [CHECK_LOGIN]: (state, action) => {
    console.log('.....CHECK_LOGIN', state, action)
    return Object.assign({}, state, action.user, {
      isLogin: action.isLogin,
      load: action.load
    })
  },
  [EDIT_USER_INFO]: (state, action) => {
    console.log('.....EDIT_USER_INFO', state, action)
    return Object.assign({}, state, action.info)
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { news: [], edit: false }
export default function userReducer (state = initialState, action) {
  console.log('.....reducer USER', state, action)
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
