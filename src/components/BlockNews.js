import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

class BlockNews extends React.Component {
  render () {
    return (
      <div className='row news-block' >
        <div className='col-xs-12 text-left text-bold' style={{ fontSize: 24 }} >
          <div className='user-avatar_news' >
            <img className='user-avatar_img' src={this.props.news.user.avatar
              ? '/' + this.props.news.user.avatar + '?' + Date.now() : 'profile_users.jpg'} />
          </div>
          <div className='news-block__title' >
            {this.props.news.title}
          </div>
          <div className='news-block__tags' >
            {this.props.news.tags.map((tag, index) => {
              let count = this.props.news.tags.length
              return (<div className='news-block__tags_tag' key={index} >{tag}{ count - 1 > index ? ',' : ''}</div>)
            })
            }
          </div>
        </div>
        <div className='col-xs-12 text-left' style={{ fontSize: 16, marginTop: 10, marginBottom: 10 }} >
          {this.props.news.description}
        </div>
        <div className={`col-xs-offset-2 col-xs-8 ${this.props.news.poster ? '' : 'hide'}`} >
          <div className='avatar' >
            <img className='user-avatar_img' src={this.props.news.poster
              ? '/' + this.props.news.poster + '?' + Date.now() : ''} />
          </div>
        </div>
        <div className='col-xs-12' style={{ fontSize: 12 }} >
          <div className='ib news-block__footer text-left text-bold' >
            <Link to={`/profile/${this.props.news.user._id}`}>
              {this.props.news.user.name}
            </Link>
          </div>
          <div className='ib news-block__footer text-right text-bold' >
            {this.props.news.created_at.split('T')[0].split('-').reverse().join('-')}
          </div>
        </div>
      </div>
    )
  }
}

BlockNews.propTypes = {
  news: PropTypes.object.isRequired
}

export default BlockNews
