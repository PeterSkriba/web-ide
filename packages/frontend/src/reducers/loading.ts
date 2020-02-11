import { SET_LOADING } from 'constants/loading'
import { LoadingStateInferface } from 'types'

const initialState: LoadingStateInferface = {
  visible: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        visible: action.payload.visible
      }
    default:
      return state
  }
}
