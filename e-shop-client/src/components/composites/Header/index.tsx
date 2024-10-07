'use client'

import classnames from 'classnames/bind'
import { signOut, useSession } from 'next-auth/react'
import styles from './style.module.scss'
import Link from 'next/link'

const cx = classnames.bind(styles)

const CN = 'header'
const CN_NAV = `${CN}-nav`
const CN_NAV_ITEM = `${CN_NAV}-item`
const CN_NAV_LINK = `${CN_NAV_ITEM}-link`

export const Header = () => {
  const { data: session } = useSession()
  return (
    <header className={cx(CN)}>
      <ul className={cx(CN_NAV)}>
        <li className={cx(CN_NAV_ITEM)}>
          <Link href="/" className={cx(CN_NAV_LINK)}>
            home
          </Link>
        </li>
        <li className={cx(CN_NAV_ITEM)}>
          <Link href="/dashboard" className={cx(CN_NAV_LINK)}>
            dashboard
          </Link>
        </li>
        <li className={cx(CN_NAV_ITEM)}>
          <Link href="/auth/login" className={cx(CN_NAV_LINK)}>
            login
          </Link>
        </li>
        <li className={cx(CN_NAV_ITEM)}>
          <Link href="/auth/registration" className={cx(CN_NAV_LINK)}>
            registration
          </Link>
        </li>
        <li className={cx(CN_NAV_ITEM)} onClick={() => signOut()}>
          <Link href="#" className={cx(CN_NAV_LINK)}>
            logout
          </Link>
        </li>
      </ul>
      {session?.user.name} | {session?.user.email}
    </header>
  )
}
