import { connect } from 'react-redux'
import { add } from '../routes/User/modules/user'
import AddNews from '../components/AddNews'

const mapDispatchToProps = {
  add
}

const mapStateToProps = (state) => ({
  idUser : state.user.id,
  userName : state.user.name,
  userAvatar : state.user.avatar,
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNews)
