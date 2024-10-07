import classnames from 'classnames/bind'
import { RegistrationForm } from '@/components'
import styles from './style.module.scss'

const cx = classnames.bind(styles)

const CN = 'registration-page'

export default function Registration() {
  return (
    <div className={cx(CN)}>
      <RegistrationForm />
    </div>
  )
}
