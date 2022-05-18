export default function ({ route, app, store }) {
  if (route.path === '/') {
    if (!store.$auth.$state.loggedIn) {
      return app.router.push({
        path: '/home'
      })
    }
    return app.router.push({
      path: '/admin'
    })
  }
}
