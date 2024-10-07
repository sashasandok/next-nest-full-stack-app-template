import React from 'react'
import { Space, Table } from 'antd'
import type { TableProps } from 'antd'

interface DataType {
  key: string
  name: string
  email: string
  role: string
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // render: (text) => <a>{text}</a>,
    responsive: ['xs', 'sm', 'md', 'lg'],
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    responsive: ['xs', 'sm', 'md', 'lg'],
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    responsive: ['xs', 'sm', 'md', 'lg'],
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
    responsive: ['xs', 'sm', 'md', 'lg'],
  },
]

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    email: 'sandok1988@ukr.net',
    role: 'admin',
  },
]

export const UsersTable: React.FC = () => (
  <Table<DataType>
    columns={columns}
    dataSource={data}
    pagination={{ pageSize: 2 }}
    scroll={{ x: 'max-content' }}
  />
)
