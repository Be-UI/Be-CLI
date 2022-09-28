import { Button } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count + 1)
  }
  const navigate = useNavigate()
  const routerSwitch = (path: string) => {
    navigate(path)
  }
  return (
        <div className="card">
            <Button size="large" onClick={handleClick}>
                count is { count }
            </Button>
            <Button size="large" type="primary" onClick={() => routerSwitch('/hello')}>
                click to hello page
            </Button>
        </div>
  )
}
