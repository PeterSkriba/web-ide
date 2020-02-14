import React from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import * as S from './styled'

type Props = {
  children: React.ReactNode[] | React.ReactNode | string
  logout: () => void
}

const Layout = ({ children, logout }: Props) => {
  return (
    <S.Main>
      <S.Header>
        <button onClick={logout}>
          <ExitToAppIcon fontSize="small" />
        </button>
      </S.Header>
      <S.Content>{children}</S.Content>
      <S.Footer>
        <p>&copy; 2020 Peter Škríba</p>
      </S.Footer>
    </S.Main>
  )
}

export default Layout
