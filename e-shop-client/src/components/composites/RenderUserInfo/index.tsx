'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-hot-toast'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { Button } from 'antd'

const cx = classnames.bind(styles)

const CN = 'render-user-info'

export const RenderUserInfo: React.FC = () => {
  const [userName, setUserName] = useState<string | undefined>('')

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('accessToken')

      if (token) {
        const decoded: { username: string } = jwtDecode(token as string)
        setUserName(decoded.username)
      }
    }
  }, [userName])

  const onUserLogout = () => {
    if (typeof window !== 'undefined') {
      toast.success('You was successfully logged out')
      window.localStorage.removeItem('accessToken')
      setUserName('')
    }
  }

  return (
    <div className={cx(CN)}>
      {userName ? <h1>Hello, {userName}</h1> : <h1>Welcome guest</h1>}
      {userName ? (
        <Button onClick={onUserLogout}>logout</Button>
      ) : (
        <Button onClick={() => router.push('/auth/login')}>go to login</Button>
      )}
    </div>
  )
}
