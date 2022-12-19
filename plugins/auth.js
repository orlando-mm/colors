// eslint-disable-next-line require-await
export default async ({ app, $auth }) => {
  $auth.onRedirect((to) => {
    return app.localePath(to);
  });
};
