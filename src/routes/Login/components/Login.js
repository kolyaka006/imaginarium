import React from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'

let Login = ({ checkLogin, load = false, isLogin, user }) => {
  let login, password
  if (user.name) {
    browserHistory.push('/home')
  }
  return (
    <div className='row'>
      <h2 className='header-font'> Login </h2>
      <div className='col-sm-6 col-sm-offset-3'>
        <form className='row login-form' onSubmit={(e) => {
          e.preventDefault()
          let value = {
//            login: !login.value.trim() || !!login.value.match(/\W+/),
            login: !login.value.trim(),
            password: !password.value.trim(),
          }
          let queryInput = {
            login: document.querySelector('.inputLogin'),
            password: document.querySelector('.inputPassword'),
          }
          for (let item in queryInput) {
            queryInput[item].classList.remove('error-input')
          }
          if (value.login || value.password) {
            for (let item in queryInput) {
              value[item] ? queryInput[item].classList.add('error-input') : false
            }
            return
          }
          checkLogin(login.value, password.value)
          login.value = ''
          password.value = ''
        }
      } >
          <div className='col-sm-6 col-sm-offset-3' style={{ marginTop: 30 }}>
            <input className='form-control inputLogin' placeholder='Login' ref={node => { login = node }} />
          </div>
          <div className='col-sm-6 col-sm-offset-3' style={{ marginTop: 15 }}>
            <input type='password' className='form-control inputPassword' placeholder='Password'
              ref={node => { password = node }} />
          </div>
          <button className={'btn btn-login btn-login col-sm-2 col-sm-offset-5 ' +
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
  user: PropTypes.object,
  isLogin: PropTypes.bool,
}

export default Login
