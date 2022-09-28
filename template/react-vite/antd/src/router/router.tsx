import { lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Home from '../views/home'
const HelloWorld = lazy(() => import('../views/hello/index'))

export const routes = [
  {
    path: '/',
    index: true,
    element: <Navigate to= "/home"/>,
  },
  {
    path: 'home',
    index: true,
    element: <Home />,
    meta: {
      title: '首页',
    },
  },
  {
    path: 'hello',
    index: true,
    element: <HelloWorld />,
    meta: {
      title: 'Hello World',
    },
  },
  /* {
        path: '*',
        element: <Page404 />,
        meta: {
            title: '404',
            noLogin: true,
            hideMenu: true
        }
    }, */
]

const Routes = () => (
  useRoutes(routes)
)
export default Routes
