import { LoginFieldType, RegistrationFieldType } from '@/interfaces'
import { api } from './clientApi'

const login = async (data: LoginFieldType) => {
  const res = await api.post('/api/auth/login', data)
  return res
}

const registration = async (data: RegistrationFieldType) => {
  const res = await api.post('/api/auth/registration', data)
  return res
}

export const authApi = {
  login,
  registration,
}
