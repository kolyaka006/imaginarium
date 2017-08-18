import { connect } from 'react-redux'
import { getBlockCard, getHand } from '../modules/game'
import Game from '../components/GameView'

const mapDispatchToProps = {
  getBlockCard,
  getHand
}

const mapStateToProps = (state) => {
  return ({
    BlockCards: state.game.blockCards || [],
    activeCard: state.game.activeCard,
    hand: state.game.hand || [],
    desk: state.game.desk || []
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
