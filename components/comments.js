const tmpComments = `
<div class="col-md-10">
<section class="content">
<div class="row">
  <div class="col-md-6">
    <div class="box box-solid">
      <div class="box-header">
        <i class="fa fa-text-width"></i>
        <h3 class="box-title">Comments</h3>
        <div class="box-tools pull-right">
          <a class="btn btn-primary text-white" id="add-comment">Add</a>
        </div>
      </div>
      <div class="box-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody id="list-comment">
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
        <h3 class="box-title">Comment Detail</h3>
        <div class="box-tools pull-right">
          <a class="btn btn-primary text-white" id="edit-comment"> Edit </a>
        </div>
      </div>
      <div class="box-body" id="detail-comment">
      </div>
    </div>
  </div>
</div>
</section>
</div>
`
class CommentComponent extends HTMLElement {
  constructor() {
    super()
    this.setAttribute('hidden', '')
    this.innerHTML = tmpComments
    this.list = []
    this.detail = { "id": "", "postId": "", "name": "", "email": "", "body": "" }
    this.editable = true
    document.querySelector('#add-comment').onclick = () => { this.add() }
    document.querySelector('#edit-comment').onclick = () => { this.edit() }
  }
  async getData() {
    const res = await fetch('/assets/comments.json')
    const json = await res.json()
    this.list = json
    this.render(this.list)
  }
  render(json) {
    const element = document.querySelector('#list-comment')
    element.innerHTML = ''
    json.map((l, i) => {
      const tr = document.createElement('tr')
      tr.innerHTML = `<td>${l.id}</td><td>${l.email}</td>`
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
    document.querySelector('#detail-comment').innerHTML = `
    <form method="POST" class="text-left pl-4" id="form-user" >
      <div class="row">
        <p class="col-4">ID:</p>
        <div class="col-8">
          ${this.editable ? `<input class="form-control" name="id" type="text" value="${detail.id}" readonly />` : `<span>${detail.id}</span>`}
        </div>
        <p class="col-4">Post ID:</p>
        <div class="col-8">
          ${this.editable ? `<input class="form-control" name="postId" type="number" value="${detail.postId}" />` : `<span>${detail.postId}</span>`}
        </div>
        <p class="col-4">Email:</p>
        <div class="col-8">
          ${this.editable ? `<input class="form-control" name="email" type="text" value="${detail.email}" />` : `<span>${detail.email}</span>`}
        </div>
        <p class="col-4">Title:</p>
        <div class="col-12">
          ${this.editable ? `<input class="form-control" name="name" type="text" value="${detail.name}" />` : `<span>${detail.name}</span>`}
        </div>
        <p class="col-4">Body:</p>
        <div class="col-12">
          ${this.editable ? `<input class="form-control" name="body" type="text" value="${detail.body}" />` : `<span>${detail.body}</span>`}
        </div>
        
        <div class="col-12"> <br /> <button type="submit" class="btn btn-success text-white" ${this.editable ? `` : `hidden`}> Save </a> </div>
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
customElements.define('page-comments', CommentComponent)