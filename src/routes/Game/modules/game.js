import BlockCard from '../../../components/db.json'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_BLOCK_CARD = 'GET_BLOCK_CARD'
export const GET_HAND = 'GET_HAND'

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
    })
  }
}

export const actions = {
  getBlockCard,
  getHand
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
    return Object.assign({}, state, { hand: randcard() })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { blockCards: [], hand: [], desk: [] }
export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
