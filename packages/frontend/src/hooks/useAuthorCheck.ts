import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { useDidUpdate } from 'react-hooks-lib'
import { useDispatch } from 'react-redux'
import { setLoadingAction } from 'actions'

import { IS_AUTHOR } from 'apollo/queries'

export default () => {
  const dispatch = useDispatch()

  const history = useHistory()

  const { data, loading } = useQuery(IS_AUTHOR)

  useDidUpdate(() => {
    if (!loading && !!data?.isAuthor)
      dispatch(setLoadingAction({ visible: false }))
    //dispatch(setLoadingAction({ visible: loading || !data?.isAuthor }))
    if (!data?.isAuthor) history.goBack()
  }, [data, loading])

  return [data, loading]
}
