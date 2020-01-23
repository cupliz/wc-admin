const tmpComments = `
<div class="row">
  <div class="col-md-6 px-4">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3" >
      <h1 class="h2">Comments</h1>
    </div>
    <div class="table-responsive">
      <table class="table table-hover table-sm">
        <thead>
          <tr> <th>User ID</th> <th>Name</th> </tr>
        </thead>
        <tbody id="comment-list">
        </tbody>
      </table>
    </div>
  </div>
  <div class="col-md-6 px-4">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" >
      <h1 class="h2">Comment Detail</h1>
    </div>
    <div class="text-left pl-4" id="comment-detail">
    </div>
  </div>
</div>
`
class Comments extends HTMLElement {
  constructor() {
    super()
    this.setAttribute('hidden', '')
    this.innerHTML = tmpComments
  }
  async getData() {
    const res = await fetch('/assets/comments.json')
    const comments = await res.json()
    const list = document.getElementById('comment-list')
    comments.map(r => {
      const tr = document.createElement('tr')
      tr.innerHTML = `<td>${r.id}</td><td>${r.name}</td>`
      tr.onclick = () => { this.getDetail(r) }
      tr.className = "clickable"
      list.appendChild(tr)
    })
  }
  getDetail(comment) {
    const detail = document.getElementById('comment-detail')
    detail.innerHTML = `
    <div class="row"> <p class="col-4">ID:</p> ${ comment.id || '' } </div>
    <div class="row"> <p class="col-4">PostId:</p> ${ comment.postId || '' } </div>
    <div class="row"> <p class="col-4">Email:</p> ${ comment.email || '' } </div>
    <div class="row"> <p class="col-4">Title:</p> <br /> <p class="col-12 mx-4">${ comment.name || '' }</p> </div>
    <div class="row"> <p class="col-4">Body:</p> <p class="col-12 mx-4">${comment.body}</p> </div>
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
customElements.define('page-comments', Comments)