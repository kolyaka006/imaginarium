import React from 'react'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='text-center'>
    <div>
      <h1 style={{ color: '#FFF38D' }}>Test imaginarium</h1>
    </div>
    {children}
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
