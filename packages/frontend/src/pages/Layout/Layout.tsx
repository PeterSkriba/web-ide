import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useHistory } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'

import { ME } from 'apollo/queries'

import * as S from './styled'

type Props = {
  children: React.ReactNode[] | React.ReactNode | string
}

const Layout = ({ children }: Props) => {
  const history = useHistory()

  const { data, loading, refetch } = useQuery(ME, {
    fetchPolicy: 'network-only'
  })

  const logout = () => {
    refetch()
    //client.resetStore()
    localStorage.removeItem('editor_auth-token')
    history.push('/auth')
  }

  useEffect(() => {
    refetch()
  }, [data])

  return (
    <S.Wrapper>
      <S.Header>
        <S.Navigation>
          <S.Menu>
            <MenuIcon />
          </S.Menu>
          <S.MyLink exact activeClassName="active" to="/">
            Home
          </S.MyLink>
          {!!data?.me?.isAuthor && (
            <S.MyLink exact activeClassName="active" to="/create">
              Create Exercise
            </S.MyLink>
          )}
          <S.MyLink exact activeClassName="active" to="/about">
            About
          </S.MyLink>
        </S.Navigation>

        <S.ProfileWrapper>
          {!!data?.me && (
            <>
              <S.Profile exact to="/profile">
                <S.ProfilePicture>
                  <AccountCircleIcon />
                </S.ProfilePicture>
                <p>John Doe</p>
              </S.Profile>
              <span>|</span>
              <S.Button onClick={() => logout()}>
                <p>Logout</p>
                <ExitToAppIcon fontSize="small" />
              </S.Button>
            </>
          )}
        </S.ProfileWrapper>
      </S.Header>

      <S.Content>{children}</S.Content>

      <S.Footer>
        <p>Copyright &copy; 2020, JACO, Peter Škríba</p>
      </S.Footer>
    </S.Wrapper>
  )
}

export default Layout
