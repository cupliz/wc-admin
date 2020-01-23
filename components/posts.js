const tmpPosts = `
<div class="row">
  <div class="col-md-6 px-4">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3" >
      <h1 class="h2">Posts</h1>
    </div>
    <div class="table-responsive">
      <table class="table table-hover table-sm">
        <thead>
          <tr> <th>User ID</th> <th>Name</th> </tr>
        </thead>
        <tbody id="post-list">
        </tbody>
      </table>
    </div>
  </div>
  <div class="col-md-6 px-4">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" >
      <h1 class="h2">Post Detail</h1>
    </div>
    <div class="text-left pl-4" id="post-detail">
    </div>
  </div>
</div>
`
class Posts extends HTMLElement {
  constructor() {
    super()
    this.setAttribute('hidden', '')
    this.innerHTML = tmpPosts
  }
  async getData() {
    const res = await fetch('/assets/posts.json')
    const data = await res.json()
    const list = document.getElementById('post-list')
    data.map(r => {
      const tr = document.createElement('tr')
      tr.innerHTML = `<td>${r.id}</td><td>${r.title}</td>`
      tr.onclick = () => { this.getDetail(r) }
      tr.className = "clickable"
      list.appendChild(tr)
    })
  }
  getDetail(data) {
    const detail = document.getElementById('post-detail')
    detail.innerHTML = `
    <div class="row"> <p class="col-4">ID:</p> ${data.id} </div>
    <div class="row"> <p class="col-4">User ID:</p> ${data.userId} </div>
    <div class="row"> <p class="col-4">Title:</p> <br /> <p class="col-12 mx-4">${data.title || ''}</p> </div>
    <div class="row"> <p class="col-4">Body:</p> <p class="col-12 mx-4">${data.body}</p> </div>
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
customElements.define('page-posts', Posts)