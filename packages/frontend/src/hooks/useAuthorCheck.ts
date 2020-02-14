import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { useDidUpdate } from 'react-hooks-lib'
import { useDispatch } from 'react-redux'
import { setLoadingAction } from 'actions'

import { IS_AUTHOR } from 'apollo/queries'

export default (redirect = true) => {
  const dispatch = useDispatch()

  const history = useHistory()

  const { data, loading } = useQuery(IS_AUTHOR)

  useDidUpdate(() => {
    if (!loading && !!data?.isAuthor)
      dispatch(setLoadingAction({ visible: false }))
    if (!data?.isAuthor && redirect) history.goBack()
  }, [data, loading])

  return [data, loading]
}
