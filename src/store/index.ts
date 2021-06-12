import { Action, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export interface StoreAction extends Action {
  payload?: any
}

export const ACTIIONS = {
  SET_USERS: 'SET_USERS',
  SET_POSTS: 'SET_POSTS',
  SET_LOADING: 'SET_LOADING',
  RESET: 'RESET',
}

const initialState = {
  users: [],
  posts: [],
  loading: false,
  error: null,
}

const reducer = (state = initialState, { type, payload }: StoreAction) => {
  switch (type) {
    case ACTIIONS.SET_USERS:
      return { ...state, loading: false, users: payload }
    case ACTIIONS.SET_POSTS:
      return { ...state, loading: false, posts: payload }
    case ACTIIONS.SET_LOADING:
      return { ...state, loading: payload }
    case ACTIIONS.RESET:
      return state
    default:
      return state
  }
}

const store = createStore(reducer, composeWithDevTools())

export default store
