import React from 'react'
import { Provider } from 'react-redux'
import ReactLoading from 'react-loading'

import store from './store'
import UseFetch, { useFetch } from './helpers/useFetch'
import { Users, Posts } from 'components'

UseFetch.configure(config => {
  config.baseUrl = 'https://jsonplaceholder.typicode.com'
  config.authentificationHeader = () => {
    return {
      Authorization: localStorage.getItem('id_token'),
    }
  }
  config.compressionTimeoutDelay = 200
  config.maximumSize = 2 * 1024 * 1024 // 2Mb.
  config.protectedFromCleaning = ['profile', /^patients\/importants/]
})

function App() {
  const [{ users, posts }, isLoading] = useFetch((fetch: Function) => ({
    users: fetch('/users'),
    posts: fetch('/posts', { queryParams: { order: 'label ASC' } }),
  }))

  return (
    <Provider store={store}>
      <div className="App">
        {isLoading && <ReactLoading type={'bars'} color="grey" />}
        <Users />
        <Posts />
      </div>
    </Provider>
  )
}

export default App
