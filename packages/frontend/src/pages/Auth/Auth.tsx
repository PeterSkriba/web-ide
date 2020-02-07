import React, { useState, ChangeEvent } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { LOGIN } from 'apollo/mutations'

// https://www.prisma.io/docs/prisma-server/authentication-and-security-kke4/

import * as S from './styled'

type Props = {
  onLogin: () => void
}

type Form = {
  email: string
  password: string
}

const Auth = ({ onLogin }: Props) => {
  const [login] = useMutation(LOGIN)
  const [form, setForm] = useState<Form>({
    email: 'johndoe@gmail.com',
    password: 'johndoe'
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleLogin = (e) => {
    e.preventDefault()

    login({
      variables: {
        email: form.email,
        password: form.password
      }
    }).then(res => {
      const token = res.data.login.token

      if (token) {
        localStorage.setItem('editor_auth-token', token)
        onLogin()
      }
    }).catch(err => console.log(err))
  }

  return (
    <>
      <h1>Auth</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleInputChange}
        />
        <input type="submit" value="Login" />
      </form>
    </>
  )
}

export default Auth