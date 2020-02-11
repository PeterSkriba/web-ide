import { SET_LOADING } from 'constants/loading'

type setLoadingActionPayload = {
  visible: boolean
}

export const setLoadingAction = (payload: setLoadingActionPayload) => ({
  type: SET_LOADING,
  payload
})
