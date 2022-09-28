import '../assets/style/hello-word.scss'
import PropTypes from 'prop-types'
interface IProps {
  msg: string
}
export const HelloWord = function (props: IProps) {
  return (
        <div>
            <div className="title">
                <img src="/src/assets/images/logo.png"/>
                <h1>
                    {props.msg}
                </h1>
            </div>
            <p className="description">
                A cli for quickly generating project templates, supporting vite, vue3, react, element-plus, ant design,
                windicss, unocss
            </p>
            <div className="logo">
                <a href="https://vuejs.org/" target="_blank" rel="noreferrer">
                    <img src="/src/assets/svg/react.svg" alt="react" />
                </a>
                <a href="https://vitejs.dev/" target="_blank" rel="noreferrer">
                    <img src="/src/assets/images/vite.png" className="vite-logo" alt="vite" />
                </a>
                <a href="https://www.antdv.com/components/overview" target="_blank" rel="noreferrer">
                    <img src="/src/assets/svg/antd.svg" alt="antd" />
                </a>
                <a href="https://github.com/Be-UI/Be-CLI" target="_blank" rel="noreferrer">
                    <img src="/src/assets/images/logo.png" alt="be-cli" />
                </a>
            </div>
        </div>

  )
}

HelloWord.propTypes = {
  msg: PropTypes.string,
}
HelloWord.defaultProps = {
  msg: '',
}
