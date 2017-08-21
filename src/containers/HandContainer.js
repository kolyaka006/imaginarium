import { connect } from 'react-redux'
import { setActiveCard } from '../routes/Game/modules/game'
import Hand from '../components/Hand'

const mapDispatchToProps = {
  setActiveCard
}

const mapStateToProps = (state) => ({
  step: state.game.step || 'hand',
  associated: state.game.associated
})

export default connect(mapStateToProps, mapDispatchToProps)(Hand)
