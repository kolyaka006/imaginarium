// ------------------------------------
// Constants
// ------------------------------------
export const GET_NEWS = 'GET_NEWS'
export const ADD_NEWS = 'ADD_NEWS'
export const SEND_START = 'SEND_START'
export const SEARCH_NEWS_END = 'SEARCH_NEWS_END'
export const FILTER_NEWS_END = 'FILTER_NEWS_END'
export const FILTER_NEWS_DELETE = 'FILTER_NEWS_DELETE'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const LOCATION_CHANGE = 'LOCATION_CHANGE'

let filterID = 0

// ------------------------------------
// Actions
// ------------------------------------
export const getNews = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: SEND_START,
      load: true
    })
    fetch(`/api/news?id=${id}`).then(json => json.json())
      .then(resp => {
        console.log('.....resp get', resp)
        dispatch({
          type: GET_NEWS,
          load: false,
          news: resp
        })
      })
  }
}

export const search = (search) => {
  return (dispatch, getState) => {
    dispatch({
      type: SEND_START,
      load: true
    })
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: SEARCH_NEWS_END,
          load: false,
          search: search
        })
        resolve()
      }, 500)
    })
  }
}

export const filter = (filter) => {
  return (dispatch, getState) => {
    dispatch({
      type: SEND_START,
      load: true,
    })
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: FILTER_NEWS_END,
          load: false,
          filter: filter
        })
        resolve()
      }, 500)
    })
  }
}

export const filterDelete = (filter) => {
  return {
    type: FILTER_NEWS_DELETE,
    filter: filter
  }
}

export const changePage = (page) => {
  return {
    type: CHANGE_PAGE,
    page: page
  }
}

export const actions = {
  search,
  filter,
  filterDelete,
  changePage
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
    return Object.assign({}, state, {
      news: action.news,
      load: action.load
    })
  },
  [ADD_NEWS]: (state, action) => {
    console.log('.....ADD_NEWS', state, action)
    let news = state.news ? state.news : []
    return Object.assign({}, state, {
      news: [...news, { ...action.news }]
    }, { load: action.load })
  },
  [SEARCH_NEWS_END]: (state, action) => {
    return Object.assign({}, state, {
      search: action.search,
      load: action.load
    })
  },
  [FILTER_NEWS_END]: (state, action) => {
    console.log('.....FILTER_NEWS_END', state, action)
    console.log('.....teswt new filter', [...state.filterArray, ...action.filter.map(item => {
      return { name: item, id: filterID++ }
    })])
    return Object.assign({}, state, {
      load: action.load,
      filterArray: [...state.filterArray, ...action.filter.map(item => {
        return { name: item, id: filterID++ }
      })]
    })
  },
  [FILTER_NEWS_DELETE]: (state, action) => {
    return Object.assign({}, state, {
      load: action.load,
      filterArray: state['filterArray'].filter((item) => { return item.id !== action.filter })
    })
  },
  [CHANGE_PAGE]: (state, action) => {
    console.log('.....CHANGE_PAGE', state, action)
    return Object.assign({}, state, {
      curPage: action.page
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { news: [], filterArray: [], curPage: 0 }
export default function newsReducer (state = initialState, action) {
  console.log('.....Reducer  News', state, action)
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
