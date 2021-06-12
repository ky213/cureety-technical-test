import { Action, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export interface StoreAction extends Action {
  payload?: any
}

export interface User {
  id: number
  name: string
  email: string
}
export interface Post {
  id: number
  title: string
  body: string
}
export interface DefaultRootState {
  users: User[]
  posts: Post[]
  loading: boolean
  error: any
}

export const ACTIIONS = {
  SET_STATE: 'SET_STATE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  RESET: 'RESET',
}

const initialState: DefaultRootState = {
  users: [],
  posts: [],
  loading: false,
  error: null,
}

const reducer = (state = initialState, { type, payload }: StoreAction) => {
  switch (type) {
    case ACTIIONS.SET_STATE:
      return { ...state, ...payload, error: null }
    case ACTIIONS.SET_LOADING:
      return { ...state, loading: payload }
    case ACTIIONS.SET_ERROR:
      return { ...state, loading: false, error: payload }
    case ACTIIONS.RESET:
      return initialState
    default:
      return state
  }
}

const store = createStore(reducer, composeWithDevTools())

export default store
