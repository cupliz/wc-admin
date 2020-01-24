const route = (name = 'users', el) => {
  const pages = ['users', 'posts', 'comments']
  for (const page of pages) {
    const elPage = document.querySelector(`page-${page}`)
    if (elPage) {
      if (name == page) {
        elPage.removeAttribute('hidden')
        // if (el) el.parentElement.className += 'active'
      } else {
        if (!elPage.hasAttribute('hidden')) {
          elPage.setAttribute('hidden', '')
          // if (el) el.parentElement.classList.remove("active")
        }
      }
    }
  }
}
route()