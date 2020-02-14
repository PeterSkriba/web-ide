import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'

import { LOGIN } from 'apollo/mutations'

import { Input, Button } from 'ui'

import * as S from './styled'

type FormData = {
  email: string
  password: string
}

// TODO: loading
// TODO: error from graphql

const LoginForm = () => {
  const history = useHistory()

  const [login] = useMutation(LOGIN)

  const { register, handleSubmit, errors } = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    submitFocusError: true
  })

  const onSubmit = data => {
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
        title="email"
        icon={<PersonIcon />}
        placeholder="Email"
        options={{
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        }}
      />

      <Input
        register={register}
        errors={errors}
        type="password"
        name="password"
        title="password"
        icon={<LockIcon />}
        placeholder="Password"
        options={{
          required: true
        }}
      />

      <Button type="submit" value="Sign in" />
    </S.Wrapper>
  )
}

export default LoginForm
