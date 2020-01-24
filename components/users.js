const tmpUsers = `
<div class="col-md-10">
<section class="content">
<div class="row">
  <div class="col-md-6">
    <div class="box box-solid">
      <div class="box-header">
        <i class="fa fa-text-width"></i>
        <h3 class="box-title">Users</h3>
        <div class="box-tools pull-right">
          <a class="btn btn-primary text-white" id="add-user">Add</a>
        </div>
      </div>
      <div class="box-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody id="user-list">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="box box-solid">
      <div class="box-header with-border">
        <i class="fa fa-text-width"></i>
        <h3 class="box-title">User Detail</h3>
        <div class="box-tools pull-right">
          <a class="btn btn-primary text-white" id="edit-user"> Edit </a>
        </div>
      </div>
      <div class="box-body" id="user-detail">
      </div>
    </div>
  </div>
</div>
</section>
</div>
`
class UsersComponent extends HTMLElement {
  constructor() {
    super()
    this.setAttribute('hidden', '')
    this.innerHTML = tmpUsers
    this.list = []
    this.detail = {
      id: '',
      name: '',
      username: '',
      email: '',
      address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }
    }
    this.editable = true
    document.querySelector('#add-user').onclick = () => { this.add() }
    document.querySelector('#edit-user').onclick = () => { this.edit() }
  }
  async getData() {
    const res = await fetch('/assets/users.json')
    const json = await res.json()
    this.list = json
    this.render(this.list)
  }
  render(json) {
    const element = document.querySelector('#user-list')
    element.innerHTML = ''
    json.map((r, i) => {
      const tr = document.createElement('tr')
      tr.innerHTML = `<td>${r.id}</td><td>${r.name}</td>`
      tr.className = "clickable"
      tr.onclick = () => {
        this.index = i
        this.editable = false
        this.show(this.index)
      }
      element.appendChild(tr)
    })
  }
  edit() {
    // console.log('edit', this.index)
    this.editable = !this.editable
    if (this.index >= 0 && this.index != null) {
      this.show(this.index)
    } else {
      this.show(null)
    }
  }
  save(e) {
    const formData = new FormData(e.target)
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
    e.preventDefault()
    if (this.index >= 0 && this.index != null) {
      console.log('update')
      this.list[this.index] = detail
    } else {
      console.log('insert')
      this.index = this.list.length
      detail.id = this.list[this.index - 1].id + 1
      this.list.push(detail)
      this.edit()
    }
    this.render(this.list)
  }
  add() {
    // console.log('add')
    this.editable = true
    this.index = null
    this.show(this.index)
  }
  show(i) {
    // console.log('show')
    const detail = i !== null ? JSON.parse(JSON.stringify(this.list[i])) : this.detail
    document.querySelector('#user-detail').innerHTML = `
    <form class="text-left pl-4" id="form-user" >
      <div class="row">
        <p class="col-4">ID:</p>
        <div class="col-8">
          ${this.editable ? `<input class="form-control" name="id" type="text" value="${detail.id}" readonly />` : `<span>${detail.id}</span>`}
        </div>
        <p class="col-4">Name:</p>
        <div class="col-8">
          ${this.editable ? `<input class="form-control" name="name" type="text" value="${detail.name}" />` : `<span>${detail.name}</span>`}
        </div>
        <p class="col-4">Username:</p>
        <div class="col-8">
          ${this.editable ? `<input class="form-control" name="username" type="text" value="${detail.username}" />` : `<span>${detail.username}</span>`}
        </div>
        <p class="col-4">Email:</p>
        <div class="col-8">
          ${this.editable ? `<input class="form-control" name="email" type="text" value="${detail.email}" />` : `<span>${detail.email}</span>`}
        </div>
        <p class="col-4">Address</p>
      </div>
      <div class="row">
        <div class="col-1"></div>
        <div class="col-11">
          <div class="row">
            <div class="col-4">Street:</div>
            <div class="col-8">
              ${this.editable ? `<input class="form-control" name="address.street" type="text" value="${detail.address.street}" />` : `<span>${detail.address.street}</span>`}
            </div>
            <div class="col-4">Suite:</div>
            <div class="col-8">
              ${this.editable ? `<input class="form-control" name="address.suite" type="text" value="${detail.address.suite}" />` : `<span>${detail.address.suite}</span>`}
            </div>
            <div class="col-4">City:</div>
            <div class="col-8">
              ${this.editable ? `<input class="form-control" name="address.city" type="text" value="${detail.address.city}" />` : `<span>${detail.address.city}</span>`}
            </div>
            <div class="col-4">Zipcode:</div>
            <div class="col-8">
              ${this.editable ? `<input class="form-control" name="address.zipcode" type="text" value="${detail.address.zipcode}" />` : `<span>${detail.address.zipcode}</span>`}
            </div>
          </div>
          <div class="row">
            <div class="col-4">Geo:</div>
            ${this.editable ? `<div class="col-8">
              <input class="form-control" name="address.geo.lat" type="text" value="${detail.address.geo.lat}" placeholder="lat" />
              <input class="form-control" name="address.geo.lng" type="text" value="${detail.address.geo.lng}" placeholder="lng" />
            </div>`: `
            <span>
              ${detail.address.geo.lat} -
              ${detail.address.geo.lng}
            </span>`}
            <div class="col-12"> <br /> <button type="submit" class="btn btn-success text-white" ${this.editable ? `` : `hidden`}> Save </a> </div>
          </div>
        </div>
      </div>
    </form>
    `
    document.querySelector('#form-user').onsubmit = (e) => { this.save(e) }
  }
  static get observedAttributes() {
    return ['hidden']
  }
  attributeChangedCallback(name, oldValue, newValue) {
    const isHidden = this.hasAttribute(name)
    if (!isHidden) {
      this.getData()
    }
  }
}
customElements.define('page-users', UsersComponent)