import React from 'react'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='text-center' >
    <h1>React Redux News</h1>
    {children}
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
