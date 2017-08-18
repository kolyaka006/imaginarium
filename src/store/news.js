// ------------------------------------
// Constants
// ------------------------------------
export const GET_NEWS = 'GET_NEWS'
export const ADD_NEWS = 'ADD_NEWS'
export const SEND_START = 'SEND_START'
export const SEND_START_NEWS = 'SEND_START_NEWS'
export const SEARCH_NEWS_END = 'SEARCH_NEWS_END'
export const FILTER_NEWS_END = 'FILTER_NEWS_END'
export const FILTER_NEWS_DELETE = 'FILTER_NEWS_DELETE'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const CHANGE_CHECKED = 'CHANGE_CHECKED'

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
        dispatch({
          type: GET_NEWS,
          load: false,
          news: resp.news
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

export const changeChecked = (checked) => {
  return {
    type: CHANGE_CHECKED,
    checked: checked
  }
}

export const actions = {
  search,
  filter,
  filterDelete,
  changePage,
  changeChecked
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SEND_START]: (state, action) => {
    return Object.assign({}, state, { load: action.load })
  },
  [SEND_START_NEWS]: (state, action) => {
    return Object.assign({}, state, { loadNews: action.load })
  },
  [GET_NEWS]: (state, action) => {
    console.log('.....GET_NEWS news', state, action)
    return Object.assign({}, state, {
      news: action.news.reverse(),
      load: action.load
    })
  },
  [ADD_NEWS]: (state, action) => {
    let news = state.news ? state.news : []
    news.unshift({ ...action.news })
    console.log('.....ADD_NEWS news', state, action)
    return Object.assign({}, state, {
      news: news
    }, { loadNews: action.load })
  },
  [SEARCH_NEWS_END]: (state, action) => {
    return Object.assign({}, state, {
      search: action.search,
      load: action.load
    })
  },
  [FILTER_NEWS_END]: (state, action) => {
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
    return Object.assign({}, state, {
      curPage: action.page < 0 ? 0 : action.page
    })
  },
  [CHANGE_CHECKED]: (state, action) => {
    return Object.assign({}, state, {
      checked: action.checked
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { news: [], filterArray: [], curPage: 0 , checked: {} }
export default function newsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
