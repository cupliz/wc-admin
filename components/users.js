const userData = {
  id: '',
  name: '',
  username: '',
  email: '',
  address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }
}

const listUsers = (list) => {
  const element = document.querySelector('#data-list')
  element.innerHTML = ''
  list.map((r, i) => {
    const tr = document.createElement('tr')
    tr.innerHTML = `<td>${r.id}</td><td>${r.name}</td>`
    tr.className = "clickable"
    tr.key = i
    tr.onclick = () => {
      localStorage.editable = JSON.stringify(false)
      localStorage.index = JSON.stringify(i)
      showUser(list, i)
    }
    element.appendChild(tr)
  })
  document.querySelector(`#edit-data`).onclick = () => {
    
    localStorage.editable = !JSON.parse(localStorage.editable)
    showUser(list, JSON.parse(localStorage.index))
  }
  document.querySelector(`#add-data`).onclick = () => {
    
    localStorage.editable = true
    localStorage.index = null
    showUser(list, null)
  }
}

const showUser = (list, i) => {
  const detail = i !== null ? JSON.parse(JSON.stringify(list[i])) : userData
  const editable = JSON.parse(localStorage.editable)
  document.querySelector('#data-detail').innerHTML = `
      <form class="text-left pl-4" id="form-update" >
        <div class="row">
          <p class="col-4">ID:</p>
          <div class="col-8">
            ${editable ? `<input class="form-control" name="id" type="text" value="${detail.id}" readonly />` : `<span>${detail.id}</span>`}
          </div>
          <p class="col-4">Name:</p>
          <div class="col-8">
            ${editable ? `<input class="form-control" name="name" type="text" value="${detail.name}" />` : `<span>${detail.name}</span>`}
          </div>
          <p class="col-4">Username:</p>
          <div class="col-8">
            ${editable ? `<input class="form-control" name="username" type="text" value="${detail.username}" />` : `<span>${detail.username}</span>`}
          </div>
          <p class="col-4">Email:</p>
          <div class="col-8">
            ${editable ? `<input class="form-control" name="email" type="text" value="${detail.email}" />` : `<span>${detail.email}</span>`}
          </div>
          <p class="col-4">Address</p>
        </div>
        <div class="row">
          <div class="col-1"></div>
          <div class="col-11">
            <div class="row">
              <div class="col-4">Street:</div>
              <div class="col-8">
                ${editable ? `<input class="form-control" name="address.street" type="text" value="${detail.address.street}" />` : `<span>${detail.address.street}</span>`}
              </div>
              <div class="col-4">Suite:</div>
              <div class="col-8">
                ${editable ? `<input class="form-control" name="address.suite" type="text" value="${detail.address.suite}" />` : `<span>${detail.address.suite}</span>`}
              </div>
              <div class="col-4">City:</div>
              <div class="col-8">
                ${editable ? `<input class="form-control" name="address.city" type="text" value="${detail.address.city}" />` : `<span>${detail.address.city}</span>`}
              </div>
              <div class="col-4">Zipcode:</div>
              <div class="col-8">
                ${editable ? `<input class="form-control" name="address.zipcode" type="text" value="${detail.address.zipcode}" />` : `<span>${detail.address.zipcode}</span>`}
              </div>
            </div>
            <div class="row">
              <div class="col-4">Geo:</div>
              ${editable ? `<div class="col-8">
                <input class="form-control" name="address.geo.lat" type="text" value="${detail.address.geo.lat}" placeholder="lat" />
                <input class="form-control" name="address.geo.lng" type="text" value="${detail.address.geo.lng}" placeholder="lng" />
              </div>`: `
              <span>
                ${detail.address.geo.lat} -
                ${detail.address.geo.lng}
              </span>`}
              <div class="col-12"> <br /> <button type="submit" class="btn btn-success text-white" ${editable ? `` : `hidden`}> Save </a> </div>
            </div>
          </div>
        </div>
      </form>
      `
  document.querySelector('#form-update').onsubmit = (e) => { saveUser(e) }
}

const saveUser = (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  const list = JSON.parse(localStorage.data)
  let index = JSON.parse(localStorage.index)
  let detail = {}
  formData.forEach((value, key) => {
    if (key.includes('address.')) {
      detail.address = {
        "street": e.target['address.street'].value,
        "suite": e.target['address.suite'].value,
        "city": e.target['address.city'].value,
        "zipcode": e.target['address.zipcode'].value,
        "geo": {
          "lat": e.target['address.geo.lat'].value,
          "lng": e.target['address.geo.lng'].value,
        }
      }
    } else {
      detail[key] = value
    }
  })
  if (index >= 0 && index != null) {
    list[index] = detail
  } else {
    index = list.length
    detail.id = parseInt(list[index - 1].id) + 1
    list.push(detail)
  }

  localStorage.data = JSON.stringify(list)
  listUsers(list)

  localStorage.editable = false
  localStorage.index = index
  showUser(list, index)
}