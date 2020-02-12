import React from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { REGISTER } from 'apollo/mutations'
import { EXIST_USER } from 'apollo/queries'

import { Input } from 'ui'

import * as S from './styled'

type FormData = {
  email: string
  password: string
  confirm_password: string
  first_name: string
  last_name: string
  username: string
}

const RegisterForm = () => {
  const history = useHistory()

  const [reg] = useMutation(REGISTER)

  const [existUser, { data: emailExists }] = useLazyQuery(EXIST_USER)

  const fetch = (email: string): boolean => {
    existUser({ variables: { email: email } })
    return !emailExists?.existUser
  }

  const { register, handleSubmit, errors, watch } = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    submitFocusError: true
  })

  const onSubmit = data => {
    // ? try async email
    reg({
      variables: {
        data: {
          email: data.email,
          password: data.password,
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username
        }
      }
    })
      .then(res => {
        const token = res.data.register.token

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
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          validate: {
            exist: value => fetch(value) || 'This email already exists.'
          }
        }}
      />

      <Input
        register={register}
        errors={errors}
        type="text"
        name="username"
        title="Username"
        placeholder="Enter username"
        options={{
          required: true,
          minLength: 5,
          maxLength: 15
        }}
      />

      <Input
        register={register}
        errors={errors}
        type="text"
        name="first_name"
        title="First name"
        placeholder="Enter first name"
        options={{
          required: true,
          minLength: 2,
          maxLength: 15
        }}
      />

      <Input
        register={register}
        errors={errors}
        type="text"
        name="last_name"
        title="Last name"
        placeholder="Enter last name"
        options={{
          required: true,
          minLength: 2,
          maxLength: 15
        }}
      />

      <Input
        register={register}
        errors={errors}
        type="password"
        name="password"
        title="password"
        placeholder="Enter password"
        options={{
          required: true,
          minLength: 2,
          maxLength: 30
        }}
      />

      <Input
        register={register}
        errors={errors}
        type="password"
        name="confirm_password"
        title="Confirmation password"
        placeholder="Enter confirmation password"
        options={{
          required: true,
          minLength: 2,
          maxLength: 30,
          validate: {
            confirm: value =>
              value === watch('password') || 'The passwords do not match.'
          }
        }}
      />

      <S.Submit type="submit">Submit</S.Submit>
    </S.Wrapper>
  )
}

export default RegisterForm
