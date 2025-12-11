export type User = {
  id: number
  email: string
  username: string
}

export type RegisterData = {
  email: string
  username: string
  password: string
  password_confirmation: string
}

export type LoginData = {
  email: string
  password: string
}
