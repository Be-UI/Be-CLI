// ../packages/runtime/index.ts
import * as process from 'process'
import { log } from '../utils/index.js'
const runtime = () => {
  log('info', `test running....${process.env.RUNTIME_ENV}`)
}
export {
  runtime,
}
