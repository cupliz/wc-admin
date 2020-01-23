const tmpUsers = `
<div class="row">
  <div class="col-md-6 px-4">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3" >
      <h1 class="h2">Users</h1>
    </div>
    <div class="table-responsive">
      <table class="table table-hover table-sm">
        <thead>
          <tr> <th>User ID</th> <th>Name</th> </tr>
        </thead>
        <tbody id="user-list">
        </tbody>
      </table>
    </div>
  </div>
  <div class="col-md-6 px-4">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" >
      <h1 class="h2">User Detail</h1>
    </div>
    <div class="text-left pl-4" id="user-detail">
    </div>
  </div>
</div>
`
class Users extends HTMLElement {
  constructor() {
    super()
    this.setAttribute('hidden', '')
    this.innerHTML = tmpUsers
  }
  async getData() {
    const res = await fetch('/assets/users.json')
    const users = await res.json()
    const list = document.getElementById('user-list')
    users.map(r => {
      const tr = document.createElement('tr')
      tr.innerHTML = `<td>${r.id}</td><td>${r.name}</td>`
      tr.onclick = () => { this.getDetail(r) }
      tr.className = "clickable"
      list.appendChild(tr)
    })
  }
  getDetail(user) {
    const detail = document.getElementById('user-detail')
    detail.innerHTML = `
    <div class="row"> <p class="col-4">ID:</p> ${user.id} </div>
    <div class="row"> <p class="col-4">Name:</p> ${ user.name} </div>
    <div class="row"> <p class="col-4">Username:</p> ${ user.username} </div>
    <div class="row"> <p class="col-4">Email:</p> ${ user.email} </div>
    <div class="row"> <p class="col-4">Address</p> </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-11">
        <div class="row"> <div class="col-4">Street:</div> ${ user.address.street} </div>
        <div class="row"> <div class="col-4">Suite:</div> ${ user.address.suite} </div>
        <div class="row"> <div class="col-4">City:</div> ${ user.address.city} </div>
        <div class="row"> <div class="col-4">Zipcode:</div> ${ user.address.zipcode} </div>
        <div class="row"> <div class="col-4">Geo:</div> ${ user.address.geo.lat}} - ${user.address.geo.lng}
        </div>
      </div>
    </div>
    `
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
customElements.define('page-users', Users)