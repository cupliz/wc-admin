const route = (name = 'users') => {
  const pages = ['users', 'posts', 'comments']
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const element = document.querySelector(`page-${page}`)
    if (name == page) {
      element.removeAttribute('hidden')
    } else {
      if (!element.hasAttribute('hidden')) {
        element.setAttribute('hidden', '')
      }
    }
  }
}
route()