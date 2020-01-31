import React from 'react'

import * as S from './styled'

type Props = {
  children: React.ReactNode[] | React.ReactNode | string
}

const Layout = ({ children }: Props) => {
  return (
    <S.Main>
      <header></header>
      <S.Content>{children}</S.Content>
      <footer><p>&copy; 2020 Peter Škríba</p></footer>
    </S.Main>
  )
}

export default Layout