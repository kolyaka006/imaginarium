import React from 'react'
import PropTypes from 'prop-types'

let AddNews = ({ add, idUser, userName, userAvatar }) => {
  let title, description, tagsArray, poster
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
            return temp.length > 0 ? temp.join(' ') : temp.join('')
          })
          add({ title: title.value,
            description: description.value,
            tags: tags,
            user: { id: idUser, name: userName },
            userAvatar: userAvatar },
            idUser, poster)
          title.value = ''
          description.value = ''
          tagsArray.value = ''
          poster = ''
          let preview = document.querySelector('#poster')
          let reader = new FileReader()
          reader.onloadend = () => {
            preview.src = ''
          }
        }} >
          <div className='col-sm-12' >
            <input className='form-control' placeholder='Title' ref={input => { title = input }} />
            <textarea className='form-control' placeholder='Description' ref={textarea => { description = textarea }}
              style={{ marginTop: 15 }} />
            <input className='form-control' placeholder='Tags' style={{ marginTop: 15 }}
              ref={input => { tagsArray = input }} />
            <div className='row' >
              <div className='col-sm-10 poster-avatar hide' >
                <img id='poster' className='user-avatar_img' src='' />
              </div>
              <input id='upload-poster' type='file' className='btn btn-default col-sm-10 col-sm-offset-1 hide'
                onChange={(e) => {
                  e.preventDefault()
                  let preview = document.querySelector('#poster')
                  let file = document.querySelector('input[type=file]#upload-poster').files[0]
                  let reader = new FileReader()
                  reader.onloadend = () => {
                    preview.src = reader.result
                  }
                  if (file) {
                    var formData = new FormData()
                    formData.append('photo', file)
                    poster = { data: formData, type: file.name.split('.').pop() }
                    document.querySelector('.poster-avatar').classList.remove('hide')
                    reader.readAsDataURL(file)
                  }
                }} />
              <button className='btn btn-default col-sm-10 col-sm-offset-1'
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('upload-poster').click()
                }}
                style={{ marginTop: 15 }} >Upload Poster
              </button>
            </div>
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
