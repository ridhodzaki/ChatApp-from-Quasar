const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('pages/user/DashboardPage.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: 'auth', name: 'authPage', component: () => import('pages/guest/AuthPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
