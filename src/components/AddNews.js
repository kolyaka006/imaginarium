import React from 'react'
import PropTypes from 'prop-types'

let AddNews = ({ add, idUser }) => {
  let title, description
  return (
    <div className='row' style={{ marginTop: 15 }}>
      <div className='col-sm-12' >
        <form className='row' onSubmit={(e) => {
          e.preventDefault()
          if (!title.value.trim() || !description.value.trim()) {
            return
          }
          add({ title: title.value, description: description.value }, idUser)
          title.value = ''
          description.value = ''
        }} >
          <div className='col-sm-12'>
            <input className='form-control' placeholder='Title' ref={input => { title = input }} />
            <textarea className='form-control' placeholder='Description' ref={textarea => { description = textarea }}
              style={{ marginTop: 15 }} />
          </div>
          <button className='btn btn-default col-sm-10 col-sm-offset-1' style={{ marginTop: 10 }} >
            Add
          </button>
        </form>
      </div>
    </div>
  )
}

AddNews.propTypes = {
  add: PropTypes.func.isRequired,
  idUser: PropTypes.number
}

export default AddNews
