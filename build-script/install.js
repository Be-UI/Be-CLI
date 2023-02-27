import path from 'path'
import { spawn } from 'child_process'
import figlet from 'figlet'
import chalk from 'chalk'
export const r = (...args) => path.resolve('./')
export const run = async(command) => {
  return new Promise((resolve) => {
    const [cmd, ...args] = command.split(' ')
    const app = spawn(cmd, args, {
      cwd: r(),
      stdio: 'inherit',
      shell: true,
    })

    app.on('close', resolve) //
  })
}
export function ConsoleFigFont(str) {
  return new Promise((resolve, reject) => {
    figlet(str, (err, data) => {
      if (err) {
        console.warn('Something went wrong...')
        console.warn(err)
        reject(err)
      }
      console.warn(data)
      resolve('')
    })
  })
}

export const runTask = (displayName, command) => {
  const fn = async() => {
    await ConsoleFigFont(displayName)
    console.log(chalk.blueBright.bold(`\n ${displayName}\n`))
    await run(command)
  }
  fn.displayName = displayName
  return fn
}
runTask('init Be CLI', 'pnpm install').call()
