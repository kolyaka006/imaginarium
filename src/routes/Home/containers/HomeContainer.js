import { connect } from 'react-redux'
import { getNews } from '../../../store/news'
import { logout, setUserId, addMessInChat, createGame } from '../../User/modules/user'
import Home from '../components/HomeView'

const mapDispatchToProps = {
  getNews,
  logout,
  setUserId,
  addMessInChat,
  createGame
}

const mapStateToProps = (state) => {
  return {
    user: state.user ? state.user.user : {},
    userId: state.user ? state.user.userId : {},
    load: state.user ? state.user.load : false,
    games: state.user ? state.user.games : false,
    isLogin: state.user ? state.user.isLogin : false,
    arrChat: state.user && state.user.arrChat ? state.user.arrChat : []
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
