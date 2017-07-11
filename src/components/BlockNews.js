import React from 'react'
import PropTypes from 'prop-types'

class BlockNews extends React.Component {
  render () {
    return (
      <div className='row news-block'>
        <div className='col-sm-2' >
          <div className='avatar' />
        </div>
        <div className='col-sm-10' >
          <div className='col-sm-10 text-left text-bold' style={{ fontSize: 24 }}>
            {this.props.title}
          </div>
          <div className='col-sm-12 text-left' style={{ fontSize: 16 }}>
            {this.props.decription}
          </div>
          <div className='col-sm-12 text-right text-bold' style={{ fontSize: 12 }}>
            {this.props.created_at.split('T')[0].split('-').reverse().join('-')}
          </div>
        </div>
      </div>
    )
  }
}

BlockNews.propTypes = {
  title: PropTypes.string.isRequired,
  decription: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
}

export default BlockNews
