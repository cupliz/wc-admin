localStorage.index = null
localStorage.editable = false
const route = async (name = 'users', el) => {
  // const pages = ['users', 'posts', 'comments']
  const title = document.querySelector(`.box-title`)
  const detail = document.querySelector(`#data-detail`)
  const data = await getData(name)
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
  const res = await fetch(`https://jsonplaceholder.typicode.com/${name}`)
  const json = await res.json()
  localStorage.data = JSON.stringify(json)
  return json
}

route()