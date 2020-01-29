const commentData = { id: "", postId: "", name: "", email: "", body: "" }

const listComment = (list) => {
  const element = document.querySelector('#data-list')
  element.innerHTML = ''
  list.map((l, i) => {
    const tr = document.createElement('tr')
    tr.innerHTML = `<td>${l.id}</td><td>${l.email}</td>`
    tr.className = "clickable"
    tr.onclick = () => {
      localStorage.editable = JSON.stringify(false)
      localStorage.index = JSON.stringify(i)
      showComment(list, i)
    }
    element.appendChild(tr)
  })
  document.querySelector(`#edit-data`).onclick = () => {
    localStorage.editable = !JSON.parse(localStorage.editable)
    showComment(list, JSON.parse(localStorage.index))
  }
  document.querySelector(`#add-data`).onclick = () => {
    localStorage.editable = true
    localStorage.index = null
    showComment(list, null)
  }
}

const showComment = (list, i) => {
  const editable = JSON.parse(localStorage.editable)
  const detail = i !== null ? JSON.parse(JSON.stringify(list[i])) : commentData
  document.querySelector('#data-detail').innerHTML = `
      <form method="POST" class="text-left pl-4" id="form-update" >
        <div class="row">
          <p class="col-4">ID:</p>
          <div class="col-8">
            ${editable ? `<input class="form-control" name="id" type="text" value="${detail.id}" readonly />` : `<span>${detail.id}</span>`}
          </div>
          <p class="col-4">Post ID:</p>
          <div class="col-8">
            ${editable ? `<input class="form-control" name="postId" type="number" value="${detail.postId}" />` : `<span>${detail.postId}</span>`}
          </div>
          <p class="col-4">Email:</p>
          <div class="col-8">
            ${editable ? `<input class="form-control" name="email" type="text" value="${detail.email}" />` : `<span>${detail.email}</span>`}
          </div>
          <p class="col-4">Title:</p>
          <div class="col-12">
            ${editable ? `<input class="form-control" name="name" type="text" value="${detail.name}" />` : `<span>${detail.name}</span>`}
          </div>
          <p class="col-4">Body:</p>
          <div class="col-12">
            ${editable ? `<input class="form-control" name="body" type="text" value="${detail.body}" />` : `<span>${detail.body}</span>`}
          </div>
          
          <div class="col-12"> <br /> <button type="submit" class="btn btn-success text-white" ${editable ? `` : `hidden`}> Save </a> </div>
        </div>
      </form>
      `
  document.querySelector('#form-update').onsubmit = (e) => { saveComment(e) }
}

const saveComment = (e) => {
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
  listComment(list)

  localStorage.editable = false
  localStorage.index = index
  showComment(list, index)
}