// ------------------------------------
// Constants
// ------------------------------------
export const SEND_START = 'SEND_START'
export const GET_NEWS = 'GET_NEWS'

// ------------------------------------
// Actions
// ------------------------------------
export const getNews = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: SEND_START,
      load: true
    })
    fetch(`/api/userInfo?id=${id}`)
      .then(json => json.json())
      .then(resp => {
        dispatch({
          type: GET_NEWS,
          load: false,
          news: resp.news,
          user: resp.user
        })
      })
  }
}

export const actions = {
  getNews
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SEND_START]: (state, action) => {
    return Object.assign({}, state, { load: action.load })
  },
  [GET_NEWS]: (state, action) => {
    console.log('.....GET_NEWS', state, action)
    return Object.assign({}, state, action, { load: action.load })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { news: [], user: {} }
export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
