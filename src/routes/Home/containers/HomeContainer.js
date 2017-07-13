import { connect } from 'react-redux'
import { getNews } from '../../../store/news'
import { logout } from '../../User/modules/user'
import Home from '../components/HomeView'

const mapDispatchToProps = {
  getNews,
  logout
}

const mapStateToProps = (state) => ({
  isLogin: state.user ? state.user.isLogin : false,
  name: state.user ? state.user.name : ''
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
