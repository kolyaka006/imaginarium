import { connect } from 'react-redux'
import { getBlockCard, getHand, setActiveCard, addCardOnDesk } from '../modules/game'
import Game from '../components/GameView'

const mapDispatchToProps = {
  getBlockCard,
  getHand,
  setActiveCard,
  addCardOnDesk
}

const mapStateToProps = (state) => {
  return ({
    BlockCards: state.game.blockCards || [],
    activeCard: state.game.activeCard,
    step: state.game.step || 'hand',
    associated: state.game.associated,
    youStep: state.game.youStep,
    hand: state.game.hand || [],
    desk: state.game.desk || []
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
