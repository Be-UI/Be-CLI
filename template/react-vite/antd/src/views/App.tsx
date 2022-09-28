import { Suspense } from 'react'
import { Spin } from 'antd'
import { getHomeData } from '../api/api-home'
import { HelloWord } from '../components/HelloWord'
import '../assets/style/app.scss'
import RoutesList from '../router/router'

// test env
console.log('当前环境：', import.meta.env.VITE_PROJECT_ENV)
// test request
getHomeData({ appKey: 'appKey' })

function App() {
  return (
      <div id="app_index">
        <HelloWord msg="Be-CLI" />
          <Suspense fallback={<Spin/>}>
              {RoutesList()}
          </Suspense>
      </div>
  )
}

export default App
