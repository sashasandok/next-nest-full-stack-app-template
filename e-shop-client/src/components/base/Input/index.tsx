import React, { FC } from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

const cx = classnames.bind(styles)

const CN = 'input'
const CN_ERROR = `${CN}-error-message`

interface InputProps {
  type?: string
  placeholder?: string
  error?: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onInput: any
}

export const Input: FC<InputProps> = ({
  type = 'text',
  placeholder,
  onInput,
  error,
  name,
}) => {
  const inputClass = cx(CN, {
    [CN_ERROR]: error,
  })

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className={inputClass}
        name={name}
        onInput={onInput}
      />
      {error && <div className={cx(CN_ERROR)}>{error}</div>}
    </div>
  )
}
