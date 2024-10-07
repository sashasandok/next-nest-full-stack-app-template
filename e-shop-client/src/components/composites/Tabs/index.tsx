'use client'

import React from 'react'
import { Tabs as AntdTabs } from 'antd'
import { useMediaQuery } from 'react-responsive'
import { UsersTable } from '../UsersTable'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

const cx = classnames.bind(styles)

const CN = 'tabs'

export const Tabs: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

  const items = [
    { id: 'Users', label: 'Users', content: <UsersTable /> },
    {
      id: 'Products',
      label: 'UseProductsrs',
      content: <div>Products content !!!</div>,
    },
  ]

  return (
    <div className={cx(CN)}>
      <AntdTabs
        tabPosition={isMobile ? 'top' : 'left'}
        items={items.map((item) => {
          return {
            label: item?.label,
            key: item?.id,
            children: item?.content,
          }
        })}
      />
    </div>
  )
}
