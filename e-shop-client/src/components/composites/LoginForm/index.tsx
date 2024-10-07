'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import { toast } from 'react-hot-toast'
import classnames from 'classnames/bind'
import { signIn } from 'next-auth/react'
import styles from './style.module.scss'

const cx = classnames.bind(styles)

const CN = 'login-form'
const CN_HEADING = `${CN}-heading`

type FieldType = {
  email?: string
  password?: string
}

export const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setIsLoading(true)
    await signIn('credentials', { ...values, redirect: false }).then(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ({ ok, error }: any) => {
        if (ok) {
          toast.success('You successfully logged in!')
          router.push('/')
        } else {
          alert(JSON.stringify(error))
          toast.error(error?.message)
          console.log('Credentials do not match!', { type: 'error' })
        }
      },
    )
    setIsLoading(false)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={cx(CN)}>
      <h1 className={cx(CN_HEADING)}>Login Form</h1>
      <Form
        name="Login Form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: 5,
              message: 'Password should be at least 5 characters long!',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
