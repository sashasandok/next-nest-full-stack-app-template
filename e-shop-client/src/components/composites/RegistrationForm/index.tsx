'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import { toast } from 'react-hot-toast'
import classnames from 'classnames/bind'
import { authApi } from '@/api'
import styles from './style.module.scss'

const cx = classnames.bind(styles)

const CN = 'registration-form'
const CN_HEADING = `${CN}-heading`

type FieldType = {
  name?: string
  email?: string
  password?: string
  confirm?: string
}

export const RegistrationForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setIsLoading(true)
    const res = await authApi.registration(values)

    if (res?.status === 201) {
      router.push('/auth/login')
      toast.success('Accaunt was created successfully')
    }
    setIsLoading(false)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={cx(CN)}>
      <h1 className={cx(CN_HEADING)}>Registration Form</h1>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="name"
          rules={[
            { required: true, message: 'Please input your name!' },
            { min: 4, message: 'Name should be at least 4 characters long!' },
          ]}
          validateFirst
        >
          <Input placeholder="Name" />
        </Form.Item>

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
          validateFirst
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            {
              min: 5,
              message: 'Password should be at least 5 characters long!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!'),
                )
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            create account
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
