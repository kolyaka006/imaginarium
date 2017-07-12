import { connect } from 'react-redux'
import { getNews } from '../modules/profile'
import Profile from '../components/Profile'

const mapDispatchToProps = {
  getNews
}

const mapStateToProps = (state) => {
  return {
    user: state.profile.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
