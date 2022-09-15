
import {useState} from 'react'
import reactLogo from './assets/react.svg'
import {runtimeBrowser} from '@template-play/entry'
import './App.css'
// @ts-ignore
import {ABTest} from '../../dist/web/esm/ab-test-sdk-web.esm'
function App() {
  const [count, setCount] = useState(0)
  const [isEntryVersion, setVersion] = useState(false)
  runtimeBrowser()
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 onClick={()=>setVersion((version)=> version = true)}>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
          {isEntryVersion ? <div>进入实验版本成功</div> : <></>}
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  )
}

export default App
