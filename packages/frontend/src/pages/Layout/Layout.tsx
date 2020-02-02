import React from 'react'

import * as S from './styled'

type Props = {
  children: React.ReactNode[] | React.ReactNode | string
}

const Layout = ({ children }: Props) => {
  return (
    <S.Main>
      <S.Header></S.Header>
      <S.Content>{children}</S.Content>
      <S.Footer><p>&copy; 2020 Peter Škríba</p></S.Footer>
    </S.Main>
  )
}

export default Layout