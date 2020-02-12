import React, { useState } from 'react'

// https://www.prisma.io/docs/prisma-server/authentication-and-security-kke4/

import { LoginForm, RegisterForm } from 'components'

import * as S from './styled'

const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true)

  return (
    <S.Wrapper>
      <S.Header>
        <S.HeaderButton isActive={isLogin} onClick={() => setIsLogin(true)}>
          Login
        </S.HeaderButton>
        |
        <S.HeaderButton isActive={!isLogin} onClick={() => setIsLogin(false)}>
          Register
        </S.HeaderButton>
      </S.Header>

      {isLogin ? <LoginForm /> : <RegisterForm />}
    </S.Wrapper>
  )
}

export default Auth
