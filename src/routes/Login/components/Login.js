import React from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'

let Login = ({ checkLogin, load, isLogin }) => {
  let login, password
  if (isLogin) {
    browserHistory.push('/')
  }
  return (
    <div className='row'>
      <h2> Login </h2>
      <div className='col-sm-6 col-sm-offset-3'>
        <form className='row' onSubmit={(e) => {
          e.preventDefault()
          if (!login.value.trim() || !password.value.trim()) {
            return
          }
          checkLogin(login.value, password.value)
          login.value = ''
          password.value = ''
        }
      } >
          <div className='col-sm-6 col-sm-offset-3' style={{ marginTop: 30 }}>
            <input className='form-control' placeholder='Login' ref={node => { login = node }} />
          </div>
          <div className='col-sm-6 col-sm-offset-3' style={{ marginTop: 15 }}>
            <input className='form-control' placeholder='Password' ref={node => { password = node }} />
          </div>
          <button className={'btn btn-default btn-login col-sm-2 col-sm-offset-5 ' +
          'col-xs-6 col-xs-offset-3'} disabled={load}>
            {(load ? <div className='loader' /> : 'Login')}
          </button>
        </form>
      </div>
    </div>
  )
}
Login.propTypes = {
  checkLogin: PropTypes.func.isRequired,
  load: PropTypes.bool,
  isLogin: PropTypes.bool,
}

export default Login
