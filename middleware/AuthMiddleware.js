export default defineNuxtRouteMiddleware((to, from) => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))

  
    if (!token && !user && !['/login', '/register'].includes(to.path)) {
      return navigateTo('/login');
    }
  
    if (token && user && ['/login', '/register'].includes(to.path)) {
      return navigateTo('/');
    }
  
  })