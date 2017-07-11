import React from 'react'
import PropTypes from 'prop-types'

let AddNews = ({ add, idUser, userName, userAvatar }) => {
  let title, description, tagsArray
  return (
    <div className='row' style={{ marginTop: 15 }} >
      <div className='col-sm-12' >
        <form className='row' onSubmit={(e) => {
          e.preventDefault()
          if (!title.value.trim() || !description.value.trim()) {
            return
          }

          let clean = (arr) => {
            for (var i = 0; i < arr.length; i++) {
              if (arr[i] === undefined) {
                arr.splice(i, 1)
                i--
              }
            }
            return arr
          }

          let deleteSpace = (str) => {
            str = str.split(' ')
            str = str.map((el) => {
              if (!!el && el !== ' ') {
                return el
              }
            })
            return str.legth > 1 ? str.join(' ') : str
          }
          let tags = []
          tags = tagsArray.value.split(',')
          tags = tags.map((tag) => {
            let temp = clean(deleteSpace(tag))
            console.log('.....temp', temp)
            console.log('.....temp.join(', temp.join(' '))
            return temp.length > 0 ? temp.join(' ') : temp.join('')
          })
          add({ title: title.value, description: description.value, tags: tags }, idUser)
          title.value = ''
          description.value = ''
          tagsArray.value = ''
        }} >
          <div className='col-sm-12' >
            <input className='form-control' placeholder='Title' ref={input => { title = input }} />
            <textarea className='form-control' placeholder='Description' ref={textarea => { description = textarea }}
              style={{ marginTop: 15 }} />
            <input className='form-control' placeholder='Tags' style={{ marginTop: 15 }}
              ref={input => { tagsArray = input }} />
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
  idUser: PropTypes.number,
  userName: PropTypes.string,
  userAvatar: PropTypes.string
}

export default AddNews
