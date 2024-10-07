import classnames from 'classnames/bind'
import { LoginForm } from '@/components'
import styles from './style.module.scss'

const cx = classnames.bind(styles)

const CN = 'login-page'

export default function Login() {
  return (
    <div className={cx(CN)}>
      <LoginForm />
    </div>
  )
}
