import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'
import GearStylesPage from './pages/GearStylesPage'
import LoginPage from './pages/LoginPage'
import OrdersPage from './pages/OrdersPage'
import ContactPage from './pages/ContactPage'
import GalleryItemPage from './pages/GalleryItemPage'

const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/about', component: AboutPage, name: 'About' },
  { path: '/gallery', component: GalleryPage, name: 'Gallery' },
  { path: '/gearstyles', component: GearStylesPage, name: 'GearStyles' },
  { path: '/login', component: LoginPage, name: 'Login' },
  { path: '/contact', component: ContactPage, name: 'Contact' },
  { path: '/orders', component: OrdersPage, name: 'Orders' },
  {
    path: '/gallery/item/:galleryitem_id',
    component: GalleryItemPage,
    name: 'GalleryItemView'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
