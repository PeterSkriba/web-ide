import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { LOGIN } from 'apollo/mutations'

// https://www.prisma.io/docs/prisma-server/authentication-and-security-kke4/

import * as S from './styled'

// https://www.prisma.io/tutorials/authentication-in-apollo-server-ct21

const Auth = () => {
  const [login] = useMutation(LOGIN)

  const handleLogin = () => {
    login({
      variables: {
        email: 'johndoe@gmail.com',
        password: 'johndoe'
      }
    }).then(res => console.log(res))
  }

  return (
    <>
      <p>Auth</p>
      <button onClick={handleLogin}>Login</button>
    </>
  )
}

export default Auth