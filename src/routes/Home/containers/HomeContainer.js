import { connect } from 'react-redux'
import { getNews } from '../../../store/news'
import { logout, setUserId, addMessInChat } from '../../User/modules/user'
import Home from '../components/HomeView'

const mapDispatchToProps = {
  getNews,
  logout,
  setUserId,
  addMessInChat
}

const mapStateToProps = (state) => {
  return {
    user: state.user ? state.user.user : {},
    userId: state.user ? state.user.userId : {},
    load: state.user ? state.user.load : false,
    isLogin: state.user ? state.user.isLogin : false,
    arrChat: state.user ? state.user.arrChat : []
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
