import { connect } from 'react-redux'
import { add, getNews } from '../routes/User/modules/user'
import AddNews from '../components/AddNews'

const mapDispatchToProps = {
  add,
  getNews
}

const mapStateToProps = (state) => ({
  idUser : state.user._id,
  loadNews : state.news.loadNews,
  userName : state.user.name,
  userAvatar : state.user.avatar,
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNews)
