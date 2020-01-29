localStorage.users = []
localStorage.posts = []
localStorage.comments = []
localStorage.index = null
localStorage.editable = false

const route = async (name = 'users') => {
  const title = document.querySelector(`.box-title`)
  const detail = document.querySelector(`#data-detail`)
  const data = await getData(name)
  localStorage.page = name
  switch (name) {
    case 'users':
      title.innerHTML = 'Users'
      detail.innerHTML = ''
      listUsers(data)
      break;

    case 'posts':
      title.innerHTML = 'Posts'
      detail.innerHTML = ''
      listPost(data)
      break;

    case 'comments':
      title.innerHTML = 'Comments'
      detail.innerHTML = ''
      listComment(data)
      break;

    default:
      break;
  }
}

const getData = async (name) => {
  const page = localStorage.page ? localStorage.page : null
  if (page == name && localStorage[name]) {
    return JSON.parse(localStorage[name])
  } else {
    console.log('get from api..')
    const res = await fetch(`https://jsonplaceholder.typicode.com/${name}`)
    const json = await res.json()
    localStorage[name] = JSON.stringify(json)
    return json
  }
}

route()