import React from 'react'
import PropTypes from 'prop-types'
import BlockNews from './BlockNews'

const BLOCK_ON_PAGE = 5

let ListNews = ({ idUser, news = [], load, filterArray = [], curPage = 0, searchText = '',
                  search, filter, filterDelete, changePage }) => {
  let searchInput, filterInput, count, numberOfPages
  count = 0
  if (filterArray) {
    filterArray.forEach(filter => {
      news = news.filter(item => {
        let titleBool = item.title.indexOf(filter.name) !== -1
        let tagsBool = item.tags.indexOf(filter.name) !== -1
        let userBool = item.user.name.indexOf(filter.name) !== -1
        return titleBool || tagsBool || userBool
      })
    })
  }
  numberOfPages = Math.ceil(news.length / BLOCK_ON_PAGE)
  let pageRow = []
  if (numberOfPages > 1) {
    for (let i = 0; i < numberOfPages; i++) {
      if ((curPage - 2 <= i) && (i <= curPage + 2)) {
        pageRow.push(<div onClick={() => { changePage(i) }}
          className={(() => curPage === i ? 'pagination__page pagination__page_active' : 'pagination__page')()} >
          {i + 1}</div>)
      }
    }
  }
  return (
    <div className='row' style={{ marginTop: 15 }} >
      <div className='col-xs-6' >
        <form onSubmit={(e) => {
          e.preventDefault()
          search(searchInput.value)
          searchInput.value = ''
        }} >
          <input className='form-control' placeholder='Search by title, tags, users'
            ref={node => { searchInput = node }} />
          <div className={`filters ${searchText ? '' : 'hide'}`} >
            <div className='filter-block' >
                {searchText}
            </div>
          </div>
        </form>
      </div>
      <div className='col-xs-6' >
        <form onSubmit={(e) => {
          e.preventDefault()
          filter(filterInput.value.replace(/\s/g, '').split(','))
          filterInput.value = ''
        }} >
          <input type='text' className='form-control'
            placeholder='Filter for title, tags, users (Enter filters separated by commas)'
            ref={node => { filterInput = node }} />
          <div className='filters' >
            {filterArray.map(filter => {
              return (
                <div key={filter.id} className='filter-block' >
                  {filter.name}
                  <div className='close-btn' onClick={() => { filterDelete(filter.id) }} >X</div>
                </div>
              )
            })}
          </div>
        </form>
      </div>
      <div className='row news' >
        {news.map((block, index) => {
          let actualPage = (index + 1) > curPage * BLOCK_ON_PAGE && count < BLOCK_ON_PAGE
          let titleBool = block.title.indexOf(searchText) !== -1
          let tagsBool = block.tags.indexOf(searchText) !== -1
          let userBool = block.user.name.indexOf(searchText) !== -1
          let isSearch = searchText ? titleBool || tagsBool || userBool : true
          if (actualPage && isSearch) {
            count++
            return (
              <div className='col-xs-10 col-xs-offset-1' key={block.id} >
                <BlockNews news={block} />
              </div>
            )
          }
        })}
      </div>
      <div className='col-xs-10 col-xs-offset-1 pagination-block' >
        {curPage > 2 ? (
          <div className='pag-block' >
            <div onClick={() => { changePage(0) }} className='pagination__page' >1</div>
            <div className='pagination__page' >{'...'}</div>
          </div>
        ) : '' }
        {pageRow.map(item => {
          return item
        })}

        {curPage < numberOfPages - 3 ? (
          <div className='pag-block' >
            <div className='pagination__page' >...</div>
            <div onClick={() => { changePage(numberOfPages - 1) }} className='pagination__page' >{numberOfPages}</div>
          </div>
        ) : ''
        }
      </div>
    </div>
  )
}

ListNews.propTypes = {
  idUser: PropTypes.number,
  news: PropTypes.array,
  load: PropTypes.bool,
  filterArray: PropTypes.array,
  searchText: PropTypes.string,
  curPage: PropTypes.number,
  search: PropTypes.func.isRequired,
  filter: PropTypes.func.isRequired,
  filterDelete: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
}

export default ListNews
