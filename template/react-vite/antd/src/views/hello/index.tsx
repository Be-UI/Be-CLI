import { Button } from 'antd'

import { useNavigate } from 'react-router-dom'
// 引入相关的hooks
import { useDispatch, useSelector } from 'react-redux'
// 引入对应的方法
import type { CounterState } from '../../store/features/counterSlice'
import { increment } from '../../store/features/counterSlice'
export default function HelloWorld() {
  const navigate = useNavigate()
  const routerSwitch = (path: string) => {
    navigate(path)
  }

  const { value } = useSelector((store: { counter: unknown }) => store.counter) as CounterState
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(increment())
  }
  return (
        <div className="card">
            <Button size="large" onClick={handleClick} style={{ marginRight: '20px' }}>
                count is { value } form redux
            </Button>
            <Button size="large" type="primary" onClick={() => routerSwitch('/home')}>
                click to home page
            </Button>
        </div>
  )
}
