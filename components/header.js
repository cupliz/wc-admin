const headerTemplate = `
<header class="main-header">
<a class="logo">
  <span class="logo-mini">
    <b>A</b>
    LT
  </span>
  <span class="logo-lg">
    <b>Company</b>
    Name
  </span>
</a>

<nav class="navbar navbar-static-top"></nav>
</header>
`
class HeaderComponent extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = headerTemplate
  }
}
customElements.define('admin-header', HeaderComponent)