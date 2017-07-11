import { connect } from 'react-redux'
import { search, filter, filterDelete, changePage } from '../store/news'
import ListNews from '../components/ListNews'

const mapDispatchToProps = {
  search,
  filter,
  filterDelete,
  changePage,
}

const mapStateToProps = (state) => {
  return {
    news: state.news.news,
    load: state.user.load,
    idUser: state.user.id,
    curPage: state.news.curPage,
    filterArray: state.news.filterArray,
    searchText: state.news.search
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNews)
