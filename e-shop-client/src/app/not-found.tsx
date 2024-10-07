import Link from 'next/link'
import classnames from 'classnames/bind'
import styles from './not-found.module.scss'

const cx = classnames.bind(styles)

const CN = 'not-found-page'
const CN_CONTENT = `${CN}-content`
const CN_HEADING = `${CN_CONTENT}-heading`
const CN_SUB_HEADING = `${CN_CONTENT}-sub-heading`

export default function NotFound() {
  return (
    <div className={cx(CN)}>
      <div className={cx(CN_CONTENT)}>
        <h1 className={cx(CN_HEADING)}>Not found – 404!</h1>
        <div className={cx(CN_SUB_HEADING)}>
          <Link href="/">Go back to Home</Link>
        </div>
      </div>
    </div>
  )
}
