export default ({ app }) => {
  app.router.afterEach((to) => {
    if (typeof window !== 'undefined' && window.goatcounter) {
      window.goatcounter.count({
        path: to.fullPath
      })
    }
  })
}
