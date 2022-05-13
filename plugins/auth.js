export default async ({ app, $auth }) => {
  console.log('auth en el plugin')
  await console.log($auth)
  $auth.onRedirect((to) => {
    return app.localePath(to)
  })
}
