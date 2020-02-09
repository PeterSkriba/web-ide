import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { useDidUpdate } from 'react-hooks-lib'

import { ME } from 'apollo/queries'

export default (redirect = true) => {
  const history = useHistory()
  const { data, loading } = useQuery(ME, {
    fetchPolicy: 'network-only'
  })

  useDidUpdate(() => {
    if (!data?.me && redirect) history.push('/auth')
    console.log('useAuth', data, loading)
  }, [data])

  return [data, loading]
}