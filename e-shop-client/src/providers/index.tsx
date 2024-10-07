'use client'

import { ReactNode } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { SessionProvider } from 'next-auth/react'

interface Props {
  children: ReactNode
}

export const Providers = ({ children }: Props) => {
  return (
    <AntdRegistry>
      <SessionProvider>{children}</SessionProvider>
    </AntdRegistry>
  )
}
