const postData = { id: '', userId: '', title: '', body: '', }

const listPost = (list) => {
  const element = document.querySelector('#data-list')
  element.innerHTML = ''
  list.map((r, i) => {
    const tr = document.createElement('tr')
    tr.innerHTML = `<td>${r.id}</td><td>${r.title}</td>`
    tr.className = "clickable"
    tr.onclick = () => {
      localStorage.editable = JSON.stringify(false)
      localStorage.index = JSON.stringify(i)
      showPost(list, i)
    }
    element.appendChild(tr)
  })
  document.querySelector(`#edit-data`).onclick = () => {
    localStorage.editable = !JSON.parse(localStorage.editable)
    showPost(list, JSON.parse(localStorage.index))
  }
  document.querySelector(`#add-data`).onclick = () => {
    localStorage.editable = true
    localStorage.index = null
    showPost(list, null)
  }
}

const showPost = (list, i) => {
  const editable = JSON.parse(localStorage.editable)
  const detail = i !== null ? JSON.parse(JSON.stringify(list[i])) : postData
  document.querySelector('#data-detail').innerHTML = `
    <form method="POST" class="text-left pl-4" id="form-update" >
      <div class="row">
        <p class="col-4">ID:</p>
        <div class="col-8">
          ${editable ? `<input class="form-control" name="id" type="text" value="${detail.id}" readonly />` : `<span>${detail.id}</span>`}
        </div>
        <p class="col-4">User ID:</p>
        <div class="col-8">
          ${editable ? `<input class="form-control" name="userId" type="number" value="${detail.userId}" />` : `<span>${detail.userId}</span>`}
        </div>
        <p class="col-4">Title:</p>
        <div class="col-12">
          ${editable ? `<input class="form-control" name="title" type="text" value="${detail.title}" />` : `<span>${detail.title}</span>`}
        </div>
        <p class="col-4">Body:</p>
        <div class="col-12">
          ${editable ? `<input class="form-control" name="body" type="text" value="${detail.body}" />` : `<span>${detail.body}</span>`}
        </div>

        <div class="col-12"> <br /> <button type="submit" class="btn btn-success text-white" ${editable ? `` : `hidden`}> Save </a> </div>
      </div>
    </form>
    `
  document.querySelector('#form-update').onsubmit = (e) => { savePost(e) }
}


const savePost = (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  const list = JSON.parse(localStorage.data)
  let index = JSON.parse(localStorage.index)
  let detail = {}
  formData.forEach((value, key) => {
    detail[key] = value
  })
  if (index >= 0 && index != null) {
    list[index] = detail
  } else {
    index = list.length
    detail.id = parseInt(list[index - 1].id) + 1
    list.push(detail)
  }

  localStorage.data = JSON.stringify(list)
  listPost(list)

  localStorage.editable = false
  localStorage.index = index
  showPost(list, index)
}
