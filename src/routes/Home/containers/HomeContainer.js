import { connect } from 'react-redux'
import { getNews } from '../../../store/news'
import Home from '../components/HomeView'

const mapDispatchToProps = {
  getNews
}

const mapStateToProps = (state) => {
  console.log('.....HOEM mapStateToProps', state)
  return {
    isLogin: state.user.isLogin,
    name: state.user.name
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
