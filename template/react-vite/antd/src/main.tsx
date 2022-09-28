import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import App from './views/App'
import './assets/style/reset.scss'
import 'antd/dist/antd.css'
import store from './store'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(

    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>,
)
