import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { useDidUpdate } from 'react-hooks-lib'

import { useDispatch } from 'react-redux'
import { setLoadingAction } from 'actions'

import { ME } from 'apollo/queries'

export default (redirect = true) => {
  const dispatch = useDispatch()

  const history = useHistory()

  const { data, loading } = useQuery(ME, {
    fetchPolicy: 'network-only'
  })

  useDidUpdate(() => {
    if (!data?.me && redirect) history.push('/auth')

    dispatch(setLoadingAction({ visible: loading }))
  }, [data, loading])

  return [data, loading]
}
