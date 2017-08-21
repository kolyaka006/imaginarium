import BlockCard from '../../../components/db.json'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_BLOCK_CARD = 'GET_BLOCK_CARD'
export const GET_HAND = 'GET_HAND'
export const SET_ACTIVE_CARD = 'SET_ACTIVE_CARD'
export const ADD_CARD_ON_DESK = 'ADD_CARD_ON_DESK'

// ------------------------------------
// Actions
// ------------------------------------
export const getBlockCard = () => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_BLOCK_CARD,
      card: BlockCard
    })
  }
}

export const getHand = () => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_HAND,
      activeCard: null
    })
  }
}

export const setActiveCard = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_ACTIVE_CARD,
      activeCard: id
    })
  }
}

export const addCardOnDesk = (text) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_CARD_ON_DESK,
      associated: text
    })
  }
}

export const actions = {
  getBlockCard,
  getHand,
  setActiveCard,
  addCardOnDesk
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [GET_BLOCK_CARD]: (state, action) => {
    return Object.assign({}, state, { blockCards: action.card })
  },
  [GET_HAND]: (state, action) => {
    let randcard = () => {
      let temp = []
      let arr = []
      let getRandomNumber = () => {
        let num = (Math.random() * 10000).toFixed(0) % state.blockCards.length
        if (temp.indexOf(num) !== -1) {
          getRandomNumber()
        } else {
          return num
        }
      }
      for (let i = 0; i < 7; i++) {
        temp.push(getRandomNumber())
      }
      state.blockCards = state.blockCards.filter((item, i) => {
        if (temp.indexOf(i) !== -1) {
          arr.push(state.blockCards[i])
          return false
        }
        return true
      })
      return arr
    }
    return Object.assign({}, state, { hand: randcard(), desk: [], step: 'hand', activeCard: action.activeCard })
  },
  [SET_ACTIVE_CARD]: (state, action) => {
    console.log('.....SET_ACTIVE_CARD', state, action)
    return Object.assign({}, state, { activeCard: action.activeCard })
  },
  [ADD_CARD_ON_DESK]: (state, action) => {
    console.log('.....ADD_CARD_ON_DESK', Object.assign({}, state, { activeCard: null,
      step: 'desk',
      youStep: false,
      associated: action.associated,
      desk: [...state.desk, activeCard],
      hand: state.hand.filter((item, index) => { return index !== state.activeCard }) })
  )
    let activeCard = state.hand.filter((item, index) => { return index === state.activeCard })[0]
    return Object.assign({}, state, { activeCard: null,
      step: 'desk',
      youStep: false,
      associated: action.associated,
      desk: [...state.desk, activeCard],
      hand: state.hand.filter((item, index) => { return index !== state.activeCard }) })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { blockCards: [], hand: [], desk: [], youStep: true }
export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
