import { createReducer } from '../../app/common/util/reducerUtil'
import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from './constants'

const initialState = {
  loading: false
}

export const asyncActionStarted = (state, payload) => {
  return { ...state, loading: true }
}

export const asyncActionFinished = (state, payload) => {
  return { ...state, loading: false }
}

export const asyncActionError = (state, payload) => {
  return { ...state, loading: false }
}

export default createReducer(initialState, {
  [ASYNC_ACTION_START]: asyncActionStarted,
  [ASYNC_ACTION_FINISH]: asyncActionFinished,
  [ASYNC_ACTION_ERROR]: asyncActionError
})
