import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { LOGIN } from 'apollo/mutations'

import { Input } from 'ui'

import * as S from './styled'

type FormData = {
  email: string
  password: string
}

const LoginForm = () => {
  const history = useHistory()

  const [login] = useMutation(LOGIN)

  const { register, handleSubmit, errors } = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    submitFocusError: true
  })

  const onSubmit = data => {
    // loading
    login({
      variables: {
        email: data.email,
        password: data.password
      }
    })
      .then(res => {
        const token = res.data.login.token

        if (token) {
          localStorage.setItem('editor_auth-token', token)
          history.push('/')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <S.Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Input
        register={register}
        errors={errors}
        type="email"
        name="email"
        title="Email"
        placeholder="Enter email"
        options={{
          required: true,
          minLength: 5,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        }}
      />

      <Input
        register={register}
        errors={errors}
        type="password"
        name="password"
        title="Password"
        placeholder="Enter password"
        options={{
          required: true,
          minLength: 5
        }}
      />

      <S.Submit type="submit">Submit</S.Submit>
    </S.Wrapper>
  )
}

export default LoginForm
