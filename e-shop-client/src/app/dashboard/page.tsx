import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import classnames from 'classnames/bind'
import { Tabs } from '@/components'
import styles from './style.module.scss'

const cx = classnames.bind(styles)

const CN = 'dashboard-page'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  console.log('session', session)
  return (
    <div className={cx(CN)}>
      <Tabs />
    </div>
  )
}
