import React from 'react'
import PropTypes from 'prop-types'

let AddNews = ({ add, idUser, userName, userAvatar, loadNews, getNews }) => {
  let title, description, tagsArray, poster
  return (
    <div className='row' style={{ marginTop: 15 }} >
      <div className='col-sm-12' >
        <form className='row' onSubmit={(e) => {
          e.preventDefault()
            let value = {
              input: !title.value.trim(),
              description: !description.value.trim(),
              tags: !tagsArray.value.trim()
            }
            let queryInput = {
              input: document.querySelector('.inputTitle'),
              description: document.querySelector('.inputDescription'),
              tags: document.querySelector('.inputTags')
            }
            for (let item in queryInput) {
              queryInput[item].classList.remove('error-input')
            }
            if (value.input || value.description || value.tags) {
              for (let item in queryInput) {
                value[item] ? queryInput[item].classList.add('error-input') : false
              }
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
          let preview = document.querySelector('#poster')
          preview.src = ''
          document.querySelector('.poster-avatar').classList.add('hide')
          add({ title: title.value,
            description: description.value,
            tags: tags,
            user: idUser,
            userAvatar: userAvatar },
            idUser, poster)
          title.value = ''
          description.value = ''
          tagsArray.value = ''
          poster = ''
          getNews(idUser)
        }} >
          <div className='col-sm-12' >
            <input className='inputTitle form-control' placeholder='Title*' ref={input => { title = input }} />
            <textarea className='form-control inputDescription' placeholder='Description*'
              ref={textarea => { description = textarea }}
              style={{ marginTop: 15 }} />
            <input className='form-control inputTags' placeholder='Tags*' style={{ marginTop: 15 }}
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
              <button className='btn btn-default col-sm-10 col-sm-offset-1 col-xs-6 col-xs-offset-3'
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('upload-poster').click()
                }}
                style={{ marginTop: 15 }} >Upload Poster
              </button>
            </div>
          </div>
          <button className='btn btn-default col-sm-10 col-sm-offset-1 col-xs-6 col-xs-offset-3'
            style={{ marginTop: 10 }} >
            {(loadNews ? <div className='loader' /> : 'Add')}
          </button>
        </form>
      </div>
    </div>
  )
}

AddNews.propTypes = {
  add: PropTypes.func.isRequired,
  getNews: PropTypes.func.isRequired,
  idUser: PropTypes.string,
  userName: PropTypes.string,
  userAvatar: PropTypes.string,
  loadNews: PropTypes.bool
}

export default AddNews
